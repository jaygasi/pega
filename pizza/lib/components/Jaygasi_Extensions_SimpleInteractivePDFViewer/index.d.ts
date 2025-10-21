import React from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
interface SimpleInteractivePDFViewerProps {
    getPConnect: () => any;
    value: string;
    highlightParentProp: string;
    searchProperty?: string;
    height?: string;
    debug?: boolean;
}
declare const SimpleInteractivePDFViewer: React.FC<SimpleInteractivePDFViewerProps>;
export default SimpleInteractivePDFViewer;
