/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface JaygasiExtensionsPizzaPhoneProps extends PConnFieldProps {
    displayAsStatus?: boolean;
    isTableFormatter?: boolean;
    hasSuggestions?: boolean;
    variant?: any;
    formatter: string;
    datasource: any;
    showCountryCode: boolean;
}
export declare const formatExists: (formatterVal: string) => boolean;
export declare const textFormatter: (formatter: string, value: any) => any;
declare const _default: (props: JaygasiExtensionsPizzaPhoneProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map