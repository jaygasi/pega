import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { Input, FieldValueList, Text, EmailDisplay, PhoneDisplay, URLDisplay, withConfiguration, Button } from '@pega/cosmos-react-core';
import './create-nonce';
// include in bundle
import handleEvent from "./event-utils";
import StatusWorkRenderer from "./StatusWork";
import { suggestionsHandler } from './suggestions-handler';
import StyledJaygasiExtensionsTextInputSearchWrapper from './styles';
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
const renderStatus = (label, testId, value) => {
    const statusValue = StatusWorkRenderer({ value });
    return _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [{ id: 'status', name: label, value: statusValue }] });
};
const renderLabelsLeft = ({ displayMode, hideLabel, variant, testId, label, value, isTableFormatter, formatter }) => {
    let displayComp = value;
    if (isTableFormatter && formatExists(formatter)) {
        displayComp = textFormatter(formatter, value);
    }
    if (displayMode === 'DISPLAY_ONLY') {
        return _jsxs(StyledJaygasiExtensionsTextInputSearchWrapper, { children: [" ", displayComp, " "] });
    }
    return (_jsx(StyledJaygasiExtensionsTextInputSearchWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
};
const renderStackedLargeVal = (value, testId, hideLabel, label) => {
    return (_jsx(StyledJaygasiExtensionsTextInputSearchWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [{ id: '2', name: hideLabel ? '' : label, value: (_jsx(Text, { variant: 'h1', as: 'span', children: value })) }] }) }));
};
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsTextInputSearch(props) {
    const { getPConnect, placeholder, validatemessage, label, hideLabel = false, helperText, testId, additionalProps = {}, displayMode, displayAsStatus, variant = 'inline', hasSuggestions = false, isTableFormatter = false } = props;
    const { formatter } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const hasValueChange = useRef(false);
    const { value } = props;
    const [readOnly, required, disabled] = [props.readOnly ?? false, props.required ?? false, props.disabled ?? false].map((prop) => prop === true || (typeof prop === 'string' && prop === 'true'));
    const [inputValue, setInputValue] = useState(value);
    const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);
    // cast status
    let myStatus;
    // eslint-disable-next-line prefer-const
    myStatus = status;
    useEffect(() => setInputValue(value), [value]);
    useEffect(() => {
        if (validatemessage !== '') {
            setStatus('error');
        }
        else if (hasSuggestions) {
            setStatus('pending');
        }
        else if (!hasSuggestions && status !== 'success') {
            setStatus(undefined);
        }
    }, [validatemessage, hasSuggestions, status]);
    const onResolveSuggestionHandler = (accepted) => {
        suggestionsHandler(accepted, pConn, setStatus);
    };
    // Override the value to render as status work when prop passed to display as status
    if (displayAsStatus) {
        return renderStatus(label, testId, value);
    }
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        return renderLabelsLeft({ displayMode, hideLabel, variant, testId, label, value, isTableFormatter, formatter });
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        return renderStackedLargeVal(value, testId, hideLabel, label);
    }
    const handleChange = (event) => {
        if (hasSuggestions) {
            setStatus(undefined);
        }
        setInputValue(event.target.value);
        if (value !== event.target.value) {
            handleEvent(actions, 'change', propName, event.target.value);
            hasValueChange.current = true;
        }
    };
    const handleBlur = (event) => {
        if (!value || hasValueChange.current) {
            handleEvent(actions, 'blur', propName, event.target.value);
            if (hasSuggestions) {
                pConn.ignoreSuggestion('');
            }
            hasValueChange.current = false;
        }
    };
    const handleSearchIconClick = () => {
        console.log(`Searching for: ${inputValue}`);
        if (inputValue) {
            window.find(inputValue, false, false, true, false, true, false);
        }
    };
    return (_jsx(StyledJaygasiExtensionsTextInputSearchWrapper, { children: _jsx(Input, { ...additionalProps, type: 'text', label: pConn.getLocalizedValue(label), labelHidden: hideLabel, info: validatemessage || pConn.getLocalizedValue(helperText), "data-testid": testId, value: inputValue, status: myStatus, placeholder: pConn.getLocalizedValue(placeholder || ''), disabled: disabled, readOnly: readOnly, required: required, onChange: !readOnly ? handleChange : undefined, onBlur: !readOnly ? handleBlur : undefined, onResolveSuggestion: onResolveSuggestionHandler, actions: [
                _jsx("input", { type: "image", src: "dsmimages/pySelectServiceNode.svg", alt: "Search", onClick: (e) => { e.preventDefault(); handleSearchIconClick(); }, style: { cursor: 'pointer', width: '24px', height: '24px' } }, "search-icon")
            ] }) }));
}
JaygasiExtensionsTextInputSearch.defaultProps = {
    displayAsStatus: false,
    isTableFormatter: false,
    hasSuggestions: false,
    variant: 'inline',
    formatter: 'TextInput'
};
export default withConfiguration(JaygasiExtensionsTextInputSearch);
//# sourceMappingURL=index.js.map