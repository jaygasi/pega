declare const historyData: {
    data: {
        fetchDateTime: string;
        pxObjClass: string;
        resultCount: number;
        data: {
            pxObjClass: string;
            pxTimeCreated: string;
            pyPerformer: string;
            pxInsName: string;
            pzInsKey: string;
            pxLongitude: any;
            pyMessageKey: string;
            pxHistoryForReference: string;
            pxLatitude: any;
            pyMemo: string;
        }[];
        hasMoreResults: boolean;
    };
    status: number;
    statusText: string;
    headers: {
        'content-length': string;
        'content-type': string;
    };
    request: {};
};
export default historyData;
