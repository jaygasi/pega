import type { PConnFieldProps } from './PConnProps';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
interface JaygasiExtensionsPDFViewerProps extends PConnFieldProps {
    PDFReference: string;
    HighlightData: string;
    OnSelectProperty: string;
    ConfidenceFilter: string;
    height?: string;
}
export default function JaygasiExtensionsInteractivePdfViewer(props: Readonly<JaygasiExtensionsPDFViewerProps>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map