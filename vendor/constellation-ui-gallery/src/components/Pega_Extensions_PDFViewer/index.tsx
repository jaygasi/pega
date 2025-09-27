import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
// Follow the gallery's established pattern: import the PDF viewer modules and
// styles at module scope like other Pega components (InteractivePDFAdvanced,
// etc.). This is consistent with the rest of the repo and avoids inventing a
// new loading strategy.
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export interface PDFViewerProps {
  getPConnect?: () => any;
  value?: string; // PDF source (URL or base64) directly from the configured property
  highlightParentProp?: string; // property name for parent page (e.g., 'myPage')
  searchProperty?: string; // optional clipboard property to watch for search text
  height?: string;
  debug?: boolean;
}

function base64ToBlobUrl(base64: string): string {
  if (!base64) return '';
  try {
    const prefix = 'data:application/pdf;base64,';
    const raw = base64.startsWith(prefix) ? base64.substring(prefix.length) : base64;
    const bin = atob(raw);
    const buffer = new Uint8Array(bin.length);
    Array.from(bin).forEach((ch, i) => { buffer[i] = ch.charCodeAt(0); });
    const blob = new Blob([buffer], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch {
    return '';
  }
}

const workerUrl = 'webwb/Pdfworkerminjs.js';

const highlightColor = 'rgba(255, 230, 0, 0.4)';

// Helpers adapted from the repository's InteractivePDFAdvanced component.
// These normalize various pxResults shapes and compute pixel coordinates for overlays.
function normalizeAreaRaw(areaRaw: any) {
  const toNumber = (v: any) => {
    const n = Number(v ?? 0) || 0;
    return n;
  };
  const toFraction = (v: any) => {
    const n = toNumber(v);
    if (n > 1) return Math.min(1, n / 100);
    return Math.max(0, Math.min(1, n));
  };
  return {
    left: toFraction(areaRaw.left ?? areaRaw.left_coordinate ?? areaRaw.x ?? 0),
    top: toFraction(areaRaw.top ?? areaRaw.top_coordinate ?? areaRaw.y ?? 0),
    width: toFraction(areaRaw.width ?? areaRaw.width_coordinate ?? areaRaw.w ?? 0),
    height: toFraction(areaRaw.height ?? areaRaw.height_coordinate ?? areaRaw.h ?? areaRaw.length ?? 0),
    pageIndex: Number(areaRaw.pageIndex ?? areaRaw.page ?? areaRaw.pageindex ?? 0),
  };
}

function findPageElement(viewerRootRef: React.RefObject<HTMLDivElement> | null, pageIndex: number) {
  if (!viewerRootRef?.current) return null;
  const root = viewerRootRef.current as HTMLElement;
  const selectors = [
    `[data-page-index="${pageIndex}"]`,
    `[data-page-number="${pageIndex + 1}"]`,
    `.rpv-core__page[data-page-number="${pageIndex + 1}"]`,
    `.react-pdf__Page[data-page-number="${pageIndex + 1}"]`,
  ];
  for (const sel of selectors) {
    if (sel && typeof sel === 'string') {
      const el = root.querySelector(sel);
      if (el) return el as HTMLElement;
    }
  }
  const pages = root.querySelectorAll('.rpv-core__page, .react-pdf__Page, .page');
  if (pages && pages.length > pageIndex) return pages[pageIndex] as HTMLElement;
  const pagesByNumber = root.querySelectorAll('[data-page-number]');
  if (pagesByNumber && pagesByNumber.length > pageIndex) return pagesByNumber[pageIndex] as HTMLElement;
  return null;
}

function computeEntryFromResult(it: any, viewerRootRef: React.RefObject<HTMLDivElement> | null) {
  const areaRaw = it.area || {};
  const area = normalizeAreaRaw(areaRaw);
  const pageEl = findPageElement(viewerRootRef, area.pageIndex);
  let usedPageEl: HTMLElement | null = pageEl;
  if (!usedPageEl && viewerRootRef?.current) usedPageEl = viewerRootRef.current;
  if (!usedPageEl) return null;
  const rect = usedPageEl.getBoundingClientRect();
  const rootRect = viewerRootRef?.current ? viewerRootRef.current.getBoundingClientRect() : { left: 0, top: 0 } as DOMRect;
  const left = rect.left - rootRect.left + area.left * rect.width;
  const top = rect.top - rootRect.top + area.top * rect.height;
  const width = area.width * rect.width;
  const hHeight = area.height * rect.height;
  const conf = Number(it.confidence) || 0;
  let color = 'rgba(220,53,69,0.6)';
  if (conf >= 0.9) color = 'rgba(40,167,69,0.6)';
  else if (conf >= 0.7) color = 'rgba(255,193,7,0.6)';
  return { id: it.id || String(Math.random()), left, top, width, height: hHeight, pageIndex: area.pageIndex, color };
}

function processPageContainer(container: any, viewerRootRef: React.RefObject<HTMLDivElement> | null, debug = false) {
  const out: any[] = [];
  const pageIndex = container.pageindex ?? container.pageIndex ?? 0;
  if (!Array.isArray(container.pxResults)) return out;
  for (const inner of container.pxResults) {
    const merged = { ...inner, area: inner.area ?? inner, pageIndex: inner.pageIndex ?? inner.page ?? inner.pageindex ?? pageIndex };
    const e2 = computeEntryFromResult(merged, viewerRootRef);
    if (e2) {
        if (debug && typeof console !== 'undefined') console.log('[PDFViewer][debug] computed entry (page container):', merged, '=>', e2);
      out.push(e2);
    }
  }
  return out;
}

function computeEntriesFromResults(results: any[], viewerRootRef: React.RefObject<HTMLDivElement> | null, debug = false) {
  const entries: any[] = [];
  for (const it of results) {
    if (it && Array.isArray(it.pxResults)) {
      entries.push(...processPageContainer(it, viewerRootRef, debug));
    } else {
      const e = computeEntryFromResult(it, viewerRootRef);
      if (e) {
        if (debug && typeof console !== 'undefined') console.log('[PDFViewer][debug] computed entry (flat):', it, '=>', e);
        entries.push(e);
      }
    }
  }
  if (debug && typeof console !== 'undefined') console.log('[PDFViewer][debug] computeEntriesFromResults final entries:', entries);
  return entries;
}

function applyPxResultsToViewer(results: any[], viewerRootRef: React.RefObject<HTMLDivElement> | null, setPixelHighlightsFn: (v: any[]) => void, debug = false): boolean {
  if (!Array.isArray(results) || !results.length) return false;
  const entries = computeEntriesFromResults(results, viewerRootRef, debug);
  if (entries.length) {
    if (debug && typeof console !== 'undefined') console.log('[PDFViewer][debug] applyPxResultsToViewer will apply', entries);
    setPixelHighlightsFn(entries);
    if (typeof console !== 'undefined') console.log('[PDFViewer] applyPxResultsToViewer applied', entries);
    return true;
  }
  if (typeof console !== 'undefined') console.warn('[PDFViewer] applyPxResultsToViewer: no entries computed');
  return false;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  getPConnect,
  value = '',
  highlightParentProp = '',
  searchProperty = '',
  height = '600px',
  debug,
}) => {
  const pConnect = getPConnect?.();
  const cfg = pConnect?.getConfigProps?.() || {};
  const effectiveHighlightParentProp = highlightParentProp || cfg?.highlightParentProp || '';
  const effectiveSearchProperty = searchProperty || cfg?.searchProperty || '';
  const effectiveDebug = typeof debug !== 'undefined' ? debug : Boolean(cfg?.debug);

  const cfgPdfProperty = cfg?.pdfProperty || cfg?.pdfProp || undefined;
  const [resolvedPdfSrc, setResolvedPdfSrc] = useState<string>(value || '');

  useEffect(() => {
    if (value) {
      setResolvedPdfSrc(value);
      return undefined;
    }
    if (!cfgPdfProperty || typeof pConnect?.getValue !== 'function') return undefined;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 6;
    const delayMs = 300;

    const tryResolve = () => {
      attempts += 1;
      try {
        const v = pConnect.getValue(cfgPdfProperty);
        if (v) {
          setResolvedPdfSrc(v);
          return;
      } catch (err) {
  if (effectiveDebug) console.debug('PDFViewer: error resolving pdf property', cfgPdfProperty, err);
      }
      if (!cancelled && attempts < maxAttempts) setTimeout(tryResolve, delayMs);
    };
    tryResolve();
    return () => { cancelled = true; };
  }, [value, cfgPdfProperty, pConnect, effectiveDebug]);

*** End Patch