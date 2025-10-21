import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text as CosmosText } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsPDFViewerWrapper from './styles';
export default function JaygasiExtensionsPDFViewer(props) {
    const { getPConnect, label, hideLabel = true, value, pdfSource: propPdfSource, fileName: fileNameProp, debug = false } = props;
    const pConnect = getPConnect();
    // FIX: Check if fileNameProp exists before trying to resolve its value
    let resolvedFileName = '';
    if (fileNameProp) {
        resolvedFileName = pConnect.getValue(fileNameProp);
    }
    const { readOnly = false, required = false, disabled = false, displayMode, height = '600px' } = pConnect.getConfigProps();
    const { helperText } = props;
    const getPdfSrc = () => {
        if (!value && !propPdfSource) {
            return 'about:blank';
        }
        const pdfSource = value || propPdfSource;
        if (pdfSource.startsWith('data:application/pdf;base64,')) {
            return pdfSource;
        }
        return `data:application/pdf;base64,${pdfSource}`;
    };
    const pdfUrl = getPdfSrc();
    if (debug) {
        console.log(`PDFViewer using src: ${pdfUrl.substring(0, 100)}...`);
    }
    return (_jsxs(StyledJaygasiExtensionsPDFViewerWrapper, { className: `${disabled ? 'disabled' : ''} ${readOnly || displayMode ? 'read-only' : ''}`, children: [!hideLabel && _jsx(CosmosText, { children: required ? `${label} *` : label }), _jsx("iframe", { src: pdfUrl, width: '100%', height: height, title: resolvedFileName || label }, pdfUrl), helperText && _jsx(CosmosText, { children: helperText }), required && (!value && !propPdfSource) && _jsx(CosmosText, { style: { color: 'red' }, children: "This field is required" })] }));
}
