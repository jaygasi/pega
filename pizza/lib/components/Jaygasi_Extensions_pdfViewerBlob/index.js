import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, Component } from 'react';
import { Text as CosmosText } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsPDFViewerBlobWrapper from './styles';
// Import react-pdf-viewer components
import { Worker, Viewer } from '@react-pdf-viewer/core';
import * as pdfjs from 'pdfjs-dist/build/pdf.worker.entry';
import '@react-pdf-viewer/core/lib/styles/index.css';
// Import the search plugin and its styles
import { searchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/search/lib/styles/index.css';
// Error Boundary Component
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
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
// --- REWRITTEN SearchToolbar Component ---
const SearchToolbar = ({ searchPluginInstance, initialSearchText }) => {
    const { highlight, jumpToNextMatch, jumpToPreviousMatch } = searchPluginInstance;
    const [keyword, setKeyword] = useState(initialSearchText);
    // Effect to update the keyword if the initial prop from Pega changes
    useEffect(() => {
        setKeyword(initialSearchText);
    }, [initialSearchText]);
    const handleSearch = () => {
        if (keyword) {
            highlight({ keyword, matchCase: false });
        }
    };
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', padding: '0.25rem 0.5rem', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderBottom: 'none' }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', flexGrow: 1 }, children: [_jsx("input", { type: "text", value: keyword, onChange: (e) => setKeyword(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') {
                            handleSearch();
                        } }, placeholder: "Search document", style: { border: '1px solid #ccc', padding: '0.25rem', width: '200px' } }), _jsx("button", { style: { marginLeft: '0.5rem' }, type: "button", onClick: handleSearch, children: "Search" })] }), _jsx("button", { style: { marginLeft: 'auto' }, type: "button", onClick: jumpToPreviousMatch, children: "Previous" }), _jsx("button", { style: { marginLeft: '0.5rem' }, type: "button", onClick: jumpToNextMatch, children: "Next" })] }));
};
// Extracted Content Components
const PDFContent = ({ pdfUrl, height, plugins, onDocLoad }) => (_jsx(ErrorBoundary, { onError: (error) => console.error('Error rendering PDF viewer:', error), children: _jsx("div", { className: "pdf-viewer-container", style: { height: `${height || 600}px`, width: '100%' }, children: _jsx(Viewer, { fileUrl: pdfUrl, plugins: plugins, onDocumentLoad: onDocLoad }) }) }));
const PDFDisplayController = ({ pdfSource, errorMessage, pdfUrl, height, plugins, onDocLoad }) => {
    if (!pdfSource) {
        return (_jsx("div", { style: { padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px', color: '#555' }, children: "No PDF data provided." }));
    }
    if (errorMessage) {
        return _jsx(CosmosText, { style: { color: 'red' }, children: errorMessage });
    }
    if (pdfUrl) {
        return _jsx(PDFContent, { pdfUrl: pdfUrl, height: height, plugins: plugins, onDocLoad: onDocLoad });
    }
    return _jsx(CosmosText, { style: { color: 'blue' }, children: "Loading PDF..." });
};
// Main Component
export default function JaygasiExtensionsPDFViewerBlob(props) {
    const { getPConnect, pdfSource = '', enableDebugging = false, label = '', hideLabel = false, height = '600', helperText = '', highlightPropRef = '', highlightTextStatic = '' } = props;
    const [isPegaReady, setIsPegaReady] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchText, setSearchText] = useState('');
    const searchPluginInstance = searchPlugin();
    const { highlight } = searchPluginInstance;
    useEffect(() => {
        if (!pdfSource || typeof pdfSource !== 'string') {
            setPdfUrl(null);
            setErrorMessage('');
            return undefined;
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
    useEffect(() => {
        if (isPegaReady) {
            if (highlightPropRef) {
                try {
                    const pConnect = getPConnect();
                    const propValue = pConnect.getValue(highlightPropRef);
                    if (propValue) {
                        setSearchText(propValue);
                        return;
                    }
                }
                catch (e) {
                    if (enableDebugging)
                        console.error(`Error reading property ${highlightPropRef}:`, e);
                }
            }
            if (highlightTextStatic) {
                setSearchText(highlightTextStatic);
            }
        }
    }, [isPegaReady, highlightPropRef, highlightTextStatic, getPConnect, enableDebugging]);
    const handleDocumentLoad = () => {
        if (searchText) {
            highlight({ keyword: searchText, matchCase: false });
        }
    };
    useEffect(() => {
        if (isPegaReady)
            return;
        try {
            const pConnect = getPConnect?.();
            const config = pConnect?.getConfigProps?.();
            if (pConnect && config && typeof config.label !== 'undefined') {
                setIsPegaReady(true);
            }
        }
        catch (error) {
            if (enableDebugging)
                console.error('Error resolving Pega context:', error);
        }
    }, [isPegaReady, getPConnect, enableDebugging]);
    if (!isPegaReady) {
        return _jsx(CosmosText, { style: { padding: '1rem' }, children: "Loading context..." });
    }
    const configProps = getConfigProps(getPConnect, enableDebugging);
    const { required = false, disabled = false, displayMode } = configProps;
    const isReadOnly = isReadOnlyMode(displayMode, configProps);
    const showLabel = !hideLabel && !isReadOnly;
    return (_jsxs(StyledJaygasiExtensionsPDFViewerBlobWrapper, { className: `${disabled ? 'disabled' : ''} ${isReadOnly ? 'read-only' : ''}`, children: [showLabel && _jsx(CosmosText, { children: required ? `${label} *` : label }), searchText && _jsx(SearchToolbar, { searchPluginInstance: searchPluginInstance, initialSearchText: searchText }), _jsx(Worker, { workerUrl: pdfjs, children: _jsx(PDFDisplayController, { pdfSource: pdfSource, errorMessage: errorMessage, pdfUrl: pdfUrl, height: height, plugins: [searchPluginInstance], onDocLoad: handleDocumentLoad }) }), helperText && _jsx(CosmosText, { children: helperText })] }));
}
