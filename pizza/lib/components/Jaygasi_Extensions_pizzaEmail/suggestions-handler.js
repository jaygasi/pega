export const suggestionsHandler = (accepted, pConn, setStatus) => {
    if (accepted) {
        pConn.acceptSuggestion();
        setStatus('success');
    }
    else {
        pConn.ignoreSuggestion();
        setStatus(undefined);
    }
};
//# sourceMappingURL=suggestions-handler.js.map