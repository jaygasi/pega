export declare const pyHome1Raw: {
    name: string;
    type: string;
    config: {
        type: string;
        template: string;
        icon: string;
        title: string;
        ruleClass: string;
        localeReference: string;
        enableGetNextWork: boolean;
        context: string;
    };
    children: {
        name: string;
        type: string;
        children: {
            type: string;
            config: {
                label: string;
                description: string;
                whatsnewlink: string;
                image: string;
                datasource: {
                    source: string;
                    fields: {
                        name: string;
                    };
                };
            };
        }[];
    }[];
    classID: string;
};
export declare const pyHome1Resolved: {
    name: string;
    type: string;
    config: {
        type: string;
        template: string;
        icon: string;
        title: string;
        ruleClass: string;
        localeReference: string;
        enableGetNextWork: boolean;
        context: string;
    };
    children: {
        name: string;
        type: string;
        getPConnect: () => {
            getComponentName: () => string;
            getComponent: () => any;
            getConfigProps: () => {};
        };
        children: {
            type: string;
            config: {
                label: string;
                description: string;
                whatsnewlink: string;
                image: string;
                datasource: {
                    source: string;
                    fields: {
                        name: string;
                    };
                };
            };
        }[];
    }[];
    classID: string;
};
