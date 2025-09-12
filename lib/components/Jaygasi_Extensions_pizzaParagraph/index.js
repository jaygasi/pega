import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { TextArea as CosmosTextArea, FieldValueList, ParagraphDisplay, Text, EmailDisplay, PhoneDisplay, URLDisplay, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
// includes in bundle
import { suggestionsHandler } from './suggestions-handler';
import handleEvent from "./event-utils";
import StyledJaygasiExtensionsPizzaParagraphWrapper from './styles';
export const formatExists = (formatterVal) => {
    const formatterValues = [
        "TextInput",
        "WorkStatus",
        "RichText",
        "Email",
        "Phone",
        "URL",
        "Operator"
    ];
    let isformatter = false;
    if (formatterValues.includes(formatterVal)) {
        isformatter = true;
    }
    return isformatter;
};
export const textFormatter = (formatter, value) => {
    let displayComponent = null;
    switch (formatter) {
        case "TextInput": {
            displayComponent = value;
            break;
        }
        case "Email": {
            displayComponent = (_jsx(EmailDisplay, { value: value, displayText: value, variant: "link" }));
            break;
        }
        case "Phone": {
            displayComponent = (_jsx(PhoneDisplay, { value: value, variant: "link" }));
            break;
        }
        case "URL": {
            displayComponent = (_jsx(URLDisplay, { target: "_blank", value: value, displayText: value, variant: "link" }));
            break;
        }
        // no default
    }
    return displayComponent;
};
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaParagraph(props) {
    const { getPConnect, value, hideLabel = false, placeholder, validatemessage, label, helperText, testId, fieldMetadata = {}, displayMode, additionalProps = {}, variant = 'inline', isTableFormatter = false, hasSuggestions = false } = props;
    const { formatter } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const maxLength = fieldMetadata?.maxLength;
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
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        let displayComp = _jsx(ParagraphDisplay, { value: value || undefined });
        if (isTableFormatter && formatExists(formatter) && formatter !== 'TextInput') {
            displayComp = textFormatter(formatter, value);
        }
        return displayMode === 'DISPLAY_ONLY' ? (_jsx(StyledJaygasiExtensionsPizzaParagraphWrapper, { children: displayComp })) : (_jsx(StyledJaygasiExtensionsPizzaParagraphWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        const isValDefined = typeof value !== 'undefined' && value !== '';
        const val = isValDefined ? (_jsx(Text, { variant: 'h1', as: 'span', children: value })) : ('');
        return (_jsx(StyledJaygasiExtensionsPizzaParagraphWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [{ id: '2', name: hideLabel ? '' : label, value: val }] }) }));
    }
    const onResolveSuggestionHandler = (accepted) => {
        suggestionsHandler(accepted, pConn, setStatus);
    };
    return (_jsx(StyledJaygasiExtensionsPizzaParagraphWrapper, { children: _jsx(CosmosTextArea, { ...additionalProps, label: label, labelHidden: hideLabel, info: validatemessage || helperText, value: inputValue, status: status, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, "data-testid": testId, maxLength: maxLength, displayCharCount: !!maxLength, hardStop: true, onChange: (event) => {
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
            }, onResolveSuggestion: onResolveSuggestionHandler }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaParagraph);
//# sourceMappingURL=index.js.map