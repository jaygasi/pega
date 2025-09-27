import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import library CSS first so component-scoped overrides (styled-components)
// can reliably target the generated classes and correct layout issues.
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ViewerWrapper, Highlight } from './styles';
// --- Interfaces & Constants ---
const CONFIDENCE_THRESHOLDS = {
    HIGH: 0.9,
    MEDIUM: 0.7,
    LOW: 0
};
const CONFIDENCE_COLORS = {
    HIGH: 'rgba(40, 167, 69, 1)', // green
    MEDIUM: 'rgba(255, 193, 7, 1)', // yellow
    LOW: 'rgba(220, 53, 69, 1)' // red
};
// --- Helper function to convert Base64 to a Blob URL ---
function base64ToBlobUrl(base64) {
    try {
        const base64WithoutPrefix = base64.startsWith('data:application/pdf;base64,')
            ? base64.substring('data:application/pdf;base64,'.length)
            : base64;
        const byteCharacters = atob(base64WithoutPrefix);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i += 1) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    }
    catch (e) {
        console.error('InteractivePdfViewer DEBUG: Error converting Base64 to Blob URL:', e);
        return '';
    }
}
// --- Main Component ---
export default function JaygasiExtensionsInteractivePdfViewer(props) {
    const { getPConnect, PDFReference, HighlightData, OnSelectProperty, ConfidenceFilter, height } = props;
    const pConnect = getPConnect();
    const { updateFieldValue } = pConnect.getActionsApi();
    // --- Get data from Pega ---
    let pdfSource = '';
    if (PDFReference?.startsWith('data:application/pdf;base64,') || PDFReference?.startsWith('http')) {
        pdfSource = PDFReference;
    }
    else {
        pdfSource = pConnect.getValue(PDFReference);
    }
    // --- Process highlights ---
    const processedHighlights = useMemo(() => {
        const highlightData = pConnect.getValue(HighlightData)?.pxResults || [];
        const selectedFieldId = pConnect.getValue(OnSelectProperty);
        const confidenceFilter = pConnect.getValue(ConfidenceFilter) || CONFIDENCE_THRESHOLDS.LOW;
        if (!highlightData)
            return [];
        return highlightData
            .filter(item => item.confidence >= confidenceFilter)
            .map(item => {
            let color = CONFIDENCE_COLORS.LOW;
            if (item.confidence >= CONFIDENCE_THRESHOLDS.HIGH) {
                color = CONFIDENCE_COLORS.HIGH;
            }
            else if (item.confidence >= CONFIDENCE_THRESHOLDS.MEDIUM) {
                color = CONFIDENCE_COLORS.MEDIUM;
            }
            return {
                ...item.area,
                id: item.id,
                confidenceColor: color,
                isSelected: item.id === selectedFieldId
            };
        });
    }, [pConnect, HighlightData, OnSelectProperty, ConfidenceFilter]);
    // --- Render individual highlights ---
    const renderHighlightTarget = (renderProps) => (_jsx("div", { children: processedHighlights
            .filter(h => h.pageIndex === renderProps.pageIndex)
            .map((h) => (_jsx(Highlight, { style: {
                left: `${h.left}%`,
                top: `${h.top}%`,
                width: `${h.width}%`,
                height: `${h.height}%`,
            }, onClick: () => updateFieldValue(OnSelectProperty, h.id), "$confidenceColor": h.confidenceColor, "$isSelected": h.isSelected }, h.id))) }));
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const highlightPluginInstance = highlightPlugin({ renderHighlightTarget });
    // --- Create Blob URL for the PDF ---
    const fileUrl = useMemo(() => {
        if (!pdfSource)
            return '';
        if (pdfSource.startsWith('http')) {
            return pdfSource;
        }
        return base64ToBlobUrl(pdfSource);
    }, [pdfSource]);
    // --- Render Viewer ---
    // Guard access to `process.env` so this code does not throw when executed
    // inside the Pega/Constellation runtime (where `process` is not defined).
    const isStorybook = typeof process !== 'undefined' && process?.env?.STORYBOOK;
    const workerUrl = isStorybook
        ? '/pdf.worker.min.js'
        : 'webwb/Pdfworkerminjs.js';
    return (
    // Add a stable class name to scope aggressive CSS overrides and avoid
    // collisions with Pega global styles.
    _jsx(ViewerWrapper, { className: "jaygasi-interactive-pdf", height: height, children: fileUrl ? (_jsx(Worker, { workerUrl: workerUrl, children: _jsx(Viewer, { fileUrl: fileUrl, plugins: [
                    defaultLayoutPluginInstance,
                    highlightPluginInstance
                ], defaultScale: SpecialZoomLevel.PageFit }) })) : (_jsx("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }, children: _jsx("p", { style: { color: 'red' }, children: "InteractivePdfViewer: No PDF Source. Check configuration for 'PDFReference'." }) })) }));
}
//# sourceMappingURL=index.js.map