/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface JaygasiExtensionsPizzaEmailProps extends PConnFieldProps {
    helperText: string;
    isTableFormatter?: boolean;
    hasSuggestions?: boolean;
    variant?: any;
    formatter: string;
}
export declare const formatExists: (formatterVal: string) => boolean;
export declare const textFormatter: (formatter: string, value: any) => any;
declare const _default: (props: JaygasiExtensionsPizzaEmailProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map