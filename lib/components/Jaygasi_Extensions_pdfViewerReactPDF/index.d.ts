import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
interface JaygasiExtensionsPDFViewerProps extends Readonly<PConnFieldProps> {
    pdfSource: string;
    height: string;
    highlightPropRef?: string;
    highlightTextStatic?: string;
    enableDebugging?: boolean;
}
export default function JaygasiExtensionsPDFViewer(props: Readonly<JaygasiExtensionsPDFViewerProps>): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map