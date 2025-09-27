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
const DEFAULT_WORKER_WEBWB = 'webwb/Pdfworkerminjs.js';
export default function JaygasiExtensionsInteractivePDFAdvanced(props) {
    const { getPConnect, PDFReference, HighlightData, OnSelectProperty, ConfidenceFilter = 0, height, workerUrl: providedWorkerUrl } = props;
    // Resolve pConnect and configuration props (may be empty in Storybook)
    const pConnect = getPConnect?.();
    const config = pConnect?.getConfigProps?.() || {};
    const pdfProp = config.pdfProperty || PDFReference;
    const highlightProp = config.highlightProperty || HighlightData;
    const additionalPropsCsv = config.additionalHighlightProps || '';
    const additionalProps = useMemo(() => additionalPropsCsv.split(',').map((s) => s.trim()).filter(Boolean), [additionalPropsCsv]);
    const onSelectProp = config.onSelectProperty || OnSelectProperty;
    const searchPropRef = config.searchPropRef || undefined;
    const enableSearch = !!config.enableSearch;
    const configuredConfidence = config.confidenceFilter ?? ConfidenceFilter;
    const enablePegaWorkaround = !!config.enablePegaWorkaround;
    const enableDebugging = !!config.enableDebugging;
    const [debugOutputs, setDebugOutputs] = useState([]);
    // debugRanRef removed; let the effect run when deps change
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
    // Collect debug outputs from pConnect.getValue for the configured highlight sources.
    useEffect(() => {
        if (!enableDebugging) {
            setDebugOutputs([]);
            return undefined;
        }
        const sources = [highlightProp, ...additionalProps].filter(Boolean);
        const outs = [];
        // Helper to build a debug output entry for a single source
        const buildDebugEntry = (src) => {
            try {
                if (typeof src === 'string' && src.startsWith('.')) {
                    const val = pConnect.getValue(src);
                    const s = safeStringify(val);
                    const short = s.length > 2000 ? s.slice(0, 2000) + '...' : s;
                    if (enableDebugging && typeof console !== 'undefined')
                        console.log('[InteractivePDFAdvanced] (effect) highlight source:', src, '->', val);
                    return { src, valueStr: short };
                }
                return { src, valueStr: `not a property reference: ${String(src)}` };
            }
            catch (err) {
                const s = `getValue threw: ${String(err)}`;
                if (enableDebugging && typeof console !== 'undefined')
                    console.log('[InteractivePDFAdvanced] (effect) getValue threw for', src, err);
                return { src, valueStr: s };
            }
        };
        for (const src of sources) {
            outs.push(buildDebugEntry(src));
        }
        setDebugOutputs(outs);
        return undefined;
    }, [enableDebugging, highlightProp, additionalProps, pConnect]);
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
    const highlightsByPage = useMemo(() => {
        const sources = [highlightProp, ...additionalProps];
        const allItems = [];
        sources.forEach((src) => {
            if (!src)
                return;
            // Retrieve the configured clipboard value for this source and log it
            let raw;
            try {
                raw = pConnect.getValue(src);
            }
            catch (err) {
                raw = undefined;
                if (typeof console !== 'undefined')
                    console.log('[InteractivePDFAdvanced] getValue threw for', src, err);
            }
            if (typeof console !== 'undefined') {
                // Use console.log for better visibility across environments
                console.log('[InteractivePDFAdvanced] highlight source:', src, '->', raw);
                if (typeof console.debug === 'function')
                    console.debug('[InteractivePDFAdvanced] (debug) highlight source:', src, '->', raw);
            }
            // (Debug output captured in a separate effect to avoid state updates during render)
            // If the author pointed directly at pxResults (an Array), handle that
            // but also log a helpful hint that the component expects a Page/object
            if (Array.isArray(raw)) {
                if (typeof console !== 'undefined')
                    console.warn('[InteractivePDFAdvanced] getValue returned an Array for', src, "— recommend pointing highlightProperty at the parent Page containing { pxResults: [...] } rather than the array itself.");
                allItems.push(...raw);
                return;
            }
            const items = raw?.pxResults || [];
            if (!Array.isArray(items) && typeof console !== 'undefined') {
                console.warn('[InteractivePDFAdvanced] Unexpected structure for', src, '— expected { pxResults: [...] } or an Array. Value:', raw);
            }
            if (Array.isArray(items))
                allItems.push(...items);
        });
        const minConfidence = resolveConfidence();
        const grouped = new Map();
        allItems.forEach((it) => {
            const area = it.area || {};
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
    }, [highlightProp, additionalProps, pConnect, resolveConfidence]);
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
    useEffect(() => {
        const entries = [];
        highlightsByPage.forEach((items, pageIndex) => {
            const pageEl = viewerRootRef.current?.querySelector(`[data-page-index="${pageIndex}"]`);
            if (!pageEl)
                return;
            const rect = pageEl.getBoundingClientRect();
            items.forEach((h) => {
                const left = rect.left + (h.area.left / 100) * rect.width;
                const top = rect.top + (h.area.top / 100) * rect.height;
                const width = (h.area.width / 100) * rect.width;
                const hHeight = (h.area.height / 100) * rect.height;
                entries.push({ id: h.id, left, top, width, height: hHeight, pageIndex, color: highlightColor(h.confidence) });
            });
        });
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
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // Some Pega skins inject hostile global rules (including !important) that
    // force toolbar buttons to be block/100% width. When the viewer is rendered
    // inside an iframe, injecting a stylesheet from the parent won't help. As a
    // resilient fallback, set inline styles with priority 'important' directly
    // on the toolbar and buttons after the PDF is mounted.
    useEffect(() => {
        if (!enablePegaWorkaround)
            return;
        if (!viewerRootRef.current)
            return;
        const root = viewerRootRef.current;
        // Helper to apply inline style with 'important'
        const setPriority = (el, prop, value) => {
            try {
                el.style.setProperty(prop, value, 'important');
            }
            catch (err) {
                if (typeof console !== 'undefined' && typeof console.debug === 'function')
                    console.debug('setPriority failed', err);
            }
        };
        // Helper to patch a toolbar child and a limited set of inner wrappers.
        function patchChildAndInner(ch) {
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
        }
        const applyPatch = () => {
            try {
                const toolbar = root.querySelector('.rpv-default-layout__toolbar') || root.querySelector('[data-testid="rpv-default-layout__toolbar"]');
                if (!toolbar)
                    return;
                // Ensure the viewer root is positioned so absolute toolbar sits inside it
                if (getComputedStyle(root).position === 'static') {
                    setPriority(root, 'position', 'relative');
                }
                // Force toolbar horizontal layout
                setPriority(toolbar, 'display', 'flex');
                setPriority(toolbar, 'flex-direction', 'row');
                setPriority(toolbar, 'flex-wrap', 'nowrap');
                setPriority(toolbar, 'align-items', 'center');
                setPriority(toolbar, 'gap', '8px');
                setPriority(toolbar, 'white-space', 'nowrap');
                // Position toolbar absolutely across the top of the viewer so host
                // layout constraints (like narrow side columns) can't force vertical layout.
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
                // Aggressive: also patch direct children of the toolbar and a couple of
                // inner wrapper levels. Some Pega rules wrap icons in block elements or
                // apply width:100% to descendants — force them to be inline-flex.
                try {
                    const directChildren = Array.from(toolbar.children).slice(0, 60);
                    for (const childEl of directChildren) {
                        patchChildAndInner(childEl);
                    }
                }
                catch (innerErr) {
                    if (typeof console !== 'undefined' && typeof console.debug === 'function')
                        console.debug('InteractivePDFAdvanced: child-level patch failed', innerErr);
                }
                // Add padding to the viewer root so the PDF content isn't hidden behind the toolbar
                const tbRect = toolbar.getBoundingClientRect();
                const currentPaddingTop = parseFloat(getComputedStyle(root).paddingTop || '0') || 0;
                const needed = Math.ceil(tbRect.height + 12);
                if (currentPaddingTop < needed) {
                    setPriority(root, 'padding-top', `${needed}px`);
                }
            }
            catch (e) {
                if (typeof console !== 'undefined' && typeof console.debug === 'function')
                    console.debug('InteractivePDFAdvanced: applyPatch failed', e);
            }
        };
        // Initial patch
        applyPatch();
        // Observe and reapply if Pega re-renders the viewer subtree
        const mo = new MutationObserver(() => applyPatch());
        mo.observe(root, { childList: true, subtree: true });
        return () => mo.disconnect();
    }, [fileUrl, enablePegaWorkaround]);
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
                                }, "$confidenceColor": h.color }, h.id))) })] }) })) : (_jsx("div", { style: { padding: 20 }, children: "No PDF source available" })), enableDebugging && (_jsxs("div", { style: { position: 'fixed', right: 12, bottom: 12, width: 420, maxHeight: 300, overflow: 'auto', background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.12)', padding: 8, zIndex: 2147483646 }, children: [_jsx("div", { style: { fontSize: 12, fontWeight: 600, marginBottom: 6 }, children: "InteractivePDFAdvanced debug" }), _jsx("pre", { style: { fontSize: 11, whiteSpace: 'pre-wrap' }, children: JSON.stringify(debugOutputs, null, 2) })] }))] }));
}
//# sourceMappingURL=index.js.map