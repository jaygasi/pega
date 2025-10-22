import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { searchPlugin } from '@react-pdf-viewer/search';
import { Flex, Status, Text } from '@pega/cosmos-react-core';
import { logError } from './logger';
// PDF.js imports for text extraction
import * as pdfjsLib from 'pdfjs-dist';
// PDF.js worker URL
const WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;
const InteractivePDFAdvanced = ({ getPConnect }) => {
    const pConnect = getPConnect();
    const configProps = pConnect?.getConfigProps() || {};
    // Extract configuration with defaults
    const { pdfProperty = 'pdfBase64', highlightProperty = 'highlights', additionalHighlightProps, textHighlightProperty = 'textHighlights', textHighlightJSON, enableSearch = false, enableDebugging = false, testPxResultsJson, confidenceFilter, height = '600px' } = configProps;
    // State for PDF document and text highlights with positions
    const [pdfDocument, setPdfDocument] = useState(null);
    const [textHighlightsWithPositions, setTextHighlightsWithPositions] = useState([]);
    // Read values from Pega clipboard
    const pdfBase64 = pConnect.getValue(pdfProperty);
    const highlightData = pConnect.getValue(highlightProperty);
    const textHighlightData = pConnect.getValue(textHighlightProperty);
    // Load PDF document when base64 data changes
    useEffect(() => {
        if (!pdfBase64) {
            setPdfDocument(null);
            setTextHighlightsWithPositions([]);
            return;
        }
        const loadPdfDocument = async () => {
            try {
                // Convert base64 to Uint8Array
                const byteCharacters = atob(pdfBase64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.codePointAt(i) || 0;
                }
                const uint8Array = new Uint8Array(byteNumbers);
                // Load PDF document
                const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
                const pdf = await loadingTask.promise;
                setPdfDocument(pdf);
            }
            catch (error) {
                logError('Error loading PDF document:', error);
                setPdfDocument(null);
                setTextHighlightsWithPositions([]);
            }
        };
        loadPdfDocument();
    }, [pdfBase64]);
    // Process coordinate-based highlights
    const processedHighlights = useMemo(() => {
        let mergedHighlights = highlightData?.pxResults || [];
        // Handle additional highlight props
        if (additionalHighlightProps) {
            const additionalProps = additionalHighlightProps.split(',').map(p => p.trim());
            for (const prop of additionalProps) {
                const additionalData = pConnect.getValue(prop);
                if (additionalData?.pxResults) {
                    mergedHighlights = mergedHighlights.concat(additionalData.pxResults);
                }
            }
        }
        // Filter by confidence
        if (confidenceFilter) {
            const minConfidence = Number.parseFloat(confidenceFilter);
            mergedHighlights = mergedHighlights.filter(h => h.confidence >= minConfidence);
        }
        return mergedHighlights;
    }, [highlightData, additionalHighlightProps, confidenceFilter, pConnect]);
    // Find text positions when PDF document or text highlights change
    useEffect(() => {
        if (!pdfDocument) {
            setTextHighlightsWithPositions([]);
            return;
        }
        const findTextPositions = async () => {
            try {
                // Collect all text highlights
                let textHighlights = [];
                if (textHighlightData?.pxResults) {
                    textHighlights = textHighlightData.pxResults;
                }
                if (textHighlightJSON) {
                    try {
                        const parsed = JSON.parse(textHighlightJSON);
                        if (Array.isArray(parsed)) {
                            textHighlights = textHighlights.concat(parsed);
                        }
                    }
                    catch (e) {
                        logError('Error parsing textHighlightJSON:', e);
                    }
                }
                // Filter by confidence if specified
                if (confidenceFilter) {
                    const minConfidence = Number.parseFloat(confidenceFilter);
                    textHighlights = textHighlights.filter(h => h.confidence >= minConfidence);
                }
                // Find positions for each text highlight
                const highlightsWithPositions = await Promise.all(textHighlights.map(async (highlight) => {
                    if (highlight.boundingBox) {
                        // Already has coordinates
                        return highlight;
                    }
                    try {
                        const page = await pdfDocument.getPage(highlight.pageIndex + 1);
                        const textContent = await page.getTextContent();
                        const viewport = page.getViewport({ scale: 1 });
                        // Find text matches
                        const items = textContent.items;
                        for (const item of items) {
                            if (item.str.includes(highlight.text)) {
                                // Calculate bounding box from text item
                                const x = item.transform[4] / viewport.width;
                                const y = (viewport.height - item.transform[5] - item.height) / viewport.height;
                                const width = item.width / viewport.width;
                                const height = item.height / viewport.height;
                                return {
                                    ...highlight,
                                    boundingBox: {
                                        left: Math.max(0, x),
                                        top: Math.max(0, y),
                                        right: Math.min(1, x + width),
                                        bottom: Math.min(1, y + height)
                                    }
                                };
                            }
                        }
                        // If no exact match found, return with zero bounding box
                        logError(`Text "${highlight.text}" not found on page ${highlight.pageIndex + 1}`);
                        return {
                            ...highlight,
                            boundingBox: { left: 0, top: 0, right: 0, bottom: 0 }
                        };
                    }
                    catch (error) {
                        logError(`Error finding position for "${highlight.text}":`, error);
                        return {
                            ...highlight,
                            boundingBox: { left: 0, top: 0, right: 0, bottom: 0 }
                        };
                    }
                }));
                setTextHighlightsWithPositions(highlightsWithPositions);
            }
            catch (error) {
                logError('Error finding text positions:', error);
                setTextHighlightsWithPositions([]);
            }
        };
        findTextPositions();
    }, [pdfDocument, textHighlightData, textHighlightJSON, confidenceFilter]);
    // Process test highlights
    const processedTestHighlights = useMemo(() => {
        if (!testPxResultsJson)
            return [];
        try {
            const parsed = JSON.parse(testPxResultsJson);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch (e) {
            logError('Error parsing testPxResultsJson:', e);
            return [];
        }
    }, [testPxResultsJson]);
    // Convert base64 to blob URL
    const pdfUrl = useMemo(() => {
        if (!pdfBase64)
            return null;
        try {
            const byteCharacters = atob(pdfBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.codePointAt(i) || 0;
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        }
        catch (e) {
            logError('Error converting base64 to blob:', e);
            return null;
        }
    }, [pdfBase64]);
    // Initialize plugins
    const highlightPluginInstance = highlightPlugin({
        renderHighlights: (props) => (_jsxs("div", { children: [processedHighlights.map((highlight, index) => {
                    const { pageIndex, boundingBox } = highlight;
                    if (pageIndex !== props.pageIndex)
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
                        } }, `${pageIndex}-${boundingBox.left}-${boundingBox.top}-${index}`));
                }), processedTestHighlights.map((highlight, index) => {
                    const { pageIndex, boundingBox } = highlight;
                    if (pageIndex !== props.pageIndex)
                        return null;
                    return (_jsx("div", { style: {
                            position: 'absolute',
                            left: `${boundingBox.left * 100}%`,
                            top: `${boundingBox.top * 100}%`,
                            width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                            height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                            backgroundColor: 'rgba(255, 0, 0, 0.3)',
                            border: '1px solid #f00',
                            pointerEvents: 'none',
                            zIndex: 2,
                        } }, `test-${pageIndex}-${boundingBox.left}-${boundingBox.top}-${index}`));
                }), textHighlightsWithPositions.map((highlight, index) => {
                    // For text-based highlighting, boundingBox should be calculated automatically
                    // For text-based highlighting without boundingBox, implement PDF.js text position finding
                    const { pageIndex, boundingBox } = highlight;
                    if (pageIndex !== props.pageIndex || !boundingBox)
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
                        } }, `text-${pageIndex}-${boundingBox.left}-${boundingBox.top}-${index}`));
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
    // Register component conditionally
    useEffect(() => {
        if (pConnect?.registerComponent) {
            pConnect.registerComponent('InteractivePDFAdvanced', InteractivePDFAdvanced);
        }
    }, [pConnect]);
    // Cleanup blob URL
    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);
    if (!pdfUrl) {
        return (_jsx(Flex, { container: { direction: 'column', alignItems: 'center', justify: 'center' }, style: { height }, children: _jsx(Status, { variant: "info", children: "No PDF to display" }) }));
    }
    return (_jsxs("div", { style: { height, border: '1px solid #ccc' }, children: [_jsx(Worker, { workerUrl: WORKER_URL, children: _jsx(Viewer, { fileUrl: pdfUrl, plugins: plugins }) }), enableDebugging && (_jsxs("div", { style: { padding: '10px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ccc' }, children: [_jsx(Text, { variant: "h6", children: "Debug Information" }), _jsxs(Text, { children: ["Highlights: ", processedHighlights.length] }), _jsxs(Text, { children: ["Test Highlights: ", processedTestHighlights.length] }), _jsxs(Text, { children: ["Text Highlights: ", textHighlightsWithPositions.length] }), _jsxs(Text, { children: ["Confidence Filter: ", confidenceFilter || 'None'] })] }))] }));
};
export default InteractivePDFAdvanced;
