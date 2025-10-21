import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, FieldValueList, Text, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsPizzaTextWithEmojiWrapper from './styles';
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
function JaygasiExtensionsPizzaTextWithEmoji(props) {
    const { getPConnect, value, placeholder, disabled = false, displayMode, readOnly = false, required = false, label, hideLabel = false, testId, isTableFormatter = false, variant = 'inline', emojiConfig } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    // Get the emoji for current value
    const emoji = getEmojiForValue(value, emojiConfig);
    const handleOnChange = (event) => {
        const { value: updatedValue } = event.target;
        actions.updateFieldValue(propName, updatedValue);
    };
    // Render the display component with emoji
    const renderDisplayWithEmoji = (displayValue) => {
        return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("span", { children: displayValue }), emoji && _jsx("span", { style: { fontSize: '16px' }, children: emoji })] }));
    };
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        let displayComp = value || _jsx("span", { "aria-hidden": 'true', children: "\u2013\u2013" });
        displayComp = renderDisplayWithEmoji(displayComp);
        return displayMode === 'DISPLAY_ONLY' ? (_jsx(StyledJaygasiExtensionsPizzaTextWithEmojiWrapper, { children: displayComp })) : (_jsx(StyledJaygasiExtensionsPizzaTextWithEmojiWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        const isValDefined = typeof value !== 'undefined' && value !== '';
        const val = isValDefined ? (renderDisplayWithEmoji(_jsx(Text, { variant: 'h1', as: 'span', children: value }))) : ('');
        return (_jsx(StyledJaygasiExtensionsPizzaTextWithEmojiWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [{ id: '2', name: hideLabel ? '' : label, value: val }] }) }));
    }
    // For editable mode, render input with emoji
    return (_jsx(StyledJaygasiExtensionsPizzaTextWithEmojiWrapper, { children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx(Input, { type: 'text', value: value, label: label, labelHidden: hideLabel, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, onChange: handleOnChange, testId: testId, style: { flex: 1 } }), emoji && (_jsx("span", { style: {
                        fontSize: '20px',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center'
                    }, children: emoji }))] }) }));
}
;
export default withConfiguration(JaygasiExtensionsPizzaTextWithEmoji);
