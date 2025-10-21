export declare const COSMOS_FORMAT_CONSTANTS: {
    SHORT: string;
    LONG: string;
};
export declare const COSMOS_VARIANT_CONSTANTS: {
    DATE_TIME: string;
    DATE: string;
    RELATIVE: string;
    TIME: string;
};
export declare const DATE_TYPES: {
    DATE: string;
    DATE_TIME: string;
    TIME: string;
};
export declare function format(value: any, options: any): string;
declare const _default: {
    'DateTime-Long': (value: any, options: any) => string;
    'DateTime-Short': (value: any, options: any) => string;
    'DateTime-Since': (value: any, options: any) => string;
    'Time-Only': (value: any, options: any) => string;
    convertToTimezone: (value: any, options: any) => any;
    convertFromTimezone: (value: any, timezone: any) => any;
    Date: (value: any, options: any) => any;
    'Date-Default': (value: any, options: any) => string;
    'Date-Time-Default': (value: any, options: any) => string;
    'Time-Default': (value: any, options: any) => string;
};
export default _default;
