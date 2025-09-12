import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, Component } from 'react';
import { Text as CosmosText } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsPDFViewerBlobWrapper from './styles';
// Import react-pdf-viewer components and local pdfjs-dist
import { Worker, Viewer } from '@react-pdf-viewer/core';
import * as pdfjs from 'pdfjs-dist/build/pdf.worker.entry';
import '@react-pdf-viewer/core/lib/styles/index.css';
// Error Boundary Component
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(error, errorInfo) {
        this.props.onError(error);
        console.error("Uncaught error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return _jsx(CosmosText, { style: { color: 'red' }, children: "Error rendering PDF." });
        }
        return this.props.children;
    }
}
// Helper functions
const createPdfBlob = (pdfSource, enableDebugging) => {
    try {
        if (enableDebugging) {
            console.log(`Creating PDF blob from source with length ${pdfSource?.length || 0}.`);
        }
        const isDataUrl = pdfSource.startsWith('data:application/pdf;base64,');
        const base64Data = isDataUrl ? pdfSource.split(',')[1] : pdfSource;
        const binary = atob(base64Data);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) {
            array[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([array], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        if (enableDebugging)
            console.log('PDF Blob URL created:', url);
        return { url, error: '' };
    }
    catch (err) {
        if (enableDebugging)
            console.error('Error processing base64 to Blob:', err);
        return { url: null, error: 'Failed to process PDF data.' };
    }
};
const getConfigProps = (getPConnect, enableDebugging) => {
    try {
        return getPConnect()?.getConfigProps?.() || {};
    }
    catch (error) {
        if (enableDebugging)
            console.error('Error getting config props:', error);
        return {};
    }
};
const isReadOnlyMode = (displayMode, configProps) => {
    return ['LABELS_LEFT', 'DISPLAY_ONLY', 'STACKED_LARGE_VAL'].includes(displayMode) || configProps?.readOnly;
};
// Extracted Content Components
const PDFContent = ({ pdfUrl, height, disabled, isReadOnly }) => (_jsx(ErrorBoundary, { onError: (error) => console.error('Error rendering PDF viewer:', error), children: _jsx("div", { style: { height: `${height || 600}px`, width: '100%', border: isReadOnly ? 'none' : '1px solid #ccc', borderRadius: isReadOnly ? '0' : '4px', opacity: disabled ? 0.5 : 1 }, children: _jsx(Worker, { workerUrl: pdfjs, children: _jsx(Viewer, { fileUrl: pdfUrl }) }) }) }));
const PDFDisplayController = ({ pdfSource, errorMessage, pdfUrl, height, disabled, isReadOnly }) => {
    if (!pdfSource) {
        return (_jsx("div", { style: { padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px', color: '#555' }, children: "No PDF data provided." }));
    }
    if (errorMessage) {
        return _jsx(CosmosText, { style: { color: 'red' }, children: errorMessage });
    }
    if (pdfUrl) {
        return _jsx(PDFContent, { pdfUrl: pdfUrl, height: height, disabled: disabled, isReadOnly: isReadOnly });
    }
    return _jsx(CosmosText, { style: { color: 'blue' }, children: "Loading PDF..." });
};
// Main Component
export default function JaygasiExtensionsPDFViewerBlob(props) {
    const { getPConnect, pdfSource = '', enableDebugging = false, label = '', hideLabel = false, height = '600', helperText = '' } = props;
    const [isPegaReady, setIsPegaReady] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    // Create PDF Blob URL
    useEffect(() => {
        if (!pdfSource || typeof pdfSource !== 'string') {
            setPdfUrl(null);
            setErrorMessage('');
            return;
        }
        const { url, error } = createPdfBlob(pdfSource, enableDebugging);
        setPdfUrl(url);
        setErrorMessage(error);
        return () => {
            if (url) {
                URL.revokeObjectURL(url);
                if (enableDebugging)
                    console.log('PDF Blob URL revoked:', url);
            }
        };
    }, [pdfSource, enableDebugging]);
    // Simplified useEffect with Guard Clauses
    useEffect(() => {
        if (isPegaReady)
            return;
        console.log('DEBUG: Checking for Pega context...');
        try {
            const pConnect = getPConnect?.();
            console.log('DEBUG: pConnect object:', pConnect);
            if (!pConnect?.getConfigProps) {
                console.log('DEBUG: pConnect object missing getConfigProps. Context not ready.');
                return;
            }
            const config = pConnect.getConfigProps();
            console.log('DEBUG: config object:', config);
            if (!config || typeof config !== 'object') {
                console.log('DEBUG: config is not a valid object. Context not ready.');
                return;
            }
            console.log('DEBUG: config.displayMode is:', config.displayMode);
            if (typeof config.displayMode === 'undefined') {
                console.log('DEBUG: displayMode is undefined. Context not ready.');
                return;
            }
            setIsPegaReady(true);
            if (enableDebugging)
                console.log('Pega context resolved.');
        }
        catch (error) {
            if (enableDebugging)
                console.error('Error resolving Pega context:', error);
        }
    }, [isPegaReady, enableDebugging, getPConnect]);
    if (!isPegaReady) {
        return _jsx(CosmosText, { style: { padding: '1rem' }, children: "Loading context..." });
    }
    const configProps = getConfigProps(getPConnect, enableDebugging);
    const { required = false, disabled = false, displayMode } = configProps;
    const isReadOnly = isReadOnlyMode(displayMode, configProps);
    const showLabel = !hideLabel && !isReadOnly;
    return (_jsxs(StyledJaygasiExtensionsPDFViewerBlobWrapper, { className: disabled ? 'disabled' : '', children: [showLabel && _jsx(CosmosText, { children: required ? `${label} *` : label }), _jsx(PDFDisplayController, { pdfSource: pdfSource, errorMessage: errorMessage, pdfUrl: pdfUrl, height: height, disabled: disabled, isReadOnly: isReadOnly }), helperText && _jsx(CosmosText, { children: helperText })] }));
}
//# sourceMappingURL=index.js.map