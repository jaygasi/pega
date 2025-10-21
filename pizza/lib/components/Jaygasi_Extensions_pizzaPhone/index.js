import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { PhoneInput as CosmosPhone, getPhoneNumberParts, PhoneDisplay, FieldValueList, Text, EmailDisplay, URLDisplay, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
// includes in bundle
import handleEvent from "./event-utils";
import { suggestionsHandler } from './suggestions-handler';
import StyledJaygasiExtensionsPizzaPhoneWrapper from './styles';
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
function JaygasiExtensionsPizzaPhone(props) {
    const { getPConnect, value, showCountryCode = true, placeholder, validatemessage, label, hideLabel = false, helperText, datasource = [], testId, displayMode, additionalProps = {}, variant = 'inline', isTableFormatter = false, hasSuggestions = false } = props;
    const { formatter } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const hasValueChange = useRef(false);
    let callingCodesList = [];
    if (datasource?.source?.length > 0) {
        datasource.source.forEach((element) => {
            callingCodesList.push(element.value);
        });
    }
    else {
        callingCodesList = ['+1']; // if no datasource is present we default to show only US country code
    }
    // BUG-547602: Temporary type coercion for 8.5 until DXAPIs are enhanced to pass original pxViewMetadata JSON, respecting boolean primitives
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
    // function to exclude country code from phone number
    function getPhoneNumberAlone(phoneNumber) {
        const phoneNumberParts = getPhoneNumberParts(phoneNumber, callingCodesList);
        return phoneNumberParts && phoneNumberParts[1];
    }
    function handleChangeBlur(enteredValue, eventType) {
        if (!getPhoneNumberAlone(enteredValue)) {
            enteredValue = '';
        }
        handleEvent(actions, eventType, propName, enteredValue);
    }
    let displayComp = null;
    if (displayMode) {
        displayComp = _jsx(PhoneDisplay, { value: value, variant: 'link' });
    }
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        if (isTableFormatter && formatExists(formatter)) {
            displayComp = textFormatter(formatter, value);
        }
        return displayMode === 'DISPLAY_ONLY' ? (_jsx(StyledJaygasiExtensionsPizzaPhoneWrapper, { children: displayComp })) : (_jsx(StyledJaygasiExtensionsPizzaPhoneWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        return (_jsx(StyledJaygasiExtensionsPizzaPhoneWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [
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
    return (_jsx(StyledJaygasiExtensionsPizzaPhoneWrapper, { children: _jsx(CosmosPhone, { ...additionalProps, label: label, info: validatemessage || helperText, value: inputValue, labelHidden: hideLabel, status: status, showCountryCode: showCountryCode, callingCodesList: callingCodesList, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, "data-testid": testId, onChange: (enteredValue) => {
                if (hasSuggestions) {
                    setStatus('');
                }
                setInputValue(enteredValue);
                if (value !== enteredValue) {
                    handleEvent(actions, 'change', propName, enteredValue);
                }
                hasValueChange.current = true;
            }, onBlur: (enteredValue) => {
                if (!value || hasValueChange.current) {
                    handleChangeBlur(enteredValue, 'blur');
                    if (hasSuggestions) {
                        pConn.ignoreSuggestion('');
                    }
                    hasValueChange.current = false;
                }
            }, onResolveSuggestion: onResolveSuggestionHandler }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaPhone);
