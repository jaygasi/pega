import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Avoid depending on deep platform types in this DX component. Expect a minimal getPConnect() function.
import { ViewerWrapper, Highlight } from './styles';
// Library CSS (import first so local overrides can be applied)
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
function base64ToBlobUrl(base64) {
    if (!base64)
        return '';
    try {
        const prefix = 'data:application/pdf;base64,';
        const raw = base64.startsWith(prefix) ? base64.substring(prefix.length) : base64;
        const bin = atob(raw);
        const buffer = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i += 1)
            buffer[i] = bin.charCodeAt(i);
        const blob = new Blob([buffer], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    }
    catch (e) {
        console.error('InteractivePDFAdvanced: base64->blob failed', e);
        return '';
    }
}
// Top-level helpers (kept small so hooks remain simple)
function normalizeAreaRaw(areaRaw) {
    // Accept either fractional (0..1) or percentage (0..100) inputs.
    // Convert to a consistent fractional representation used by the overlay math.
    const toNumber = (v) => {
        const n = Number(v ?? 0) || 0;
        return n;
    };
    const toFraction = (v) => {
        const n = toNumber(v);
        // If value looks like a percentage (e.g. 10..100) convert to fraction.
        if (n > 1)
            return Math.min(1, n / 100);
        // Already fractional (0..1)
        return Math.max(0, Math.min(1, n));
    };
    return {
        left: toFraction(areaRaw.left ?? areaRaw.left_coordinate ?? areaRaw.x ?? 0),
        top: toFraction(areaRaw.top ?? areaRaw.top_coordinate ?? areaRaw.y ?? 0),
        width: toFraction(areaRaw.width ?? areaRaw.width_coordinate ?? areaRaw.w ?? 0),
        height: toFraction(areaRaw.height ?? areaRaw.height_coordinate ?? areaRaw.h ?? areaRaw.length ?? 0),
        pageIndex: Number(areaRaw.pageIndex ?? areaRaw.page ?? areaRaw.pageindex ?? 0)
    };
}
// Try to find the page element for a given pageIndex across different
// viewer DOM shapes. The PDF viewer can render pages with different
// attributes/classes depending on versions/plugins, so try multiple
// selectors and fall back to the Nth page element.
function findPageElement(viewerRootRef, pageIndex) {
    if (!viewerRootRef?.current)
        return null;
    const root = viewerRootRef.current;
    const selectors = [
        `[data-page-index="${pageIndex}"]`,
        `[data-page-number="${pageIndex + 1}"]`,
        `.rpv-core__page[data-page-number="${pageIndex + 1}"]`,
        `.react-pdf__Page[data-page-number="${pageIndex + 1}"]`
    ];
    for (const sel of selectors) {
        if (sel && typeof sel === 'string') {
            const el = root.querySelector(sel);
            if (el)
                return el;
        }
    }
    // Try common page classes and use the Nth element as a best-effort fallback
    const pages = root.querySelectorAll('.rpv-core__page, .react-pdf__Page, .page');
    if (pages && pages.length > pageIndex)
        return pages[pageIndex];
    // Try any elements with data-page-number and pick index if present
    const pagesByNumber = root.querySelectorAll('[data-page-number]');
    if (pagesByNumber && pagesByNumber.length > pageIndex)
        return pagesByNumber[pageIndex];
    return null;
}
function computeEntryFromResult(it, viewerRootRef) {
    const areaRaw = it.area || {};
    const area = normalizeAreaRaw(areaRaw);
    const pageEl = findPageElement(viewerRootRef, area.pageIndex);
    // If there is no page element, fall back to the viewer root bounding box
    // so we can still position overlays relative to the overall viewer.
    let usedPageEl = pageEl;
    if (!usedPageEl && viewerRootRef?.current)
        usedPageEl = viewerRootRef.current;
    if (!usedPageEl)
        return null;
    const rect = usedPageEl.getBoundingClientRect();
    // Convert viewport coordinates into viewer-root-relative coordinates
    const rootRect = viewerRootRef?.current ? viewerRootRef.current.getBoundingClientRect() : { left: 0, top: 0 };
    const left = rect.left - rootRect.left + (area.left * rect.width);
    const top = rect.top - rootRect.top + (area.top * rect.height);
    const width = (area.width * rect.width);
    const hHeight = (area.height * rect.height);
    const conf = Number(it.confidence) || 0;
    let color = 'rgba(220,53,69,0.6)';
    if (conf >= 0.9)
        color = 'rgba(40,167,69,0.6)';
    else if (conf >= 0.7)
        color = 'rgba(255,193,7,0.6)';
    return { id: it.id || String(Math.random()), left, top, width, height: hHeight, pageIndex: area.pageIndex, color };
}
// Extracted helper to reduce cognitive complexity in the parent function.
function processPageContainer(container, viewerRootRef, debug = false) {
    const out = [];
    const pageIndex = container.pageindex ?? container.pageIndex ?? 0;
    if (!Array.isArray(container.pxResults))
        return out;
    for (const inner of container.pxResults) {
        const merged = { ...inner, area: inner.area ?? inner, pageIndex: inner.pageIndex ?? inner.page ?? inner.pageindex ?? pageIndex };
        const e2 = computeEntryFromResult(merged, viewerRootRef);
        if (e2) {
            if (debug && typeof console !== 'undefined')
                console.log('[InteractivePDFAdvanced][debug] computed entry (page container):', merged, '=>', e2);
            out.push(e2);
        }
    }
    return out;
}
function computeEntriesFromResults(results, viewerRootRef, debug = false) {
    const entries = [];
    for (const it of results) {
        // Support two shapes:
        // 1) Flat entries: { area: {...}, left, top, id }
        // 2) Page containers: { pageindex: 0, pxResults: [ { left, top, ... }, ... ] }
        if (it && Array.isArray(it.pxResults)) {
            entries.push(...processPageContainer(it, viewerRootRef, debug));
        }
        else {
            const e = computeEntryFromResult(it, viewerRootRef);
            if (e) {
                if (debug && typeof console !== 'undefined')
                    console.log('[InteractivePDFAdvanced][debug] computed entry (flat):', it, '=>', e);
                entries.push(e);
            }
        }
    }
    if (debug && typeof console !== 'undefined')
        console.log('[InteractivePDFAdvanced][debug] computeEntriesFromResults final entries:', entries);
    return entries;
}
// Extracted helper to reduce cognitive complexity in the parent function.
// (duplicate removed during refactor)
function applyPxResultsToViewer(results, viewerRootRef, setPixelHighlightsFn, debug = false) {
    // Returns true when entries were computed and applied, false otherwise.
    if (!Array.isArray(results) || !results.length)
        return false;
    const entries = computeEntriesFromResults(results, viewerRootRef, debug);
    if (entries.length) {
        if (debug && typeof console !== 'undefined')
            console.log('[InteractivePDFAdvanced][debug] applyPxResultsToViewer will apply', entries);
        setPixelHighlightsFn(entries);
        if (typeof console !== 'undefined')
            console.log('[InteractivePDFAdvanced] applyPxResultsToViewer applied', entries);
        return true;
    }
    if (typeof console !== 'undefined')
        console.warn('[InteractivePDFAdvanced] applyPxResultsToViewer: no entries computed');
    return false;
}
// Compute pixel entries from the grouped highlights map (highlightsByPage).
// Extracted to reduce cognitive complexity in the effect that consumes it.
function computeEntriesFromGroupedHighlights(grouped, viewerRootRef, colorFor) {
    const entries = [];
    const root = viewerRootRef?.current;
    if (!root)
        return entries;
    const rootRect = root.getBoundingClientRect();
    grouped.forEach((items, pageIndex) => {
        const pageEl = root.querySelector(`[data-page-index="${pageIndex}"]`);
        if (!pageEl)
            return;
        const rect = pageEl.getBoundingClientRect();
        items.forEach((h) => {
            const left = rect.left - rootRect.left + (h.area.left * rect.width);
            const top = rect.top - rootRect.top + (h.area.top * rect.height);
            const width = (h.area.width * rect.width);
            const hHeight = (h.area.height * rect.height);
            entries.push({ id: h.id, left, top, width, height: hHeight, pageIndex, color: colorFor(h.confidence) });
        });
    });
    return entries;
}
const DEFAULT_WORKER_WEBWB = 'webwb/Pdfworkerminjs.js';
export default function JaygasiExtensionsInteractivePDFAdvanced(props) {
    const { getPConnect, PDFReference, OnSelectProperty, ConfidenceFilter = 0, height, workerUrl: providedWorkerUrl } = props;
    // Resolve pConnect and configuration props (may be empty in Storybook)
    const pConnect = getPConnect?.();
    const config = pConnect?.getConfigProps?.() || {};
    const pdfProp = config.pdfProperty || PDFReference;
    // Prefer a configured highlight property (FR-004). Fall back to the
    // historical 'PdfMapping' clipboard key for backwards compatibility.
    // Authors can set `highlightProp` in the component config to point at
    // the top-level page that contains pxResults (e.g. 'myPage').
    const highlightProp = config.highlightProp || 'PdfMapping';
    const additionalPropsCsv = config.additionalHighlightProps || '';
    const additionalProps = useMemo(() => additionalPropsCsv.split(',').map((s) => s.trim()).filter(Boolean), [additionalPropsCsv]);
    const onSelectProp = config.onSelectProperty || OnSelectProperty;
    const searchPropRef = config.searchPropRef || undefined;
    const enableSearch = !!config.enableSearch;
    const configuredConfidence = config.confidenceFilter ?? ConfidenceFilter;
    const enablePegaWorkaround = !!config.enablePegaWorkaround;
    const enableDebugging = !!config.enableDebugging;
    const testPxResultsJson = config.testPxResultsJson || '';
    // No UI debug state. When enabled, we will log debug info to the console only.
    // Safely stringify unknown clipboard values for debug UI
    function safeStringify(v) {
        try {
            return JSON.stringify(v, null, 2);
        }
        catch (_err) {
            if (typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('safeStringify failed', _err);
            return Object.prototype.toString.call(v);
        }
    }
    // Helper that tries both dot-prefixed and non-prefixed property refs and returns
    // the first defined value. Avoids swallowing exceptions silently; log debug if
    // an attempt throws.
    // Safe wrapper for pConnect.getValue that logs when debugging and returns
    // undefined on any error rather than throwing. Keeps call sites simple.
    const safeGetValue = useCallback((ref) => {
        try {
            return pConnect?.getValue?.(ref);
        }
        catch (err) {
            if (enableDebugging && typeof console !== 'undefined')
                console.debug('[InteractivePDFAdvanced] safeGetValue threw for', ref, err);
            return undefined;
        }
    }, [pConnect, enableDebugging]);
    // If a dotted path like 'pyWorkPage.PdfMapping' doesn't resolve directly,
    // try resolving the parent page ('.pyWorkPage' or 'pyWorkPage') and traverse
    // the remaining keys in JS. Returns undefined if traversal fails.
    const traverseDottedPath = useCallback((src) => {
        if (typeof src !== 'string' || !src.includes('.'))
            return undefined;
        const trimmed = src.startsWith('.') ? src.slice(1) : src;
        const parts = trimmed.split('.').filter(Boolean);
        if (parts.length <= 1)
            return undefined;
        const firstDot = `.${parts[0]}`;
        const parent = safeGetValue(firstDot) ?? safeGetValue(parts[0]);
        if (parent == null || typeof parent !== 'object')
            return undefined;
        let cur = parent;
        for (let i = 1; i < parts.length; i += 1) {
            const k = parts[i];
            // Use modern Object.hasOwn to satisfy lint rules
            if (cur && typeof cur === 'object' && Object.hasOwn(cur, k)) {
                cur = cur[k];
            }
            else {
                return undefined;
            }
        }
        return cur;
    }, [safeGetValue]);
    const tryResolveValue = useCallback((src) => {
        if (typeof src !== 'string')
            return undefined;
        const tryRefs = src.startsWith('.') ? [src, src.slice(1)] : [`.${src}`, src];
        for (const r of tryRefs) {
            const v = safeGetValue(r);
            if (typeof v !== 'undefined')
                return v;
        }
        // Fallback: traverse parent page then nested keys
        const traversed = traverseDottedPath(src);
        if (typeof traversed !== 'undefined')
            return traversed;
        // Final fallback: some runtimes only expose top-level pages (pyWorkPage, etc.)
        // Try to find the property on common roots so authors can specify just
        // the nested property name (e.g., 'PdfMapping') and have it resolved.
        const roots = ['pyWorkPage', 'pyCasePage', 'pyCaseInfo', 'pyDefault', 'pzInsPage', 'pxRequestor'];
        for (const r of roots) {
            const parent = safeGetValue(`.${r}`) ?? safeGetValue(r);
            if (parent && typeof parent === 'object' && Object.hasOwn(parent, src)) {
                return parent[src];
            }
        }
        return undefined;
    }, [safeGetValue, traverseDottedPath]);
    // During testing/debugging, if PdfMapping is missing in the clipboard,
    // populate it with a known sample object so highlights can be exercised
    // without requiring the backend to populate the property. This writes an
    // object (not a string) using the component's actions API.
    useEffect(() => {
        if (!enableDebugging)
            return undefined;
        if (typeof pConnect?.getActionsApi !== 'function')
            return undefined;
        const existing = safeGetValue('.PdfMapping') ?? safeGetValue('PdfMapping');
        if (typeof existing !== 'undefined' && existing != null) {
            if (typeof console !== 'undefined')
                console.log('[InteractivePDFAdvanced] PdfMapping exists, not overwriting');
            return undefined;
        }
        const safeParse = (s) => {
            if (!s)
                return null;
            try {
                return JSON.parse(s);
            }
            catch (err) {
                if (enableDebugging && typeof console !== 'undefined' && typeof console.debug === 'function')
                    console.debug('[InteractivePDFAdvanced] safeParse failed', err);
                return null;
            }
        };
        let parsed = safeParse(testPxResultsJson);
        if (!parsed)
            parsed = { pxResults: [{ id: 't1', confidence: 0.95, area: { left: 0.1, top: 0.1, width: 0.3, height: 0.15, pageindex: 0 } }] };
        try {
            pConnect.getActionsApi().updateFieldValue('.PdfMapping', parsed);
            if (typeof console !== 'undefined')
                console.log('[InteractivePDFAdvanced] Wrote sample PdfMapping to clipboard', parsed);
        }
        catch (err) {
            if (typeof console !== 'undefined')
                console.warn('[InteractivePDFAdvanced] Failed to write PdfMapping', err);
        }
        return undefined;
    }, [enableDebugging, pConnect, safeGetValue, testPxResultsJson]);
    // ...existing code...
    // Resolve PDF source (URL or base64 stored in property). Prefer the
    // configured pdfProperty from the component config, falling back to the
    // prop passed directly to the component for Storybook usage.
    let pdfSource = '';
    if (pdfProp?.startsWith('http') || pdfProp?.startsWith('data:application/pdf')) {
        pdfSource = pdfProp;
    }
    else if (pdfProp?.startsWith('.')) {
        pdfSource = pConnect.getValue(pdfProp);
    }
    else if (PDFReference?.startsWith('http') || PDFReference?.startsWith('data:application/pdf')) {
        pdfSource = PDFReference;
    }
    else if (PDFReference) {
        pdfSource = pConnect.getValue(PDFReference);
    }
    const fileUrl = useMemo(() => {
        if (!pdfSource)
            return '';
        if (pdfSource.startsWith('http'))
            return pdfSource;
        return base64ToBlobUrl(pdfSource);
    }, [pdfSource]);
    // (safeStringify declared above)
    // Prefer explicit workerUrl prop; otherwise choose based on environment safely
    const isStorybook = typeof process !== 'undefined' && process?.env?.STORYBOOK;
    const worker = providedWorkerUrl || (isStorybook ? '/pdf.worker.min.js' : DEFAULT_WORKER_WEBWB);
    // Helper: try to interpret confidenceFilter as a number; if it's a property
    // reference (starts with '.'), resolve it from clipboard at runtime.
    const resolveConfidence = useCallback(() => {
        if (typeof configuredConfidence === 'number')
            return configuredConfidence;
        if (typeof configuredConfidence === 'string') {
            const raw = configuredConfidence.trim();
            if (raw.startsWith('.')) {
                const v = pConnect.getValue(raw);
                return Number(v) || 0;
            }
            const n = Number(raw);
            return Number.isFinite(n) ? n : 0;
        }
        return 0;
    }, [configuredConfidence, pConnect]);
    // Helper to process array sources
    const processArray = useCallback((raw, allItems, src) => {
        if (raw.length > 0 && raw[0] && typeof raw[0] === 'object' && Array.isArray(raw[0].pxResults)) {
            for (const pageObj of raw) {
                if (Array.isArray(pageObj.pxResults)) {
                    for (const item of pageObj.pxResults) {
                        allItems.push({ ...item, pageIndex: pageObj.pageindex ?? pageObj.pageIndex ?? 0 });
                    }
                }
            }
            return;
        }
        const looksLikePxResults = raw.every((el) => el && (el.area || el.id || el.left || el.top));
        if (looksLikePxResults) {
            allItems.push(...raw);
            return;
        }
        if (typeof console !== 'undefined')
            console.warn('[InteractivePDFAdvanced] Received Array for', src, "but shape not recognized. Expected PageList (array of pages with pxResults) or pxResults array. Value:", raw);
    }, []);
    // Helper to process a single source and add to allItems
    const processSource = useCallback((src, allItems) => {
        if (!src)
            return;
        const raw = tryResolveValue(src);
        if (typeof console !== 'undefined') {
            console.log('[InteractivePDFAdvanced] highlight source:', src, '->', raw);
            if (typeof console.debug === 'function')
                console.debug('[InteractivePDFAdvanced] (debug) highlight source:', src, '->', raw);
        }
        if (Array.isArray(raw)) {
            processArray(raw, allItems, src);
            return;
        }
        const items = raw?.pxResults || [];
        if (!Array.isArray(items) && typeof console !== 'undefined') {
            console.warn('[InteractivePDFAdvanced] Unexpected structure for', src, '— expected { pxResults: [...] } or an Array. Value:', raw);
        }
        if (Array.isArray(items))
            allItems.push(...items);
    }, [tryResolveValue, processArray]);
    const highlightsByPage = useMemo(() => {
        const sources = [highlightProp, ...additionalProps];
        const allItems = [];
        sources.forEach((src) => processSource(src, allItems));
        const minConfidence = resolveConfidence();
        const grouped = new Map();
        allItems.forEach((it) => {
            const areaRaw = it.area || it;
            // Normalize coordinates (handles left/top vs top_coordinate and percentage vs fraction)
            const area = normalizeAreaRaw(areaRaw);
            const page = area.pageIndex || 0;
            if ((it.confidence || 0) < (minConfidence || 0))
                return;
            const entry = {
                id: it.id,
                confidence: it.confidence,
                area
            };
            grouped.set(page, [...(grouped.get(page) || []), entry]);
        });
        return grouped;
    }, [highlightProp, additionalProps, resolveConfidence, processSource]);
    // Render highlights for the page
    const highlightColor = (confidence) => {
        const c = confidence ?? 0;
        if (c >= 0.9)
            return 'rgba(40,167,69,0.6)';
        if (c >= 0.7)
            return 'rgba(255,193,7,0.6)';
        return 'rgba(220,53,69,0.6)';
    };
    // Overlay mapping: compute pixel rects for highlights based on page DOM sizes
    const viewerRootRef = useRef(null);
    const [pixelHighlights, setPixelHighlights] = useState([]);
    // Debug action: compute pixel overlays from a small inlined sample and set pixelHighlights
    const loadTestHighlights = useCallback(() => {
        const TEST_PX_RESULTS = [
            {
                id: 'test-1',
                confidence: 0.95,
                area: { left: 0.1, top: 0.1, width: 0.2, height: 0.05, pageindex: 0 }
            },
            {
                id: 'test-2',
                confidence: 0.75,
                area: { left: 0.5, top: 0.3, width: 0.2, height: 0.1, pageindex: 0 }
            }
        ];
        const entries = [];
        try {
            TEST_PX_RESULTS.forEach((h) => {
                const area = h.area || {};
                const pageIndex = area.pageIndex ?? area.page ?? area.pageindex ?? 0;
                const pageEl = viewerRootRef.current?.querySelector(`[data-page-index="${pageIndex}"]`);
                if (!pageEl)
                    return;
                const rect = pageEl.getBoundingClientRect();
                const rootRect = viewerRootRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
                const left = rect.left - rootRect.left + (area.left * rect.width);
                const top = rect.top - rootRect.top + (area.top * rect.height);
                const width = (area.width * rect.width);
                const hHeight = (area.height * rect.height);
                // Inline color calculation so the hook doesn't depend on external function identity
                const conf = h.confidence ?? 0;
                let color = 'rgba(220,53,69,0.6)';
                if (conf >= 0.9)
                    color = 'rgba(40,167,69,0.6)';
                else if (conf >= 0.7)
                    color = 'rgba(255,193,7,0.6)';
                entries.push({ id: h.id, left, top, width, height: hHeight, pageIndex, color });
            });
            setPixelHighlights(entries);
            if (enableDebugging && typeof console !== 'undefined')
                console.log('[InteractivePDFAdvanced] Loaded test highlights', entries);
        }
        catch (err) {
            if (typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('loadTestHighlights failed', err);
        }
    }, [enableDebugging]);
    // Centralized apply logic extracted to reduce complexity in the effect that
    // wires global handlers. Returns immediately; it will retry internally when
    // pages aren't rendered yet.
    const handleApplyInput = useCallback((input) => {
        if (!input)
            return;
        let obj = input;
        if (typeof obj === 'string') {
            try {
                obj = JSON.parse(obj);
            }
            catch (err) {
                if (typeof console !== 'undefined')
                    console.warn('applyPdfHighlights: invalid JSON', err);
                return;
            }
        }
        let results = [];
        if (Array.isArray(obj))
            results = obj;
        else if (obj && Array.isArray(obj.pxResults))
            results = obj.pxResults;
        if (!results.length) {
            if (typeof console !== 'undefined')
                console.warn('[InteractivePDFAdvanced] applyPdfHighlights: no pxResults found');
            return;
        }
        // Retry logic when pages haven't rendered yet
        const maxAttempts = 6;
        const delayMs = 300;
        let attempts = 0;
        const tryApplyEntries = () => {
            attempts += 1;
            const applied = applyPxResultsToViewer(results, viewerRootRef, setPixelHighlights, enableDebugging);
            if (applied) {
                if (typeof console !== 'undefined')
                    console.log('[InteractivePDFAdvanced] applyPxResultsToViewer applied after', attempts, 'attempt(s)');
                return;
            }
            if (attempts < maxAttempts) {
                if (typeof console !== 'undefined')
                    console.log('[InteractivePDFAdvanced] apply: no entries yet, retrying', attempts);
                setTimeout(tryApplyEntries, delayMs);
                return;
            }
            if (typeof console !== 'undefined')
                console.warn('[InteractivePDFAdvanced] applyPxResultsToViewer: no entries computed after retries');
        };
        tryApplyEntries();
    }, [setPixelHighlights, viewerRootRef, enableDebugging]);
    // Expose a simple global helper when debugging is enabled so you can paste
    // your pxResults JSON into the console and call __applyPDFHighlights(...).
    useEffect(() => {
        if (!enableDebugging)
            return undefined;
        // Reuse centralized apply logic to avoid duplicating parsing/retry behavior
        const apply = handleApplyInput;
        // Also accept postMessage commands so parents (including cross-origin)
        // can post pxResults into the viewer. Message format:
        // { type: 'InteractivePDFAdvanced:apply', payload: <pxResults|{pxResults:[]}> }
        // or { type: 'InteractivePDFAdvanced:clear' }
        let msgHandler = null;
        try {
            window.__applyPDFHighlights = apply;
            window.__clearPDFHighlights = () => setPixelHighlights([]);
            msgHandler = (ev) => {
                try {
                    const d = ev?.data;
                    if (!d || typeof d !== 'object')
                        return;
                    if (d.type === 'InteractivePDFAdvanced:apply') {
                        handleApplyInput(d.payload);
                    }
                    else if (d.type === 'InteractivePDFAdvanced:clear') {
                        setPixelHighlights([]);
                    }
                }
                catch (err) {
                    if (typeof console !== 'undefined' && typeof console.debug === 'function')
                        console.debug('InteractivePDFAdvanced: message handler error', err);
                }
            };
            window.addEventListener('message', msgHandler);
        }
        catch (err) {
            if (typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('Failed to attach global apply/clear helpers', err);
        }
        return () => {
            try {
                delete window.__applyPDFHighlights;
                delete window.__clearPDFHighlights;
                if (msgHandler)
                    window.removeEventListener('message', msgHandler);
            }
            catch (err) {
                if (typeof console !== 'undefined' && typeof console.debug === 'function')
                    console.debug('Failed to detach global apply/clear helpers', err);
            }
        };
    }, [enableDebugging, handleApplyInput]);
    useEffect(() => {
        const entries = computeEntriesFromGroupedHighlights(highlightsByPage, viewerRootRef, highlightColor);
        // If no entries were computed from clipboard/config, don't overwrite any
        // existing manual overlays applied via the TestHarness or console helpers.
        // This preserves manual debugging overlays until the user clears them.
        if (!entries.length)
            return;
        // Only update state when the computed entries actually change to avoid
        // triggering a re-render loop. Compare by length and ids (cheap shallow
        // comparison).
        setPixelHighlights((prev) => {
            if (prev.length !== entries.length)
                return entries;
            for (let i = 0; i < entries.length; i += 1) {
                if (prev[i].id !== entries[i].id)
                    return entries;
                if (prev[i].left !== entries[i].left || prev[i].top !== entries[i].top || prev[i].width !== entries[i].width || prev[i].height !== entries[i].height) {
                    return entries;
                }
            }
            return prev;
        });
    }, [highlightsByPage]);
    // When an external selection property is set (e.g., user selected an item in a
    // Page List), navigate to the corresponding page and ensure overlays are visible.
    useEffect(() => {
        if (!onSelectProp)
            return undefined;
        try {
            const sel = tryResolveValue(onSelectProp) ?? safeGetValue(onSelectProp);
            if (!sel)
                return undefined;
            let targetPage = null;
            highlightsByPage.forEach((items, pageIndex) => {
                if (items.some((it) => String(it.id) === String(sel)))
                    targetPage = pageIndex;
            });
            if (targetPage != null && viewerRootRef?.current) {
                const pageEl = findPageElement(viewerRootRef, targetPage);
                if (!pageEl || typeof pageEl.scrollIntoView !== 'function')
                    return undefined;
                // Use function length as a lightweight probe: older implementations
                // that don't accept options often have length === 0.
                const fnLen = pageEl.scrollIntoView.length || 0;
                if (fnLen > 0)
                    pageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                else
                    pageEl.scrollIntoView();
            }
        }
        catch (err) {
            if (enableDebugging && typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('selection->navigate failed', err);
        }
        return undefined;
    }, [onSelectProp, tryResolveValue, safeGetValue, highlightsByPage, viewerRootRef, enableDebugging]);
    // Expose the test loader to the global window when debugging is enabled so
    // you can call `__loadPDFTestHighlights()` from the browser console.
    useEffect(() => {
        if (!enableDebugging)
            return undefined;
        try {
            window.__loadPDFTestHighlights = loadTestHighlights;
        }
        catch (err) {
            if (enableDebugging && typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('Failed to attach __loadPDFTestHighlights to window', err);
        }
        return () => {
            try {
                delete window.__loadPDFTestHighlights;
            }
            catch (err) {
                if (enableDebugging && typeof console !== 'undefined' && typeof console.debug === 'function')
                    console.debug('Failed to detach __loadPDFTestHighlights from window', err);
            }
        };
    }, [enableDebugging, loadTestHighlights]);
    // Debug helper: search common top-level pages for a given property name and
    // log where it was found. Exposed as window.__findPDFProperty for manual use.
    const findInRoots = useCallback((propName) => {
        if (!propName || typeof propName !== 'string')
            return undefined;
        const roots = ['pyWorkPage', 'pyCasePage', 'pyCaseInfo', 'pyDefault', 'pzInsPage', 'pxRequestor'];
        // Shallow 2-level search (direct, child, grandchild) with a tiny helper
        const deepFind = (rootObj, targetKey) => {
            if (rootObj == null || typeof rootObj !== 'object')
                return undefined;
            const findInObject = (o) => (o && typeof o === 'object' && Object.hasOwn(o, targetKey) ? o[targetKey] : undefined);
            const direct = findInObject(rootObj);
            if (typeof direct !== 'undefined')
                return direct;
            for (const child of Object.values(rootObj)) {
                const v = findInObject(child);
                if (typeof v !== 'undefined')
                    return v;
            }
            for (const child of Object.values(rootObj)) {
                if (child && typeof child === 'object') {
                    const v2 = findInObject(child);
                    if (typeof v2 !== 'undefined')
                        return v2;
                }
            }
            return undefined;
        };
        for (const r of roots) {
            const parent = safeGetValue(`.${r}`) ?? safeGetValue(r);
            if (parent && typeof parent === 'object') {
                const found = deepFind(parent, propName);
                if (typeof found !== 'undefined') {
                    if (typeof console !== 'undefined')
                        console.log('[InteractivePDFAdvanced][debug] found under root:', r, safeStringify(found));
                    return { path: `${r}.${propName}`, value: found };
                }
            }
        }
        if (typeof console !== 'undefined')
            console.log('[InteractivePDFAdvanced][debug] findInRoots: not found for', propName);
        return undefined;
    }, [safeGetValue]);
    useEffect(() => {
        if (!enableDebugging)
            return undefined;
        try {
            window.__findPDFProperty = findInRoots;
        }
        catch (err) {
            if (enableDebugging && typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('Failed to attach __findPDFProperty to window', err);
        }
        return () => {
            try {
                delete window.__findPDFProperty;
            }
            catch (err) {
                if (enableDebugging && typeof console !== 'undefined' && typeof console.debug === 'function')
                    console.debug('Failed to detach __findPDFProperty', err);
            }
        };
    }, [enableDebugging, findInRoots]);
    // If the author pasted a JSON into the component configuration for quick testing,
    // parse and apply it as highlights once the viewer pages are available. Try once
    // again after a short delay if pages haven't rendered yet.
    useEffect(() => {
        if (!testPxResultsJson)
            return undefined;
        let parsed;
        try {
            parsed = JSON.parse(testPxResultsJson);
        }
        catch (err) {
            if (typeof console !== 'undefined')
                console.warn('[InteractivePDFAdvanced] testPxResultsJson invalid JSON', err);
            return undefined;
        }
        const tryApply = () => {
            let results = [];
            if (Array.isArray(parsed))
                results = parsed;
            else if (parsed && Array.isArray(parsed.pxResults))
                results = parsed.pxResults;
            return applyPxResultsToViewer(results, viewerRootRef, setPixelHighlights, enableDebugging);
        };
        // If pages aren't available yet, retry a few times before giving up
        if (!tryApply()) {
            const maxAttempts = 6;
            const delayMs = 300;
            let attempts = 0;
            let cancelled = false;
            const tfn = () => {
                if (cancelled)
                    return;
                attempts += 1;
                if (tryApply())
                    return;
                if (attempts < maxAttempts)
                    setTimeout(tfn, delayMs);
            };
            const t = setTimeout(tfn, delayMs);
            return () => { cancelled = true; clearTimeout(t); };
        }
        return undefined;
    }, [testPxResultsJson, enableDebugging]);
    // Console-only debug logging for configured highlight sources and the merged map
    useEffect(() => {
        if (!enableDebugging)
            return undefined;
        const sources = [highlightProp, ...additionalProps].filter(Boolean);
        for (const src of sources) {
            try {
                const val = tryResolveValue(String(src));
                if (typeof console !== 'undefined')
                    console.log('[InteractivePDFAdvanced][debug] source:', src, '->', safeStringify(val));
            }
            catch (err) {
                if (typeof console !== 'undefined')
                    console.log('[InteractivePDFAdvanced][debug] getValue threw for', src, err);
            }
        }
        try {
            const grouped = {};
            highlightsByPage.forEach((items, pageIndex) => { grouped[pageIndex] = items; });
            if (typeof console !== 'undefined')
                console.log('[InteractivePDFAdvanced][debug] merged highlightsByPage:', safeStringify(grouped));
        }
        catch (err) {
            if (typeof console !== 'undefined')
                console.log('[InteractivePDFAdvanced][debug] failed computing merged highlights', err);
        }
        return undefined;
    }, [enableDebugging, highlightProp, additionalProps, tryResolveValue, highlightsByPage]);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // Some Pega skins inject hostile global rules (including !important) that
    // force toolbar buttons to be block/100% width. Apply a focused set of
    // helpers to patch the toolbar and allow the effect to be small (improves
    // cognitive complexity scoring and testability).
    const setPriority = useCallback((el, prop, value) => {
        try {
            el.style.setProperty(prop, value, 'important');
        }
        catch (err) {
            if (typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('setPriority failed', err);
        }
    }, []);
    const patchChildAndInner = useCallback((ch) => {
        setPriority(ch, 'display', 'inline-flex');
        setPriority(ch, 'flex', '0 0 auto');
        setPriority(ch, 'width', 'auto');
        setPriority(ch, 'min-width', '24px');
        setPriority(ch, 'box-sizing', 'border-box');
        setPriority(ch, 'align-items', 'center');
        setPriority(ch, 'justify-content', 'center');
        const inner = Array.from(ch.querySelectorAll('div, span')).slice(0, 80);
        for (const d of inner) {
            setPriority(d, 'display', 'inline-flex');
            setPriority(d, 'width', 'auto');
            setPriority(d, 'box-sizing', 'border-box');
        }
    }, [setPriority]);
    const applyPatch = useCallback(() => {
        try {
            const root = viewerRootRef.current;
            if (!root)
                return;
            const toolbar = root.querySelector('.rpv-default-layout__toolbar') || root.querySelector('[data-testid="rpv-default-layout__toolbar"]');
            if (!toolbar)
                return;
            if (getComputedStyle(root).position === 'static') {
                setPriority(root, 'position', 'relative');
            }
            // Force horizontal toolbar layout
            setPriority(toolbar, 'display', 'flex');
            setPriority(toolbar, 'flex-direction', 'row');
            setPriority(toolbar, 'flex-wrap', 'nowrap');
            setPriority(toolbar, 'align-items', 'center');
            setPriority(toolbar, 'gap', '8px');
            setPriority(toolbar, 'white-space', 'nowrap');
            // Position toolbar absolutely across the top of the viewer
            setPriority(toolbar, 'position', 'absolute');
            setPriority(toolbar, 'top', '8px');
            setPriority(toolbar, 'left', '8px');
            setPriority(toolbar, 'right', '8px');
            setPriority(toolbar, 'width', 'auto');
            setPriority(toolbar, 'max-width', 'none');
            setPriority(toolbar, 'z-index', '2147483647');
            // Apply to buttons
            const buttons = Array.from(toolbar.querySelectorAll('button, .rpv-core__toolbar-button, .rpv-core__icon-button, [role="button"]'));
            buttons.forEach((b) => {
                setPriority(b, 'display', 'inline-flex');
                setPriority(b, 'width', 'auto');
                setPriority(b, 'min-width', '32px');
                setPriority(b, 'padding', '4px 8px');
                setPriority(b, 'align-items', 'center');
                setPriority(b, 'justify-content', 'center');
                setPriority(b, 'box-sizing', 'border-box');
            });
            // Patch direct children
            try {
                const directChildren = Array.from(toolbar.children).slice(0, 60);
                for (const childEl of directChildren)
                    patchChildAndInner(childEl);
            }
            catch (innerErr) {
                if (typeof console !== 'undefined' && typeof console.debug === 'function')
                    console.debug('InteractivePDFAdvanced: child-level patch failed', innerErr);
            }
            const tbRect = toolbar.getBoundingClientRect();
            const currentPaddingTop = parseFloat(getComputedStyle(root).paddingTop || '0') || 0;
            const needed = Math.ceil(tbRect.height + 12);
            if (currentPaddingTop < needed)
                setPriority(root, 'padding-top', `${needed}px`);
        }
        catch (e) {
            if (typeof console !== 'undefined' && typeof console.debug === 'function')
                console.debug('InteractivePDFAdvanced: applyPatch failed', e);
        }
    }, [patchChildAndInner, setPriority]);
    useEffect(() => {
        if (!enablePegaWorkaround)
            return;
        // Initial patch and observe for DOM changes
        applyPatch();
        const root = viewerRootRef.current;
        if (!root)
            return;
        const mo = new MutationObserver(() => applyPatch());
        mo.observe(root, { childList: true, subtree: true });
        return () => mo.disconnect();
    }, [fileUrl, enablePegaWorkaround, applyPatch]);
    // Runtime CSS override: Pega host styles sometimes force buttons to block/100% width
    // which breaks the pdf viewer toolbar. Inject a narrowly-scoped stylesheet with
    // higher specificity and !important to restore horizontal layout inside the
    // component wrapper.
    useEffect(() => {
        const runtimeCss = `
    .jaygasi-advanced-pdf .rpv-default-layout__toolbar {
      display: flex !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      gap: 8px !important;
      white-space: nowrap !important;
    }
    .jaygasi-advanced-pdf .rpv-default-layout__toolbar .rpv-core__toolbar-button,
    .jaygasi-advanced-pdf .rpv-default-layout__toolbar .rpv-core__icon-button,
    .jaygasi-advanced-pdf .rpv-default-layout__toolbar button,
    .jaygasi-advanced-pdf .rpv-default-layout__toolbar [role="button"] {
      display: inline-flex !important;
      width: auto !important;
      min-width: 32px !important;
      padding: 4px 8px !important;
      align-items: center !important;
      justify-content: center !important;
    }
    `;
        // Inject the runtime CSS once when the component mounts. Use a data attribute
        // so multiple instances won't duplicate styles if already present.
        const attr = 'data-jaygasi-advanced-pdf';
        if (!document.head.querySelector(`style[${attr}="true"]`)) {
            const tag = document.createElement('style');
            tag.setAttribute(attr, 'true');
            tag.appendChild(document.createTextNode(runtimeCss));
            document.head.appendChild(tag);
            return () => {
                if (tag.parentNode)
                    tag.parentNode.removeChild(tag);
            };
        }
        return undefined;
    }, []);
    // --- Search UI state and handler (writes the term to configured search property)
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        if (enableSearch && searchPropRef && typeof pConnect?.getActionsApi === 'function') {
            // Debounce/write directly — simple write for now
            pConnect.getActionsApi().updateFieldValue(searchPropRef, searchTerm);
        }
    }, [searchTerm, enableSearch, searchPropRef, pConnect]);
    return (_jsxs(ViewerWrapper, { className: "jaygasi-advanced-pdf", height: height, children: [enableSearch && (_jsxs("div", { style: { padding: '8px 12px', display: 'flex', gap: 8 }, children: [_jsx("input", { "aria-label": "PDF search", placeholder: "Search...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), style: { flex: 1, padding: '6px 8px', borderRadius: 4 } }), _jsx("button", { type: "button", onClick: () => setSearchTerm(''), children: "Clear" })] })), fileUrl ? (_jsx(Worker, { workerUrl: worker, children: _jsxs("div", { ref: viewerRootRef, style: { position: 'relative', height: '100%' }, children: [_jsx(Viewer, { fileUrl: fileUrl, plugins: [defaultLayoutPluginInstance], defaultScale: SpecialZoomLevel.PageFit }), _jsx("div", { style: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, pointerEvents: 'none' }, children: pixelHighlights.map((h) => (_jsx(Highlight, { style: { position: 'absolute', left: `${h.left}px`, top: `${h.top}px`, width: `${h.width}px`, height: `${h.height}px`, pointerEvents: 'auto' }, onClick: () => {
                                    if (onSelectProp)
                                        pConnect.getActionsApi().updateFieldValue(onSelectProp, h.id);
                                }, "$confidenceColor": h.color }, h.id))) })] }) })) : (_jsx("div", { style: { padding: 20 }, children: "No PDF source available" }))] }));
}
