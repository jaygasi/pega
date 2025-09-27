import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface SimpleInteractivePDFViewerProps {
  getPConnect: () => any;
  value: string; // PDF source (URL or base64) directly from the configured property
  highlightParentProp: string; // property name for parent page (e.g., 'myPage')
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

const SimpleInteractivePDFViewer: React.FC<SimpleInteractivePDFViewerProps> = ({
  getPConnect,
  value,
  highlightParentProp,
  searchProperty,
  height = '600px',
  debug,
}) => {
  const pConnect = getPConnect?.();
  // Read component config from pConnect as a fallback (some runtimes provide config via pConnect)
  const cfg = pConnect?.getConfigProps?.() || {};
  const effectiveHighlightParentProp = highlightParentProp || cfg?.highlightParentProp || '';
  const effectiveSearchProperty = searchProperty || cfg?.searchProperty || '';
  const effectiveDebug = typeof debug !== 'undefined' ? debug : Boolean(cfg?.debug);

  // Resolve PDF source: prefer the value prop (standard Pega wiring). If that
  // is empty, optionally try a configured pdf property name from component
  // config (not required) with a short retry loop to handle timing.
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
        if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: error resolving pdf property', cfgPdfProperty, err);
      }
      if (!cancelled && attempts < maxAttempts) setTimeout(tryResolve, delayMs);
    };
    tryResolve();
    return () => { cancelled = true; };
  }, [value, cfgPdfProperty, pConnect, effectiveDebug]);

  // Resolve parent page (highlight source) with a short retry loop to handle
  // cases where the clipboard is populated slightly after mount.
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
        if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: error resolving parent prop', effectiveHighlightParentProp, err);
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
      if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: error extracting pxResultsPages', err);
      return [];
    }
  }, [resolvedParentPage, effectiveDebug]);







  const [currentPage, setCurrentPage] = useState(0);
  const viewerRootRef = useRef<HTMLDivElement>(null);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    if (!resolvedPdfSrc) return setFileUrl('');
    if (resolvedPdfSrc.startsWith('http')) setFileUrl(resolvedPdfSrc);
    else setFileUrl(base64ToBlobUrl(resolvedPdfSrc));
  }, [resolvedPdfSrc]);

  // Find highlights for the current page
  const highlights = pxResultsPages.find((p: any) => (p.pageindex ?? p.pageIndex ?? 0) === currentPage)?.pxResults || [];

  // Scroll to page when highlight is clicked
  const handleHighlightClick = (pageIdx: number) => {
    setCurrentPage(pageIdx);
    // Optionally, scroll page into view if needed (handled by PDF viewer)
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Debug logging when enabled (either via prop or component config)
  useEffect(() => {
    if (!effectiveDebug) return undefined;
    try {
      console.group('SimpleInteractivePDFViewer debug');
      console.log('effectiveHighlightParentProp:', effectiveHighlightParentProp);
      console.log('resolvedParentPage:', resolvedParentPage);
      console.log('resolvedPdfSrc present?:', Boolean(resolvedPdfSrc));
      console.log('pxResultsPages length:', pxResultsPages.length);
      console.groupEnd();
    } catch (err) {
      console.debug('SimpleInteractivePDFViewer: debug logging failed', err);
    }
    return undefined;
  }, [effectiveDebug, effectiveHighlightParentProp, resolvedParentPage, resolvedPdfSrc, pxResultsPages.length]);
  // DOM-based search helpers (kept outside the effect so performSearch can call them)
  // DOM search is performed inline inside performSearch to avoid creating
  // helper functions that change on every render (satisfies exhaustive-deps)

  // helper to check if a page contains the lowercase search term
  const pageContains = useCallback((page: any, lowercase: string) => {
    const results = Array.isArray(page?.pxResults) ? page.pxResults : [];
    for (const r of results) {
      const txt = (r?.text ?? r?.content ?? r?.value ?? '')?.toString?.() || '';
      if (txt.toLowerCase().includes(lowercase)) return true;
    }
    return false;
  }, []);
  // small helper to extract page index from a DOM node
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
        if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: found in-rendered text, navigated to page', pageIdx);
        return true;
      }
    } catch (err) {
      if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: DOM search error', err);
    }
    return false;
  }, [effectiveDebug]);

  // performSearch extracted so multiple triggers (event, window API, clipboard) can call it
  const performSearch = useCallback((searchText: string) => {
    const search = (searchText || '').toString().trim();
    if (!search) return false;
    const lowercase = search.toLowerCase();

    // 1) Try structured pxResultsPages first
    try {
      for (const p of pxResultsPages) {
        if (pageContains(p, lowercase)) {
          const pageIdx = (p?.pageindex ?? p?.pageIndex ?? p?.page);
          if (typeof pageIdx === 'number' && !Number.isNaN(pageIdx)) {
            setCurrentPage(pageIdx);
            if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: found in pxResultsPages, navigated to page', pageIdx);
            return true;
          }
        }
      }
    } catch (err) {
      if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: error searching pxResultsPages', err);
    }

    // 2) Fallback to DOM text-layer search
    return domSearch(lowercase);
  }, [pxResultsPages, effectiveDebug, pageContains, domSearch]);

  // Wire performSearch to a window API and to the custom event listener
  useEffect(() => {
    try {
      (window as any).simplePdfViewer = (window as any).simplePdfViewer || {};
      (window as any).simplePdfViewer.search = performSearch;
    } catch (e) {
      if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: failed to expose window API', e);
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
        if ((window as any).simplePdfViewer) delete (window as any).simplePdfViewer.search;
      } catch (e) {
        if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: error removing window API', e);
      }
      window.removeEventListener('simplePdfViewerSearch', onSearch as EventListener);
    };
  }, [performSearch, effectiveDebug]);

  // Watch the configured Pega clipboard search property and invoke performSearch when it changes
  useEffect(() => {
    if (!effectiveSearchProperty || typeof pConnect?.getValue !== 'function') return undefined;
    try {
      const val = pConnect.getValue(effectiveSearchProperty);
      if (val && typeof val === 'string') {
        performSearch(val);
      }
    } catch (e) {
      if (effectiveDebug) console.debug('SimpleInteractivePDFViewer: error reading search property', effectiveSearchProperty, e);
    }
    // Note: we intentionally do not set up a polling loop here; the TextInputSearch will triggerFieldChange which should update the case clipboard in Constellation and cause a re-render (if pConnect wiring updates props). If you need polling, we can add an interval.
    return undefined;
  }, [effectiveSearchProperty, pConnect, performSearch, effectiveDebug]);


  return (
    <div style={{ position: 'relative', height }}>
      {fileUrl && (
        <Worker workerUrl={workerUrl}>
          <div ref={viewerRootRef} style={{ position: 'relative', height: '100%' }}>
            <Viewer
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageFit}
              initialPage={currentPage}
              onPageChange={({ currentPage: cp }) => setCurrentPage(cp)}
            />
            {/* Overlay highlights */}
            <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
              {highlights.map((h: any, i: number) => {
                const left = (h.left ?? h.left_coordinate ?? 0) * 100;
                const top = (h.top ?? h.top_coordinate ?? 0) * 100;
                const widthVal = (h.width ?? 0) * 100;
                const heightVal = (h.height ?? 0) * 100;
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
                    onClick={() => handleHighlightClick(currentPage)}
                  />
                );
              })}
            </div>
          </div>
        </Worker>
      )}
      {!fileUrl && <div style={{ padding: 20 }}>No PDF source available</div>}
    </div>
  );
};

export default SimpleInteractivePDFViewer;
