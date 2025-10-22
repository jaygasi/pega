import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Input, FieldValueList, Text, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsTextWithEmojiWrapper from './styles';
// Helper function to find matching emoji for a given value
const getEmojiForValue = (value, emojiConfig) => {
    if (!emojiConfig || !value) {
        return null;
    }
    try {
        const config = JSON.parse(emojiConfig);
        const matchingStatus = config.status_emojis?.find((item) => item.status.toLowerCase() === value.toLowerCase());
        return matchingStatus ? matchingStatus.emoji : null;
    }
    catch (error) {
        console.warn('Invalid emoji configuration JSON:', error);
        return null;
    }
};
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsTextWithEmoji(props) {
    const { getPConnect, value, placeholder, disabled = false, displayMode, readOnly = false, required = false, label, hideLabel = false, testId, variant = 'inline', emojiConfig, helperText, validatemessage, additionalProps } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    // State management for enhanced input handling
    const [inputValue, setInputValue] = useState(value || '');
    const [hasInteracted, setHasInteracted] = useState(false);
    // Sync internal state with external value changes
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);
    // Get the emoji for current value
    const emoji = getEmojiForValue(value, emojiConfig);
    const handleOnChange = (event) => {
        const { value: updatedValue } = event.target;
        setInputValue(updatedValue);
        setHasInteracted(true);
        actions.updateFieldValue(propName, updatedValue);
    };
    const handleBlur = () => {
        if (hasInteracted) {
            actions.triggerFieldChange(propName, inputValue);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            actions.triggerFieldChange(propName, inputValue);
        }
    };
    // Render the display component with emoji
    const renderDisplayWithEmoji = (displayValue) => {
        return (_jsxs("div", { className: "display-with-emoji", children: [_jsx("span", { children: displayValue }), emoji && _jsx("span", { className: "status-emoji", children: emoji })] }));
    };
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        let displayComp = value || _jsx("span", { "aria-hidden": 'true', children: "\u2013\u2013" });
        displayComp = renderDisplayWithEmoji(displayComp);
        return displayMode === 'DISPLAY_ONLY' ? (_jsx(StyledJaygasiExtensionsTextWithEmojiWrapper, { "data-display-mode": "DISPLAY_ONLY", children: displayComp })) : (_jsx(StyledJaygasiExtensionsTextWithEmojiWrapper, { "data-display-mode": "LABELS_LEFT", children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        const isValDefined = typeof value !== 'undefined' && value !== '';
        const val = isValDefined ? (renderDisplayWithEmoji(_jsx(Text, { variant: 'h1', as: 'span', children: value }))) : ('');
        return (_jsx(StyledJaygasiExtensionsTextWithEmojiWrapper, { "data-display-mode": "STACKED_LARGE_VAL", children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [{ id: '2', name: hideLabel ? '' : label, value: val }] }) }));
    }
    // For editable mode, render input with emoji - Match TextInputSearch structure
    return (_jsxs(StyledJaygasiExtensionsTextWithEmojiWrapper, { "data-display-mode": "EDIT", children: [_jsx(Input, { type: 'text', value: inputValue, label: label, labelHidden: hideLabel, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, onChange: handleOnChange, onBlur: handleBlur, onKeyDown: handleKeyDown, testId: testId, className: "input-with-emoji", validatemessage: validatemessage, helperText: helperText, ...additionalProps }), emoji && _jsx("span", { className: "status-emoji", children: emoji })] }));
}
;
export default withConfiguration(JaygasiExtensionsTextWithEmoji);
