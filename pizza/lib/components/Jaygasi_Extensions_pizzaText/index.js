import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, FieldValueList, Text, EmailDisplay, PhoneDisplay, URLDisplay, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsPizzaTextWrapper from './styles';
export const formatExists = (formatterVal) => {
    const formatterValues = [
        'TextInput',
        'WorkStatus',
        'RichText',
        'Email',
        'Phone',
        'URL',
        'Operator'
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
        case 'TextInput': {
            displayComponent = value;
            break;
        }
        case 'Email': {
            displayComponent = _jsx(EmailDisplay, { value: value, displayText: value, variant: 'link' });
            break;
        }
        case 'Phone': {
            displayComponent = _jsx(PhoneDisplay, { value: value, variant: 'link' });
            break;
        }
        case 'URL': {
            displayComponent = (_jsx(URLDisplay, { target: '_blank', value: value, displayText: value, variant: 'link' }));
            break;
        }
        // no default
    }
    return displayComponent;
};
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaText(props) {
    const { getPConnect, value, placeholder, disabled = false, displayMode, readOnly = false, required = false, label, hideLabel = false, testId, isTableFormatter = false, variant = 'inline' } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const { formatter } = props;
    const handleOnChange = (event) => {
        const { value: updatedValue } = event.target;
        actions.updateFieldValue(propName, updatedValue);
    };
    if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
        let displayComp = value || _jsx("span", { "aria-hidden": 'true', children: "\u2013\u2013" });
        if (isTableFormatter && formatExists(formatter)) {
            displayComp = textFormatter(formatter, value);
        }
        return displayMode === 'DISPLAY_ONLY' ? (_jsxs(StyledJaygasiExtensionsPizzaTextWrapper, { children: [" ", displayComp, " "] })) : (_jsx(StyledJaygasiExtensionsPizzaTextWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
    }
    if (displayMode === 'STACKED_LARGE_VAL') {
        const isValDefined = typeof value !== 'undefined' && value !== '';
        const val = isValDefined ? (_jsx(Text, { variant: 'h1', as: 'span', children: value })) : ('');
        return (_jsx(StyledJaygasiExtensionsPizzaTextWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [{ id: '2', name: hideLabel ? '' : label, value: val }] }) }));
    }
    return (_jsx(StyledJaygasiExtensionsPizzaTextWrapper, { children: _jsx(Input, { type: 'text', value: value, label: label, labelHidden: hideLabel, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, onChange: handleOnChange, testId: testId }) }));
}
;
export default withConfiguration(JaygasiExtensionsPizzaText);
