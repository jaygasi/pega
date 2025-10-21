import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { DateInput, FieldValueList, DateTimeDisplay, Text, withConfiguration } from '@pega/cosmos-react-core';
import FormattedText from "./FormattedText";
import './create-nonce';
import StyledJaygasiExtensionsPizzaDateWrapper from './styles';
// includes in bundle
import { datetimedisplayformatter, formatExists, getFullYear, getMaxDate, getMinDate, datetimeFireChangeBlurEvents, getDateFormat } from "./date";
import { suggestionsHandler } from './suggestions-handler';
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaDate(props) {
    const { getPConnect, value, validatemessage, label, hideLabel = false, helperText = '', nextYearRange, previousYearRange, showWeekNumber = false, testId, showAsFormattedText = false, additionalProps = {}, displayMode, variant = 'inline', hasSuggestions = false } = props;
    let { formatter = 'defaultDate' } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const actionsProps = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    let { readOnly = false, required = false, disabled = false } = props;
    [readOnly, required, disabled] = [readOnly, required, disabled].map((prop) => prop === true || (typeof prop === "string" && prop === "true"));
    const [status, setStatus] = useState(hasSuggestions ? 'pending' : '');
    // cast status
    let myStatus;
    // eslint-disable-next-line prefer-const
    myStatus = status;
    useEffect(() => {
        if (validatemessage !== '') {
            setStatus('error');
        }
        if (hasSuggestions) {
            setStatus('pending');
        }
        else if (!hasSuggestions && myStatus !== 'success') {
            // @ts-ignore
            setStatus(validatemessage !== '' ? 'error' : undefined);
        }
    }, [validatemessage, hasSuggestions, myStatus]);
    // calculate min and max range of calendar
    const currentYear = getFullYear(null);
    const yearFromValue = getFullYear(value);
    const maxDate = getMaxDate(parseInt(nextYearRange, 10), currentYear, yearFromValue);
    const minDate = getMinDate(parseInt(previousYearRange, 10), currentYear, yearFromValue);
    const onResolveSuggestionHandler = (accepted) => {
        suggestionsHandler(accepted, pConn, setStatus);
    };
    function handleBlur(onBlurValue) {
        const { valueAsISOString: date, state: errorState } = onBlurValue;
        const trimmedDate = date ? date.substring(0, date.indexOf('T')) : date;
        datetimeFireChangeBlurEvents(errorState, value, trimmedDate, actions, propName, pConn);
        const isValueChanged = !(value === undefined && trimmedDate === '') && value !== trimmedDate;
        if (hasSuggestions && isValueChanged) {
            pConn.ignoreSuggestion("");
        }
    }
    function handleChange(onChangeValue) {
        const { valueAsISOString: date } = onChangeValue;
        const trimmedDate = date ? date.substring(0, date.indexOf('T')) : date;
        if (hasSuggestions && value !== trimmedDate) {
            setStatus("");
        }
        pConn.clearErrorMessages({
            category: "",
            property: propName,
            context: ""
        });
    }
    if (displayMode === 'LABELS_LEFT' || displayMode === 'STACKED_LARGE_VAL' || displayMode === 'DISPLAY_ONLY') {
        let variantValue = "date";
        let formatValue = "long";
        if (pConn && pConn.getConfigProps()) {
            const configProps = pConn.getConfigProps();
            const runtimeformatter = configProps?.formatter;
            if (formatter !== runtimeformatter) {
                formatter = runtimeformatter;
            }
        }
        if (formatter !== "" && formatExists(formatter)) {
            // @ts-ignore
            const { variantVal, formatVal } = datetimedisplayformatter(formatter);
            variantValue = variantVal;
            formatValue = formatVal;
        }
        const displayComp = (_jsx(DateTimeDisplay, { variant: variantValue, format: formatValue, value: value }));
        switch (displayMode) {
            case 'DISPLAY_ONLY': {
                return (_jsxs(StyledJaygasiExtensionsPizzaDateWrapper, { children: [" ", displayComp, " "] }));
            }
            case "LABELS_LEFT": {
                return (_jsx(StyledJaygasiExtensionsPizzaDateWrapper, { children: _jsx(FieldValueList, { variant: hideLabel ? "stacked" : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? "" : label, value: displayComp }] }) }));
            }
            case "STACKED_LARGE_VAL": {
                return (_jsx(StyledJaygasiExtensionsPizzaDateWrapper, { children: _jsx(FieldValueList, { variant: 'stacked', "data-testid": testId, fields: [{ id: '2', name: hideLabel ? "" : label, value: _jsx(Text, { variant: 'h1', as: 'span', children: displayComp }) }] }) }));
            }
            // no default
        }
    }
    let dateComponent;
    if (readOnly && showAsFormattedText) {
        const environmentInfo = PCore.getEnvironmentInfo();
        const locale = environmentInfo && environmentInfo.getLocale();
        const textAdditionalProps = {
            format: getDateFormat(locale, {}),
            fieldType: 'Date'
        };
        dateComponent = (_jsx(StyledJaygasiExtensionsPizzaDateWrapper, { children: _jsx(FormattedText, { formatType: 'date', value: value, label: label, hideLabel: hideLabel, testId: testId, additionalProps: textAdditionalProps, customFormat: getDateFormat(locale, null) }) }));
    }
    else {
        dateComponent = (_jsx(StyledJaygasiExtensionsPizzaDateWrapper, { children: _jsx(DateInput, { ...additionalProps, label: label, labelHidden: hideLabel, info: validatemessage || helperText, status: status, value: value || undefined, disabled: disabled, readOnly: readOnly, required: required, showWeekNumber: showWeekNumber, min: minDate, max: maxDate, "data-testid": testId, onFocus: actionsProps.onFocus, onChange: handleChange, onBlur: handleBlur, onResolveSuggestion: onResolveSuggestionHandler }) }));
    }
    return dateComponent;
}
export default withConfiguration(JaygasiExtensionsPizzaDate);
