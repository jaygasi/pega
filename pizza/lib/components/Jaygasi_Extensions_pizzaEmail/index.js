import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Input, EmailDisplay, FieldValueList, Text, URLDisplay, PhoneDisplay, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
// includes in bundle
import { suggestionsHandler } from './suggestions-handler';
import handleEvent from "./event-utils";
import StyledJaygasiExtensionsPizzaEmailWrapper from './styles';
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
function JaygasiExtensionsPizzaEmail(props) {
    const { getPConnect, value, placeholder, validatemessage, label, hideLabel = false, helperText, testId, displayMode, additionalProps = {}, variant = 'inline', isTableFormatter = false, hasSuggestions = false } = props;
    const { formatter } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const hasValueChange = useRef(false);
    let { readOnly = false, required = false, disabled = false } = props;
    [readOnly, required, disabled] = [readOnly, required, disabled].map((prop) => prop === true || (typeof prop === 'string' && prop === 'true'));
    const [inputValue, setInputValue] = useState(value);
    useEffect(() => setInputValue(value), [value]);
    const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);
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
        displayComp = _jsx(EmailDisplay, { value: value, displayText: inputValue, variant: 'link' });
    }
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        if (isTableFormatter && formatExists(formatter)) {
            displayComp = textFormatter(formatter, value);
        }
        return displayMode === 'DISPLAY_ONLY' ? (_jsx(StyledJaygasiExtensionsPizzaEmailWrapper, { children: displayComp })) : (_jsx(StyledJaygasiExtensionsPizzaEmailWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        return (_jsx(StyledJaygasiExtensionsPizzaEmailWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [
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
    return (_jsx(StyledJaygasiExtensionsPizzaEmailWrapper, { children: _jsx(Input, { ...additionalProps, type: 'email', label: label, labelHidden: hideLabel, info: validatemessage || helperText, value: inputValue, status: status, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, "data-testid": testId, onChange: (event) => {
                if (hasSuggestions) {
                    setStatus(undefined);
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
export default withConfiguration(JaygasiExtensionsPizzaEmail);
