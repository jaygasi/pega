import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { searchPlugin } from '@react-pdf-viewer/search';
import { Flex, Status, Text, withConfiguration } from '@pega/cosmos-react-core';
import { logError } from './logger';
// Log that the module is being loaded
console.log('InteractivePDFAdvanced module loaded');
// PDF.js worker URL
const WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
// Helper function to find text matches within a single text item
const findTextMatchesInItem = (itemText, searchText) => {
    const matches = [];
    const regex = new RegExp(searchText.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw `\$&`), 'gi');
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(itemText)) !== null) {
        matches.push({
            startIndex: match.index,
            text: match[0]
        });
        if (match.index === regex.lastIndex) {
            regex.lastIndex += 1;
        }
    }
    return matches;
};
// Helper function to calculate bounding box from a specific text item
const calculateBoundingBoxFromItem = (textItems, itemIndex, charOffsetInItem, matchText, page, enableDebugging = false) => {
    const item = textItems[itemIndex];
    if (!item?.transform)
        return null;
    const [scaleX, , , scaleY, translateX, translateY] = item.transform;
    const fontSize = Math.hypot(scaleX, scaleY);
    // Get text item dimensions
    const itemWidth = item.width || (item.str.length * fontSize * 0.6);
    const itemHeight = item.height || (fontSize * 1.2);
    // Calculate character width for this specific item
    const avgCharWidth = itemWidth / item.str.length;
    // Calculate match position within the text item
    const matchStartX = translateX + (charOffsetInItem * avgCharWidth);
    const matchWidth = matchText.length * avgCharWidth;
    const matchEndX = matchStartX + matchWidth;
    // Ensure the match doesn't exceed the text item bounds
    const clampedStartX = Math.max(translateX, matchStartX);
    const clampedEndX = Math.min(translateX + itemWidth, matchEndX);
    const actualWidth = clampedEndX - clampedStartX;
    const viewport = page.getViewport({ scale: 1 });
    // Convert to viewport coordinates (0-1 range)
    const left = clampedStartX / viewport.width;
    const right = (clampedStartX + actualWidth) / viewport.width;
    const top = (viewport.height - translateY - itemHeight) / viewport.height;
    const bottom = (viewport.height - translateY) / viewport.height;
    // Add small padding for better visual alignment
    const padding = 0.001; // Reduced padding for more precision
    const paddedLeft = Math.max(0, left - padding);
    const paddedRight = Math.min(1, right + padding);
    const paddedTop = Math.max(0, top - padding);
    const paddedBottom = Math.min(1, bottom + padding);
    return {
        boundingBox: {
            left: Math.max(0, Math.min(1, paddedLeft)),
            top: Math.max(0, Math.min(1, paddedTop)),
            right: Math.max(0, Math.min(1, paddedRight)),
            bottom: Math.max(0, Math.min(1, paddedBottom))
        },
        debug: enableDebugging ? {
            matchText,
            itemIndex,
            charOffsetInItem,
            fontSize,
            itemWidth,
            itemHeight,
            translateX,
            translateY,
            matchStartX,
            matchEndX,
            clampedStartX,
            clampedEndX,
            actualWidth,
            padding,
            finalBounds: { left: paddedLeft, top: paddedTop, right: paddedRight, bottom: paddedBottom },
            viewportWidth: viewport.width,
            viewportHeight: viewport.height
        } : undefined
    };
};
// Helper function to search for text in PDF and calculate bounding boxes
const searchTextInPDF = async (pdfUrl, textSearchTerms, enableDebugging) => {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const foundHighlights = [];
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
        // eslint-disable-next-line no-await-in-loop
        const highlights = await searchPageForTerms(pdf, pageNum, textSearchTerms, enableDebugging);
        foundHighlights.push(...highlights);
    }
    return foundHighlights;
};
// Helper function to search a single page with improved text matching
const searchPageForTerms = async (pdf, pageNum, textSearchTerms, enableDebugging) => {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const highlights = [];
    for (const term of textSearchTerms) {
        // Search within each text item individually for better accuracy
        for (let itemIndex = 0; itemIndex < textContent.items.length; itemIndex += 1) {
            const item = textContent.items[itemIndex];
            if (!item.str) {
                // eslint-disable-next-line no-continue
                continue;
            }
            const matches = findTextMatchesInItem(item.str, term.text);
            for (const match of matches) {
                const result = calculateBoundingBoxFromItem(textContent.items, itemIndex, match.startIndex, match.text, page, enableDebugging);
                if (result) {
                    highlights.push({
                        id: `${term.id}_${pageNum}_${itemIndex}_${match.startIndex}`,
                        confidence: term.confidence,
                        pageIndex: pageNum - 1,
                        boundingBox: result.boundingBox,
                        debug: result.debug
                    });
                }
            }
        }
    }
    return highlights;
};
// Helper function to resolve Pega property references
// This lets props like 'confidenceFilter' be a literal ("0.8") or a property (".MyFilter")
const getResolvedValue = (value, getPConnect) => {
    if (typeof value === 'string' && value.startsWith('.')) {
        // It's a property reference, resolve it
        const pConnect = getPConnect();
        if (pConnect && typeof pConnect.getValue === 'function') {
            return pConnect.getValue(value);
        }
        logError('getPConnect().getValue is not available to resolve property', value);
        return value;
    }
    // It's a literal value
    return value;
};
const ensureLeadingDot = (propRef) => {
    if (!propRef)
        return propRef;
    return propRef.startsWith('.') ? propRef : `.${propRef}`;
};
const coercePdfSource = (raw) => {
    if (typeof raw === 'string')
        return raw;
    if (raw && typeof raw === 'object') {
        const candidate = raw.pyFileSource
            ?? raw.pyStream
            ?? raw.pyBinaryStream
            ?? raw.pyBase64
            ?? raw.value;
        if (typeof candidate === 'string') {
            return candidate;
        }
    }
    return '';
};
const tryReadPdfFromClipboard = (pConnect, propRef) => {
    if (!pConnect || typeof pConnect.getValue !== 'function' || !propRef) {
        return '';
    }
    const trimmed = propRef.trim();
    const candidates = [trimmed];
    // Try the alternate dot/no-dot form as well in case the author configured either style
    if (trimmed.startsWith('.')) {
        candidates.push(trimmed.slice(1));
    }
    else {
        candidates.push(ensureLeadingDot(trimmed));
    }
    for (const candidate of candidates) {
        try {
            const raw = pConnect.getValue(candidate);
            const base64 = coercePdfSource(raw);
            if (base64) {
                return base64;
            }
        }
        catch (error) {
            logError(`InteractivePDFAdvanced: error reading pdfProperty ${candidate}`, error);
        }
    }
    return '';
};
const InteractivePDFAdvanced = (props) => {
    // Log all props received (always, not just when debugging is enabled)
    console.log('InteractivePDFAdvanced component received props:', Object.keys(props));
    console.log('InteractivePDFAdvanced full props:', props);
    // Get the Pega connection object
    const { getPConnect, value = '' } = props;
    const pConnect = getPConnect?.();
    // Get config props from Pega (fall back to an empty object if unavailable)
    const configProps = (pConnect?.getConfigProps?.() ?? {});
    const height = configProps.height ?? props.height ?? '600px';
    const rawTextHighlightJSON = configProps.textHighlightJSON ?? props.textHighlightJSON;
    const rawCoordinateHighlightJSON = configProps.coordinateHighlightJSON ?? props.coordinateHighlightJSON;
    const enableSearch = typeof configProps.enableSearch === 'boolean' ? configProps.enableSearch : props.enableSearch ?? false;
    const enableDebugging = typeof configProps.enableDebugging === 'boolean' ? configProps.enableDebugging : props.enableDebugging ?? false;
    const pdfProperty = configProps.pdfProperty ?? props.pdfProperty;
    const rawConfidenceFilter = configProps.confidenceFilter ?? props.confidenceFilter;
    const [resolvedPdfBase64, setResolvedPdfBase64] = useState(value || '');
    // Always log that component is being rendered (for debugging)
    console.log('InteractivePDFAdvanced component rendered.');
    useEffect(() => {
        if (value && typeof value === 'string' && value.trim() !== '') {
            if (enableDebugging) {
                console.log('InteractivePDFAdvanced: using bound value property for PDF source');
            }
            setResolvedPdfBase64(value);
            return;
        }
        const propRef = typeof pdfProperty === 'string' ? pdfProperty.trim() : '';
        if (!propRef) {
            if (enableDebugging) {
                console.log('InteractivePDFAdvanced: no pdfProperty configured and bound value empty');
            }
            setResolvedPdfBase64('');
            return;
        }
        if (!pConnect || typeof pConnect.getValue !== 'function') {
            if (enableDebugging) {
                console.log('InteractivePDFAdvanced: pConnect unavailable when attempting to read pdfProperty');
            }
            return;
        }
        let cancelled = false;
        let attempts = 0;
        const maxAttempts = 6;
        const delayMs = 250;
        const attemptResolve = () => {
            if (cancelled)
                return;
            attempts += 1;
            const resolved = tryReadPdfFromClipboard(pConnect, propRef);
            if (resolved) {
                if (enableDebugging) {
                    console.log(`InteractivePDFAdvanced: resolved pdfProperty '${propRef}' on attempt ${attempts}`);
                }
                setResolvedPdfBase64(resolved);
                return;
            }
            if (attempts < maxAttempts) {
                setTimeout(attemptResolve, delayMs);
            }
            else if (enableDebugging) {
                console.warn(`InteractivePDFAdvanced: unable to resolve pdfProperty '${propRef}' after ${attempts} attempts`);
            }
        };
        attemptResolve();
        return () => {
            cancelled = true;
        };
    }, [value, pdfProperty, pConnect, enableDebugging]);
    const pdfBase64 = resolvedPdfBase64;
    // This value could be a literal ("0.8") or a property reference (".MyFilter")
    const confidenceFilter = typeof rawConfidenceFilter === 'string'
        ? getResolvedValue(rawConfidenceFilter, getPConnect)
        : rawConfidenceFilter;
    // Debug logging for PDF processing
    console.log('InteractivePDFAdvanced PDF processing:', {
        pdfBase64: pdfBase64 ? `${pdfBase64.substring(0, 50)}...` : 'null/empty',
        pdfBase64Length: pdfBase64?.length || 0,
        pdfPropertyConfig: pdfProperty || 'not set',
        confidenceFilterResolved: confidenceFilter
    });
    // Process coordinate highlights
    const processedHighlights = useMemo(() => {
        const source = typeof rawCoordinateHighlightJSON === 'string'
            ? rawCoordinateHighlightJSON
            : '';
        if (!source || source.trim() === '')
            return [];
        try {
            const parsed = JSON.parse(source.trim());
            let highlights = Array.isArray(parsed) ? parsed : parsed.pxResults || [];
            // Filter out invalid highlights and ensure they have required properties
            highlights = highlights.filter(h => h &&
                typeof h === 'object' &&
                h.boundingBox &&
                typeof h.pageIndex === 'number' &&
                typeof h.confidence === 'number');
            // Filter by confidence
            if (confidenceFilter) {
                const minConfidence = Number.parseFloat(confidenceFilter);
                highlights = highlights.filter(h => h.confidence >= minConfidence);
            }
            return highlights;
        }
        catch (e) {
            logError('Error parsing coordinateHighlightJSON:', e);
            return [];
        }
    }, [rawCoordinateHighlightJSON, confidenceFilter]);
    // Process text highlights - extract text and confidence for searching
    const textSearchTerms = useMemo(() => {
        const source = typeof rawTextHighlightJSON === 'string'
            ? rawTextHighlightJSON
            : '';
        if (!source || source.trim() === '')
            return [];
        try {
            const parsed = JSON.parse(source.trim());
            let highlights = [];
            if (Array.isArray(parsed)) {
                highlights = parsed;
            }
            else if (parsed.textHighlights && Array.isArray(parsed.textHighlights)) {
                highlights = parsed.textHighlights;
            }
            // Filter out invalid highlights
            highlights = highlights.filter(h => h &&
                typeof h === 'object' &&
                typeof h.text === 'string' &&
                h.text.trim() !== '' &&
                typeof h.confidence === 'number');
            // Filter by confidence if specified
            if (confidenceFilter) {
                const minConfidence = Number.parseFloat(confidenceFilter);
                highlights = highlights.filter(h => h.confidence >= minConfidence);
            }
            return highlights.map(h => ({ text: h.text.trim(), confidence: h.confidence, id: h.id }));
        }
        catch (e) {
            logError('Error parsing textHighlightJSON:', e);
            return [];
        }
    }, [rawTextHighlightJSON, confidenceFilter]);
    // Convert base64 to blob URL
    const pdfUrl = useMemo(() => {
        console.log('Converting base64 to blob URL, pdfBase64 exists:', !!pdfBase64);
        if (!pdfBase64) {
            console.log('No pdfBase64, returning null');
            return null;
        }
        try {
            console.log('Starting base64 conversion...');
            // This will handle "data:application/pdf;base64," prefixes,
            // whitespace, or other junk, regardless of which property it came from.
            let cleanBase64 = pdfBase64.trim();
            const prefixIndex = cleanBase64.indexOf(',');
            if (prefixIndex > -1) {
                cleanBase64 = cleanBase64.substring(prefixIndex + 1);
            }
            // This handles base64 strings that are broken into multiple lines
            cleanBase64 = cleanBase64.replaceAll(/\s/g, '');
            const byteCharacters = atob(cleanBase64); // Use the cleaned string
            console.log('Decoded base64, length:', byteCharacters.length);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i += 1) {
                byteNumbers[i] = byteCharacters.codePointAt(i) || 0;
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            console.log('Created blob URL:', `${blobUrl.substring(0, 50)}...`);
            return blobUrl;
        }
        catch (e) {
            console.error('Error converting base64 to blob:', e);
            logError('Error converting base64 to blob:', e);
            if (enableDebugging) {
                console.error('PDF conversion error:', e);
            }
            return null;
        }
    }, [pdfBase64, enableDebugging]); // 'pdfBase64' is now the correctly resolved string
    // State for found text highlights with bounding boxes
    const [foundTextHighlights, setFoundTextHighlights] = useState([]);
    // Search for text in PDF and get bounding boxes
    useEffect(() => {
        if (!pdfUrl || textSearchTerms.length === 0) {
            setFoundTextHighlights([]);
            return;
        }
        // Clear previous results
        setFoundTextHighlights([]);
        // Asynchronous text search - doesn't block PDF loading
        const performTextSearch = async () => {
            try {
                const foundHighlights = await searchTextInPDF(pdfUrl, textSearchTerms, enableDebugging);
                setFoundTextHighlights(foundHighlights);
            }
            catch (error) {
                logError('Error performing text search:', error);
                setFoundTextHighlights([]);
            }
        };
        // Start the search asynchronously
        performTextSearch();
    }, [pdfUrl, textSearchTerms]);
    // Initialize plugins
    const highlightPluginInstance = highlightPlugin({
        renderHighlights: (renderProps) => (_jsxs("div", { children: [processedHighlights.map((highlight) => {
                    const { pageIndex, boundingBox } = highlight;
                    if (pageIndex !== renderProps.pageIndex)
                        return null;
                    return (_jsx("div", { style: {
                            position: 'absolute',
                            left: `${boundingBox.left * 100}%`,
                            top: `${boundingBox.top * 100}%`,
                            width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                            height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                            backgroundColor: 'rgba(255, 255, 0, 0.3)',
                            border: '1px solid #ff0',
                            pointerEvents: 'none',
                            zIndex: 1,
                        } }, highlight.id));
                }), foundTextHighlights.map((highlight) => {
                    const { pageIndex, boundingBox } = highlight;
                    if (pageIndex !== renderProps.pageIndex)
                        return null;
                    return (_jsx("div", { style: {
                            position: 'absolute',
                            left: `${boundingBox.left * 100}%`,
                            top: `${boundingBox.top * 100}%`,
                            width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                            height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                            backgroundColor: 'rgba(0, 255, 0, 0.3)',
                            border: '1px solid #0f0',
                            pointerEvents: 'none',
                            zIndex: 3,
                        } }, highlight.id));
                })] })),
    });
    const searchPluginInstance = searchPlugin();
    const plugins = useMemo(() => {
        const pluginList = [highlightPluginInstance];
        if (enableSearch) {
            pluginList.push(searchPluginInstance);
        }
        return pluginList;
    }, [highlightPluginInstance, searchPluginInstance, enableSearch]);
    // Cleanup blob URL
    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);
    // Log the final decision
    console.log('InteractivePDFAdvanced render decision:', {
        hasPdfUrl: !!pdfUrl,
        pdfUrl: pdfUrl ? `${pdfUrl.substring(0, 50)}...` : 'null',
        willShowNoPdfMessage: !pdfUrl
    });
    if (!pdfUrl) {
        return (_jsx(Flex, { container: { direction: 'column', alignItems: 'center', justify: 'center' }, style: { height }, children: _jsx(Status, { variant: "info", children: "No PDF to display" }) }));
    }
    return (_jsxs("div", { style: { height, border: '1px solid #ccc' }, children: [_jsx(Worker, { workerUrl: WORKER_URL, children: _jsx(Viewer, { fileUrl: pdfUrl, plugins: plugins, onDocumentLoad: (e) => {
                        if (enableDebugging) {
                            console.log('PDF document loaded successfully:', e);
                        }
                    } }) }), enableDebugging && (_jsxs("div", { style: { padding: '10px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ccc' }, children: [_jsx(Text, { variant: "h6", children: "Debug Information" }), _jsxs(Text, { children: ["Coordinate Highlights: ", processedHighlights.length] }), _jsxs(Text, { children: ["Text Highlights: ", foundTextHighlights.length] }), foundTextHighlights.some(h => h.debug) && (_jsxs("div", { style: { marginTop: 8 }, children: [_jsx(Text, { variant: "h6", style: { fontSize: 12 }, children: "Debug Info (First Highlight):" }), foundTextHighlights.find(h => h.debug) && (_jsxs("div", { style: { fontSize: 11, fontFamily: 'monospace' }, children: [_jsxs("div", { children: ["Match: \"", foundTextHighlights.find(h => h.debug)?.debug?.matchText, "\""] }), _jsxs("div", { children: ["Item Index: ", foundTextHighlights.find(h => h.debug)?.debug?.itemIndex] }), _jsxs("div", { children: ["Char Offset: ", foundTextHighlights.find(h => h.debug)?.debug?.charOffsetInItem] }), _jsxs("div", { children: ["Font Size: ", foundTextHighlights.find(h => h.debug)?.debug?.fontSize?.toFixed(2)] }), _jsxs("div", { children: ["Item W\u00D7H: ", foundTextHighlights.find(h => h.debug)?.debug?.itemWidth?.toFixed(1), "\u00D7", foundTextHighlights.find(h => h.debug)?.debug?.itemHeight?.toFixed(1)] }), _jsxs("div", { children: ["Translate X/Y: ", foundTextHighlights.find(h => h.debug)?.debug?.translateX?.toFixed(1), ", ", foundTextHighlights.find(h => h.debug)?.debug?.translateY?.toFixed(1)] }), _jsxs("div", { children: ["Match X Range: ", foundTextHighlights.find(h => h.debug)?.debug?.matchStartX?.toFixed(1), " - ", foundTextHighlights.find(h => h.debug)?.debug?.matchEndX?.toFixed(1)] }), _jsxs("div", { children: ["Clamped X Range: ", foundTextHighlights.find(h => h.debug)?.debug?.clampedStartX?.toFixed(1), " - ", foundTextHighlights.find(h => h.debug)?.debug?.clampedEndX?.toFixed(1)] }), _jsxs("div", { children: ["Actual Width: ", foundTextHighlights.find(h => h.debug)?.debug?.actualWidth?.toFixed(1)] }), _jsxs("div", { children: ["Padding: ", foundTextHighlights.find(h => h.debug)?.debug?.padding] }), _jsxs("div", { children: ["Final Bounds: L", foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.left?.toFixed(3), " T", foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.top?.toFixed(3), " R", foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.right?.toFixed(3), " B", foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.bottom?.toFixed(3)] }), _jsxs("div", { children: ["Viewport: ", foundTextHighlights.find(h => h.debug)?.debug?.viewportWidth?.toFixed(0), "\u00D7", foundTextHighlights.find(h => h.debug)?.debug?.viewportHeight?.toFixed(0)] })] }))] })), _jsxs(Text, { children: ["Confidence Filter: ", confidenceFilter || 'None'] })] }))] }));
};
// Log that the component is being exported
console.log('InteractivePDFAdvanced component exported with withConfiguration');
export default withConfiguration(InteractivePDFAdvanced);
