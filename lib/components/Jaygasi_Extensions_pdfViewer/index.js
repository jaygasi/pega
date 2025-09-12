import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Text as CosmosText } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsPDFViewerWrapper from './styles';
export default function JaygasiExtensionsPDFViewer(props) {
    // Destructure all props passed from Pega
    const { getPConnect, label, hideLabel = false, pdfSource, height, highlightText = '', highlightTextStatic = '', debug = false } = props;
    const { readOnly = false, required = false, disabled = false, displayMode } = getPConnect().getConfigProps();
    const { helperText } = props;
    const [pdfUrl, setPdfUrl] = useState('about:blank');
    const [errorMessage, setErrorMessage] = useState('');
    // DEBUGGING: Log received props to the browser console
    if (debug) {
        console.log("--- PDFViewer Component Props Received ---");
        console.log("pdfSource (first 50 chars):", pdfSource?.substring(0, 50));
        console.log("highlightText (from property):", highlightText);
        console.log("highlightTextStatic (from static input):", highlightTextStatic);
    }
    const getPdfSrc = () => {
        if (!pdfSource) {
            return 'about:blank';
        }
        let src = pdfSource;
        // Ensure it's a full data URI
        if (!pdfSource.startsWith('data:application/pdf;base64,')) {
            src = `data:application/pdf;base64,${pdfSource}`;
        }
        // Static text takes precedence for easier testing
        const textToHighlight = highlightTextStatic || highlightText;
        if (textToHighlight) {
            if (debug) {
                console.log(`Applying highlight for search term: "${textToHighlight}"`);
            }
            // encodeURIComponent is crucial for terms with spaces or special characters
            src += `#search=${encodeURIComponent(textToHighlight)}`;
        }
        return src;
    };
    useEffect(() => {
        const newUrl = getPdfSrc();
        // This log is important! It shows the final URL being passed to the iframe.
        if (debug) {
            console.log("Setting iframe src:", newUrl);
        }
        setPdfUrl(newUrl);
    }, [pdfSource, highlightText, highlightTextStatic]);
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY' || displayMode === 'STACKED_LARGE_VAL' || readOnly) {
        return (_jsxs(StyledJaygasiExtensionsPDFViewerWrapper, { className: disabled ? 'disabled' : '', children: [_jsx("iframe", { src: pdfUrl, width: '100%', height: `${height || 600}px`, title: label, style: { border: 'none', opacity: disabled ? 0.5 : 1 }, onError: () => setErrorMessage('Failed to load PDF in read-only mode.') }, pdfUrl), errorMessage && _jsx(CosmosText, { style: { color: 'red' }, children: errorMessage }), required && !pdfSource && _jsx(CosmosText, { style: { color: 'red' }, children: "This field is required" })] }));
    }
    return (_jsxs(StyledJaygasiExtensionsPDFViewerWrapper, { className: disabled ? 'disabled' : '', children: [!hideLabel && _jsx(CosmosText, { children: required ? `${label} *` : label }), _jsx("iframe", { src: pdfUrl, width: '100%', height: `${height || 600}px`, title: label, style: { border: '1px solid #ccc', borderRadius: '4px', opacity: disabled ? 0.5 : 1 }, onError: () => setErrorMessage('Failed to load PDF.') }, pdfUrl), helperText && _jsx(CosmosText, { children: helperText }), errorMessage && _jsx(CosmosText, { style: { color: 'red' }, children: errorMessage }), required && !pdfSource && _jsx(CosmosText, { style: { color: 'red' }, children: "This field is required" })] }));
}
//# sourceMappingURL=index.js.map