import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
interface JaygasiExtensionsPDFViewerBlobProps extends Readonly<PConnFieldProps> {
    pdfSource: string;
    height: string;
    enableDebugging?: boolean;
    highlightPropRef?: string;
    highlightTextStatic?: string;
}
export default function JaygasiExtensionsPDFViewerBlob(props: Readonly<JaygasiExtensionsPDFViewerBlobProps>): import("react/jsx-runtime").JSX.Element;
export {};
