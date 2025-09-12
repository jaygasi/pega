import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Input, FieldValueList, Text, withConfiguration } from "@pega/cosmos-react-core";
import './create-nonce';
// includes in bundle
import { formatExists, textFormatter, urlFormatter } from "./text-url";
import handleEvent from "./event-utils";
import { suggestionsHandler } from './suggestions-handler';
import StyledJaygasiExtensionsPizzaUrlWrapper from './styles';
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaUrl(props) {
    const { getPConnect, value, hideLabel = false, placeholder, validatemessage, label, helperText, testId, displayMode, additionalProps = {}, variant = 'inline', isTableFormatter = false, displayAs = 'defaultURL', widthSel = 'defaultWidth', customWidth, altText = 'constant', altTextOfImage, propaltTextOfImage, urlLabel, propUrlLabel, urlLabelSelection = 'constant', tableDisplayAs = 'link', hasSuggestions = false } = props;
    const { formatter } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const hasValueChange = useRef(false);
    // BUG-547602: Temporary type coercion for 8.5 until DXAPIs are enhanced to pass original pxViewMetadata JSON, respecting boolean primitives
    let { readOnly = false, required = false, disabled = false } = props;
    [readOnly, required, disabled] = [readOnly, required, disabled].map((prop) => prop === true || (typeof prop === 'string' && prop === 'true'));
    const [inputValue, setInputValue] = useState(value);
    const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);
    useEffect(() => setInputValue(value), [value]);
    useEffect(() => {
        if (validatemessage !== '') {
            setStatus('error');
        }
        if (hasSuggestions) {
            setStatus('pending');
        }
        else if (!hasSuggestions && status !== 'success') {
            setStatus(validatemessage !== '' ? 'error' : undefined);
        }
    }, [validatemessage, hasSuggestions, status]);
    let displayComp = null;
    if (displayMode) {
        displayComp = urlFormatter(value, {
            displayAs,
            tableDisplayAs,
            isTableFormatter,
            altText,
            altTextOfImage,
            propaltTextOfImage,
            urlLabelSelection,
            urlLabel,
            propUrlLabel,
            widthSel,
            customWidth
        });
    }
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        if (isTableFormatter && formatter !== 'URL' && formatExists(formatter)) {
            displayComp = textFormatter(formatter, value);
        }
        return displayMode === 'DISPLAY_ONLY' ? (displayComp) : (_jsx(StyledJaygasiExtensionsPizzaUrlWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        return (_jsx(StyledJaygasiExtensionsPizzaUrlWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [
                    {
                        id: '2',
                        name: hideLabel ? '' : label,
                        value: (_jsx(Text, { variant: 'h1', as: 'span', children: displayComp }))
                    }
                ] }) }));
    }
    const onResolveSuggestionHandler = (accepted) => {
        suggestionsHandler(accepted, pConn, setStatus);
    };
    return (_jsx(StyledJaygasiExtensionsPizzaUrlWrapper, { children: _jsx(Input, { ...additionalProps, type: 'url', label: label, labelHidden: hideLabel, info: validatemessage || helperText, status: status, value: inputValue, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, "data-testid": testId, onChange: (event) => {
                if (hasSuggestions) {
                    setStatus('');
                }
                setInputValue(event.target.value);
                if (value !== event.target.value) {
                    handleEvent(actions, 'change', propName, event.target.value);
                    hasValueChange.current = true;
                }
            }, onBlur: (event) => {
                if (!value || hasValueChange.current) {
                    handleEvent(actions, 'blur', propName, event.target.value);
                    if (hasSuggestions) {
                        pConn.ignoreSuggestion('');
                    }
                    hasValueChange.current = false;
                }
            }, 
            // @ts-ignore
            onFocus: actions.onFocus, onResolveSuggestion: onResolveSuggestionHandler }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaUrl);
//# sourceMappingURL=index.js.map