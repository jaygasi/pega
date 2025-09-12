export declare const pyReviewRaw: any;
export declare const pyReviewResolved: {
    readOnly: boolean;
    template: string;
    ruleClass: string;
    showLabel: boolean;
    label: string;
    localeReference: string;
    showHighlightedData: boolean;
    highlightedData: ({
        type: string;
        config: {
            value: string;
            label: string;
            displayAsStatus: boolean;
            placeholder?: undefined;
        };
    } | {
        type: string;
        config: {
            value: string;
            label: string;
            displayAsStatus?: undefined;
            placeholder?: undefined;
        };
    } | {
        type: string;
        config: {
            label: string;
            value: {
                userId: string;
                userName: string;
            };
            placeholder: string;
            displayAsStatus?: undefined;
        };
    })[];
    displayMode: string;
};
export declare const regionChildrenResolved: ({
    readOnly: boolean;
    value: string;
    label: string;
    hideLabel: boolean;
    displayMode: string;
    key: string;
    listType?: undefined;
    datasource?: undefined;
} | {
    readOnly: boolean;
    value: string;
    label: string;
    hideLabel: boolean;
    listType: string;
    datasource: {
        key: string;
        value: string;
    }[];
    displayMode: string;
    key: string;
})[];
export declare const operatorDetails: {
    data: {
        pzLoadTime: string;
        pzPageNameHash: string;
        pyOperatorInfo: {
            pyUserName: string;
            pyPosition: string;
            pyImageInsKey: string;
            pySkills: {
                pySkillName: string;
                pzIndexOwnerKey: string;
                pySkillRating: number;
            }[];
            pyReportToUserName: string;
            pyReportTo: string;
            pyOrganization: string;
            pyTitle: string;
            pyLabel: string;
            pyEmailAddress: string;
            pyTelephone: string;
        };
    };
    status: number;
    statusText: string;
    headers: {
        'content-length': string;
        'content-type': string;
    };
    request: {};
};
export declare const configProps: {
    label: string;
    createLabel: string;
    updateLabel: string;
    updateDateTime: string;
    createDateTime: string;
    updateOperator: {
        userId: string;
        userName: string;
    };
    createOperator: {
        userId: string;
        userName: string;
    };
    resolveLabel: string;
    resolveOperator: string;
    resolveDateTime: string;
    hideLabel: boolean;
    key: string;
    displayMode: string;
};
//# sourceMappingURL=mock.d.ts.map