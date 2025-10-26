/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
interface InteractivePDFAdvancedProps extends PConnFieldProps {
    height?: string;
    pdfProperty?: string;
    textHighlightJSON?: string;
    coordinateHighlightJSON?: string;
    onSelectProperty?: string;
    searchPropRef?: string;
    enableSearch?: boolean;
    enableDebugging?: boolean;
    confidenceFilter?: string;
}
declare const _default: (props: InteractivePDFAdvancedProps) => JSX.Element;
export default _default;
