export declare const pyReviewRaw: {
    name: string;
    type: string;
    config: {
        template: string;
        ruleClass: string;
        localeReference: string;
        context: string;
    };
    children: {
        name: string;
        type: string;
        children: ({
            type: string;
            config: {
                value: string;
                label: string;
                key: string;
                datasource?: undefined;
            };
        } | {
            type: string;
            config: {
                value: string;
                label: string;
                datasource: {
                    source: string;
                    fields: {
                        value: string;
                    };
                };
                key: string;
            };
        })[];
    }[];
    classID: string;
};
export declare const regionChildrenResolved: ({
    readOnly: any;
    value: string;
    label: string;
    hasSuggestions: boolean;
    key: string;
    datasource?: undefined;
} | {
    readOnly: any;
    value: string;
    label: string;
    datasource: {
        fields: {
            value: any;
        };
        source: {
            value: string;
        }[];
    };
    hasSuggestions: boolean;
    key: string;
})[];
