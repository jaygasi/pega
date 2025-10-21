export const apiRetryConfig = {
    TIMEOUT: {
        numberOfRetries: 1,
        retryOnCondition: (serverApiResponse) => serverApiResponse?.status === 599,
        retryWithOptions: { useExtendedTimeout: true }
    }
};
export const confirmationModalLabels = {
    TIMEOUT: {
        heading: 'Do you want to keep waiting?',
        genericDescription: 'This is taking some time. You can continue to wait or cancel?',
        tableNameMessagePrefix: 'Table',
        tableNameMessageSuffix: 'is taking some time. You can continue to wait or cancel?',
        cancelButtonLabel: 'Cancel',
        submitButtonLabel: 'Keep waiting'
    }
};
export const SEARCH_AND_SELECT_AS_EXTERNAL_FILTERS = 'SEARCH_AND_SELECT_AS_EXTERNAL_FILTERS';
