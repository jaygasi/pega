/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface JaygasiExtensionsPizzaPercentageProps extends PConnFieldProps {
    displayAsStatus?: boolean;
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
    showGroupSeparators: boolean;
    currencyDisplay: 'symbol' | 'code' | 'name' | undefined;
    negative: 'minus-sign' | 'parentheses' | undefined;
    notation: 'standard' | 'compact' | undefined;
    currencyDecimalPrecision: string;
}
declare const _default: (props: JaygasiExtensionsPizzaPercentageProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map