import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox as CosmosCheckbox, CheckboxGroup, FieldValueList, Text, withConfiguration, BooleanDisplay } from "@pega/cosmos-react-core";
import './create-nonce';
// includes in bundle
import handleEvent from "./event-utils";
import StyledJaygasiExtensionsPizzaBooleanWrapper from './styles';
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaBoolean(props) {
    const { getPConnect, value = false, label = '', helperText = '', caption, validatemessage, hideLabel, testId, additionalProps = {}, displayMode, variant = 'inline', trueLabel, falseLabel } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const actionsProps = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    let { readOnly = false, required = false, disabled = false } = props;
    [readOnly, required, disabled] = [readOnly, required, disabled].map((prop) => prop === true || (typeof prop === 'string' && prop === 'true'));
    let status;
    if (validatemessage !== "") {
        status = "error";
    }
    const aCosmosCheckbox = (_jsx(CosmosCheckbox, { ...additionalProps, className: "standard", checked: value, label: caption, disabled: disabled, readOnly: readOnly, required: required, onClick: actionsProps.onClick, onChange: (event) => {
            handleEvent(actions, "changeNblur", propName, event.target.checked);
        }, onBlur: (event) => {
            pConn.getValidationApi().validate(event.target.checked);
        }, "data-testid": testId }));
    const parentTestId = testId === '' ? `${testId}-parent` : testId;
    let displayComponent;
    if (displayMode) {
        displayComponent = (_jsx(BooleanDisplay, { value: value, trueLabel: trueLabel, falseLabel: falseLabel }));
    }
    if (displayMode === 'DISPLAY_ONLY') {
        return (_jsx(StyledJaygasiExtensionsPizzaBooleanWrapper, { children: displayComponent }));
    }
    if (displayMode === "LABELS_LEFT") {
        return (_jsx(StyledJaygasiExtensionsPizzaBooleanWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : caption, value: displayComponent }] }) }));
    }
    if (displayMode === "STACKED_LARGE_VAL") {
        return (_jsx(StyledJaygasiExtensionsPizzaBooleanWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [
                    {
                        id: '2',
                        name: hideLabel ? '' : caption,
                        value: (_jsx(Text, { variant: 'h1', as: 'span', children: displayComponent }))
                    }
                ] }) }));
    }
    return (_jsx(StyledJaygasiExtensionsPizzaBooleanWrapper, { children: _jsx(CheckboxGroup, { label: label, labelHidden: hideLabel, "data-testid": parentTestId, info: validatemessage || helperText, status: status, children: aCosmosCheckbox }) }));
}
;
export default withConfiguration(JaygasiExtensionsPizzaBoolean);
//# sourceMappingURL=index.js.map