/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface JaygasiExtensionsPizzaPicklistProps extends PConnFieldProps {
    defaultValue: number;
    isTableFormatter?: boolean;
    hasSuggestions?: boolean;
    variant?: any;
    formatter: string;
    decimalPrecision: string;
    allowDecimals: boolean;
    currencyISOCode: string;
    alwaysShowISOCode: boolean;
    isoCodeSelection: string;
    additionalProps: any;
    datasource: any;
    listType: string;
    fieldMetadata: any;
    onRecordChange: Function;
}
export declare const formatExists: (formatterVal: string) => boolean;
export declare const textFormatter: (formatter: string, value: any) => any;
export declare const setDefaultValue: (dropdownOptions: Array<any>, pConnect: any, propName: string) => void;
declare const _default: (props: JaygasiExtensionsPizzaPicklistProps) => JSX.Element;
export default _default;
