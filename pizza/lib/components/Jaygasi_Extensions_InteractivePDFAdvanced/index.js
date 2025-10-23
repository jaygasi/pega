import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { searchPlugin } from '@react-pdf-viewer/search';
import { Flex, Status, Text } from '@pega/cosmos-react-core';
import { logError } from './logger';
// PDF.js worker URL
const WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
const InteractivePDFAdvanced = ({ getPConnect }) => {
    const pConnect = getPConnect();
    const configProps = pConnect?.getConfigProps() || {};
    // Extract configuration with defaults
    const { pdfProperty = 'pdfBase64', textHighlightJSON, coordinateHighlightJSON, enableDebugging = false, confidenceFilter, height = '600px' } = configProps;
    // Read values from Pega clipboard
    const pdfBase64 = pConnect.getValue(pdfProperty);
    // Process coordinate highlights
    const processedHighlights = useMemo(() => {
        if (!coordinateHighlightJSON)
            return [];
        try {
            const parsed = JSON.parse(coordinateHighlightJSON);
            let highlights = Array.isArray(parsed) ? parsed : parsed.pxResults || [];
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
    }, [coordinateHighlightJSON, confidenceFilter]);
    // Process text highlights
    const processedTextHighlights = useMemo(() => {
        if (!textHighlightJSON)
            return [];
        try {
            const parsed = JSON.parse(textHighlightJSON);
            if (Array.isArray(parsed)) {
                return parsed;
            }
            if (parsed.textHighlights && Array.isArray(parsed.textHighlights)) {
                return parsed.textHighlights;
            }
            return [];
        }
        catch (e) {
            logError('Error parsing textHighlightJSON:', e);
            return [];
        }
    }, [textHighlightJSON]);
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
                }), processedTextHighlights.map((highlight, index) => {
                    const { pageIndex, boundingBox } = highlight;
                    if (pageIndex !== props.pageIndex)
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
        return [highlightPluginInstance, searchPluginInstance];
    }, [highlightPluginInstance, searchPluginInstance]);
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
    return (_jsxs("div", { style: { height, border: '1px solid #ccc' }, children: [_jsx(Worker, { workerUrl: WORKER_URL, children: _jsx(Viewer, { fileUrl: pdfUrl, plugins: plugins }) }), enableDebugging && (_jsxs("div", { style: { padding: '10px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ccc' }, children: [_jsx(Text, { variant: "h6", children: "Debug Information" }), _jsxs(Text, { children: ["Coordinate Highlights: ", processedHighlights.length] }), _jsxs(Text, { children: ["Text Highlights: ", processedTextHighlights.length] }), _jsxs(Text, { children: ["Confidence Filter: ", confidenceFilter || 'None'] })] }))] }));
};
export default InteractivePDFAdvanced;
