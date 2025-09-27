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
        }
      } catch (err) {
  if (effectiveDebug) console.debug('PDFViewer: error resolving pdf property', cfgPdfProperty, err);
      }
      if (!cancelled && attempts < maxAttempts) setTimeout(tryResolve, delayMs);
    };
    tryResolve();
    return () => { cancelled = true; };
  }, [value, cfgPdfProperty, pConnect, effectiveDebug]);

  const [resolvedParentPage, setResolvedParentPage] = useState<any>(
    pConnect?.getValue?.(effectiveHighlightParentProp) || {}
  );
  useEffect(() => {
    if (!effectiveHighlightParentProp || typeof pConnect?.getValue !== 'function') {
      setResolvedParentPage({});
      return undefined;
    }

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 6;
    const delayMs = 300;

    const tryResolveParent = () => {
      attempts += 1;
      try {
        const direct = pConnect.getValue(effectiveHighlightParentProp);
        const alt = effectiveHighlightParentProp.startsWith('.') ? pConnect.getValue(effectiveHighlightParentProp.slice(1)) : pConnect.getValue(`.${effectiveHighlightParentProp}`);
        const v = typeof direct !== 'undefined' ? direct : alt;
        if (v) {
          setResolvedParentPage(v);
          return;
        }
      } catch (err) {
  if (effectiveDebug) console.debug('PDFViewer: error resolving parent prop', effectiveHighlightParentProp, err);
      }
      if (!cancelled && attempts < maxAttempts) setTimeout(tryResolveParent, delayMs);
    };

    tryResolveParent();
    return () => { cancelled = true; };
  }, [effectiveHighlightParentProp, pConnect, effectiveDebug]);

  const pxResultsPages = useMemo(() => {
    const obj = resolvedParentPage || {};

    const direct = () => {
      const v = obj?.pxResults;
      return Array.isArray(v) && v.length ? v : null;
    };

    const scanTopLevelArrays = () => {
      const found: any[] = [];
      for (const key of Object.keys(obj)) {
        const v = (obj as Record<string, any>)[key];
        if (Array.isArray(v) && v.length && v.some((el: any) => el && (el.pageindex !== undefined || el.pageIndex !== undefined || Array.isArray(el?.pxResults)))) {
          found.push(...v);
        }
      }
      return found.length ? found : null;
    };

    const scanNestedArrays = () => {
      const found: any[] = [];
      for (const val of Object.values(obj)) {
        if (Array.isArray(val) && val.length && typeof val[0] === 'object') {
          for (const el of val) {
            if (el && (el.pageindex !== undefined || el.pageIndex !== undefined || Array.isArray(el?.pxResults))) found.push(el);
          }
        }
      }
      return found.length ? found : null;
    };

    try {
      return direct() ?? scanTopLevelArrays() ?? scanNestedArrays() ?? [];
    } catch (err) {
  if (effectiveDebug) console.debug('PDFViewer: error extracting pxResultsPages', err);
      return [];
    }
  }, [resolvedParentPage, effectiveDebug]);

  const [currentPage, setCurrentPage] = useState(0);
  const viewerRootRef = useRef<HTMLDivElement>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [pixelHighlights, setPixelHighlights] = useState<any[]>([]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (!resolvedPdfSrc) return setFileUrl('');
    if (resolvedPdfSrc.startsWith('http')) setFileUrl(resolvedPdfSrc);
    else setFileUrl(base64ToBlobUrl(resolvedPdfSrc));
  }, [resolvedPdfSrc]);

  // When the viewer is available and pxResultsPages change, compute pixel overlays
  useEffect(() => {
    if (!fileUrl) {
      setPixelHighlights([]);
      return undefined;
    }
    // Try applying the pxResultsPages into pixel overlays. If none computed,
    // keep pixelHighlights empty and fall back to the percentage-based highlights.
    try {
      const applied = applyPxResultsToViewer(pxResultsPages, viewerRootRef, setPixelHighlights, effectiveDebug);
      if (!applied) setPixelHighlights([]);
    } catch (err) {
  if (effectiveDebug) console.debug('PDFViewer: error applying pxResults to viewer', err);
      setPixelHighlights([]);
    }
    return undefined;
  }, [fileUrl, pxResultsPages, effectiveDebug]);

  const highlights = pxResultsPages.find((p: any) => (p.pageindex ?? p.pageIndex ?? 0) === currentPage)?.pxResults || [];

  const handleHighlightClick = (pageIdx: number) => {
    setCurrentPage(pageIdx);
  };

  useEffect(() => {
    if (!effectiveDebug) return undefined;
    try {
  console.group('PDFViewer debug');
      console.log('effectiveHighlightParentProp:', effectiveHighlightParentProp);
      console.log('resolvedParentPage:', resolvedParentPage);
      console.log('resolvedPdfSrc present?:', Boolean(resolvedPdfSrc));
      console.log('pxResultsPages length:', pxResultsPages.length);
      console.groupEnd();
    } catch (err) {
  console.debug('PDFViewer: debug logging failed', err);
    }
    return undefined;
  }, [effectiveDebug, effectiveHighlightParentProp, resolvedParentPage, resolvedPdfSrc, pxResultsPages.length]);

  const pageContains = useCallback((page: any, lowercase: string) => {
    const results = Array.isArray(page?.pxResults) ? page.pxResults : [];
    for (const r of results) {
      const txt = (r?.text ?? r?.content ?? r?.value ?? '')?.toString?.() || '';
      if (txt.toLowerCase().includes(lowercase)) return true;
    }
    return false;
  }, []);

  function getPageIndexFromElement(el: Element | null): number | undefined {
    if (!el) return undefined;
    const pageEl = el.closest('[data-page-index],[data-page-number]');
    if (!pageEl) return undefined;
    const attr = pageEl.getAttribute('data-page-index') ?? pageEl.getAttribute('data-page-number');
    if (!attr) return undefined;
    const n = parseInt(attr, 10);
    return Number.isNaN(n) ? undefined : n;
  }

  const domSearch = useCallback((lowercase: string) => {
    try {
      const root = viewerRootRef.current;
      if (!root) return false;

      const prev = root.querySelectorAll('[data-sipdv-search-highlight]');
      prev.forEach((el) => {
        if (el instanceof HTMLElement) el.style.background = '';
        try { el.removeAttribute('data-sipdv-search-highlight'); } catch (e) { /* ignore */ }
      });

      const textLayers = root.querySelectorAll('.rpv-core__text-layer');
      for (const tl of Array.from(textLayers)) {
        const layer = tl as Element;
        const content = (layer.textContent || '').toLowerCase();
        if (!content.includes(lowercase)) continue;
        const maybeMatch = Array.from(layer.querySelectorAll('span, div')).find((n) => (n.textContent || '').toLowerCase().includes(lowercase));
        if (!maybeMatch || !(maybeMatch instanceof HTMLElement)) continue;
        const pageIdx = getPageIndexFromElement(layer);
        if (pageIdx === undefined) continue;
        try {
          setCurrentPage(pageIdx);
          maybeMatch.style.background = 'rgba(255,255,0,0.6)';
          maybeMatch.setAttribute('data-sipdv-search-highlight', 'true');
          maybeMatch.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } catch (e) {
          /* ignore DOM write errors */
        }
  if (effectiveDebug) console.debug('PDFViewer: found in-rendered text, navigated to page', pageIdx);
        return true;
      }
    } catch (err) {
  if (effectiveDebug) console.debug('PDFViewer: DOM search error', err);
    }
    return false;
  }, [effectiveDebug]);

  const performSearch = useCallback((searchText: string) => {
    const search = (searchText || '').toString().trim();
    if (!search) return false;
    const lowercase = search.toLowerCase();

    try {
      for (const p of pxResultsPages) {
        if (pageContains(p, lowercase)) {
          const pageIdx = (p?.pageindex ?? p?.pageIndex ?? p?.page);
          if (typeof pageIdx === 'number' && !Number.isNaN(pageIdx)) {
            setCurrentPage(pageIdx);
            if (effectiveDebug) console.debug('PDFViewer: found in pxResultsPages, navigated to page', pageIdx);
            return true;
          }
        }
      }
    } catch (err) {
  if (effectiveDebug) console.debug('PDFViewer: error searching pxResultsPages', err);
    }

    return domSearch(lowercase);
  }, [pxResultsPages, effectiveDebug, pageContains, domSearch]);

  useEffect(() => {
    try {
      (window as any).pdfViewer = (window as any).pdfViewer || {};
      (window as any).pdfViewer.search = performSearch;
    } catch (e) {
  if (effectiveDebug) console.debug('PDFViewer: failed to expose window API', e);
    }

    const onSearch = (ev: Event) => {
      const detail = (ev as CustomEvent)?.detail || {};
      const searchText: string = (detail?.searchText || '').toString().trim();
      if (!searchText) return;
      performSearch(searchText);
    };

    window.addEventListener('simplePdfViewerSearch', onSearch as EventListener);
    return () => {
      try {
        if ((window as any).pdfViewer) delete (window as any).pdfViewer.search;
      } catch (e) {
        if (effectiveDebug) console.debug('PDFViewer: error removing window API', e);
      }
      window.removeEventListener('simplePdfViewerSearch', onSearch as EventListener);
    };
  }, [performSearch, effectiveDebug]);

  useEffect(() => {
    if (!effectiveSearchProperty || typeof pConnect?.getValue !== 'function') return undefined;
    try {
      const val = pConnect.getValue(effectiveSearchProperty);
      if (val && typeof val === 'string') {
        performSearch(val);
      }
    } catch (e) {
  if (effectiveDebug) console.debug('PDFViewer: error reading search property', effectiveSearchProperty, e);
  if (effectiveDebug) console.debug('PDFViewer: error reading search property', effectiveSearchProperty, e);
    }
    return undefined;
  }, [effectiveSearchProperty, pConnect, performSearch, effectiveDebug]);

  return (
    <div style={{ position: 'relative', height }}>
      {fileUrl ? (
        <Worker workerUrl={workerUrl}>
          <div ref={viewerRootRef} style={{ position: 'relative', height: '100%' }}>
            <Viewer
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageFit}
              initialPage={currentPage}
              onPageChange={(args: any) => {
                const cp = args?.currentPage ?? args?.currentPageNumber ?? 0;
                setCurrentPage(cp);
              }}
            />

            {/* Render pixel-based highlights if available; otherwise fall back to fractional highlights */}
            <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
              {(pixelHighlights.length ? pixelHighlights : (highlights || [])).map((h: any, i: number) => {
                const isPixel = Boolean(h && typeof h.left === 'number' && String(h.left).endsWith('') && !Number.isNaN(h.left) && !!h.pageIndex);
                if (pixelHighlights.length) {
                  const pageMatch = h.pageIndex ?? h.pageindex ?? h.page ?? currentPage;
                  return (
                    <button
                      key={h.id || i}
                      aria-label="Highlight"
                      type="button"
                      style={{
                        position: 'absolute',
                        left: `${h.left}px`,
                        top: `${h.top}px`,
                        width: `${h.width}px`,
                        height: `${h.height}px`,
                        background: h.color ?? highlightColor,
                        border: 'none',
                        borderRadius: 2,
                        padding: 0,
                        margin: 0,
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleHighlightClick(pageMatch)}
                    />
                  );
                }

                // fractional fallback (0..1) -> percent overlay
                const left = (h.left ?? h.left_coordinate ?? 0) * 100;
                const top = (h.top ?? h.top_coordinate ?? 0) * 100;
                const widthVal = (h.width ?? 0) * 100;
                const heightVal = (h.height ?? 0) * 100;
                const pageIdx = h.pageindex ?? h.pageIndex ?? h.page ?? currentPage;
                return (
                  <button
                    key={h.id || i}
                    aria-label="Highlight"
                    type="button"
                    style={{
                      position: 'absolute',
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${widthVal}%`,
                      height: `${heightVal}%`,
                      background: highlightColor,
                      border: 'none',
                      borderRadius: 2,
                      padding: 0,
                      margin: 0,
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleHighlightClick(pageIdx)}
                  />
                );
              })}
            </div>
          </div>
        </Worker>
      ) : (
        <div style={{ padding: 20 }}>No PDF source available</div>
      )}
    </div>
  );
};

export default withConfiguration(PDFViewer);
