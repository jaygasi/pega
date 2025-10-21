/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface JaygasiExtensionsPizzaTextProps extends PConnFieldProps {
    isTableFormatter?: boolean;
    formatter: string;
    variant?: any;
}
export declare const formatExists: (formatterVal: string) => boolean;
export declare const textFormatter: (formatter: string, value: string) => any;
declare const _default: (props: JaygasiExtensionsPizzaTextProps) => JSX.Element;
export default _default;
