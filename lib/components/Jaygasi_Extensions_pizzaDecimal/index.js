import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { NumberInput, NumberDisplay, CurrencyDisplay, FieldValueList, Text, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
// includes in bundle
import StyledJaygasiExtensionsPizzaDecimalWrapper from './styles';
import handleEvent from "./event-utils";
import { suggestionsHandler } from './suggestions-handler';
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaDecimal(props) {
    const { getPConnect, value, placeholder, validatemessage, label, hideLabel = false, helperText, testId, displayMode, additionalProps = {}, variant = 'inline', formatter = 'defaultDecimal', negative = 'minus-sign', notation = 'standard', currencyISOCode = 'USD', isTableFormatter, hasSuggestions } = props;
    let { showGroupSeparators = false } = props;
    let { currencyDisplay = 'symbol' } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const [decimalValue, setDecimalValue] = useState(value?.toString());
    const hasValueChange = useRef(false);
    let { readOnly = false, required = false, disabled = false } = props;
    [readOnly, required, disabled] = [readOnly, required, disabled].map((prop) => prop === true || (typeof prop === 'string' && prop === 'true'));
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
    const { decimalPrecision, currencyDecimalPrecision } = props;
    let numberOfDecimals = parseInt(decimalPrecision, 10);
    if (Number.isNaN(numberOfDecimals)) {
        numberOfDecimals = decimalPrecision === '' ? undefined : 2;
    }
    let noOfFractionDigits = currencyDecimalPrecision === 'auto' ? undefined : parseInt(currencyDecimalPrecision, 10);
    useEffect(() => {
        setDecimalValue(value?.toString());
    }, [value]);
    let unit;
    if (['DISPLAY_ONLY', 'LABELS_LEFT', 'STACKED_LARGE_VAL'].includes(displayMode)) {
        if (displayMode !== 'STACKED_LARGE_VAL' && isTableFormatter) {
            showGroupSeparators = true;
            noOfFractionDigits = undefined;
            if (formatter === 'Currency-Code') {
                currencyDisplay = 'code';
            }
        }
        switch (formatter) {
            case 'Integer': {
                numberOfDecimals = 0;
                break;
            }
            case 'Percentage': {
                showGroupSeparators = false;
                unit = 'percent';
                break;
            }
            case 'Decimal-Auto': {
                numberOfDecimals = Number.isInteger(decimalValue) ? 0 : 2;
                break;
            }
            default: {
                break;
            }
        }
        const displayComp = formatter === 'Currency' || formatter === 'Currency-Code' ? (_jsx(CurrencyDisplay, { value: decimalValue, currencyISOCode: currencyISOCode, formattingOptions: {
                groupSeparators: showGroupSeparators,
                fractionDigits: noOfFractionDigits,
                currency: currencyDisplay,
                negative,
                notation: negative === 'parentheses' ? 'standard' : notation
            } })) : (_jsx(NumberDisplay, { value: decimalValue, formattingOptions: {
                fractionDigits: numberOfDecimals,
                groupSeparators: showGroupSeparators,
                notation
            }, unit: unit }));
        switch (displayMode) {
            case 'DISPLAY_ONLY': {
                return (_jsxs(StyledJaygasiExtensionsPizzaDecimalWrapper, { children: [" ", displayComp, " "] }));
            }
            case 'LABELS_LEFT': {
                return (_jsx(StyledJaygasiExtensionsPizzaDecimalWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayComp }] }) }));
            }
            case 'STACKED_LARGE_VAL': {
                return (_jsx(StyledJaygasiExtensionsPizzaDecimalWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [
                            {
                                id: '2',
                                name: hideLabel ? '' : label,
                                value: (_jsx(Text, { variant: 'h1', as: 'span', children: displayComp }))
                            }
                        ] }) }));
            }
            // no default
        }
    }
    const onResolveSuggestionHandler = (accepted) => {
        suggestionsHandler(accepted, pConn, setStatus);
    };
    return (_jsx(StyledJaygasiExtensionsPizzaDecimalWrapper, { children: _jsx(NumberInput, { ...additionalProps, label: label, labelHidden: hideLabel, info: validatemessage || helperText, value: decimalValue, status: status, placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required, numberOfDecimals: numberOfDecimals, showGroupSeparators: showGroupSeparators, "data-testid": testId, onChange: (enteredValue) => {
                if (hasSuggestions) {
                    setStatus(undefined);
                }
                setDecimalValue(enteredValue);
                if (value !== (enteredValue !== '' ? Number(enteredValue) : '')) {
                    handleEvent(actions, 'change', propName, enteredValue !== '' ? Number(enteredValue) : '');
                    hasValueChange.current = true;
                }
            }, onBlur: () => {
                if (!value || hasValueChange.current) {
                    handleEvent(actions, 'blur', propName, decimalValue !== '' ? Number(decimalValue) : '');
                    if (hasSuggestions) {
                        pConn.ignoreSuggestion("");
                    }
                    hasValueChange.current = false;
                }
            }, onResolveSuggestion: onResolveSuggestionHandler }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaDecimal);
//# sourceMappingURL=index.js.map