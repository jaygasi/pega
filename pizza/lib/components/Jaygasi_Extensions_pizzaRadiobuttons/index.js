import { createElement as _createElement } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import { RadioButton, RadioButtonGroup, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
// includes in bundle
import { formatExists, textFormatter } from './textformat-utils';
import handleEvent from './event-utils';
import StyledJaygasiExtensionsPizzaRadiobuttonsWrapper from './styles';
const getFullReference = (pConn, configProperty) => {
    const pageReference = pConn.getPageReference();
    return pageReference ? `${pageReference}.${configProperty}` : configProperty;
};
const getDisplayValue = (dataSource, value, isDatapage) => {
    if (value !== 0 && (!value || (typeof value === 'string' && !value.trim().length))) {
        return _jsx("span", { "aria-hidden": 'true', children: "\u2013\u2013" });
    }
    const matchedEntry = dataSource &&
        dataSource.filter((entry) => {
            return entry.key === value;
        })[0];
    return matchedEntry ? (isDatapage ? matchedEntry.text : matchedEntry.value) : value;
};
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaRadiobuttons(props) {
    const { getPConnect, value, label, hideLabel = false, helperText, datasource = [], listType, validatemessage, testId, additionalProps = {}, displayMode, inline = false, placeholder, fieldMetadata = {}, isTableFormatter = false } = props;
    const pConn = getPConnect();
    const { formatter } = props;
    const actions = pConn.getActionsApi();
    const stateProps = pConn.getStateProps();
    const propName = stateProps.value;
    const configProps = pConn.getConfigProps();
    const className = pConn.getCaseInfo().getClassName();
    const { getLocaleRuleNameFromKeys, getLocalizedValue } = pConn;
    // @ts-ignore
    let configProperty = pConn.getRawMetadata()?.config?.value || '';
    configProperty = configProperty.startsWith('@P') ? configProperty.substring(3) : configProperty;
    configProperty = configProperty.startsWith('.') ? configProperty.substring(1) : configProperty;
    const fullReference = getFullReference(pConn, configProperty);
    // BUG-547602: Temporary type coercion for 8.5 until DXAPIs are enhanced to pass original pxViewMetadata JSON, respecting boolean primitives
    let { readOnly = false, required = false, disabled = false } = props;
    [readOnly, required, disabled] = [readOnly, required, disabled].map((prop) => prop === true || (typeof prop === 'string' && prop === 'true'));
    let status = '';
    if (validatemessage !== '') {
        status = 'error';
    }
    const metaData = Array.isArray(fieldMetadata)
        ? fieldMetadata.filter((field) => field?.classID === className)[0]
        : fieldMetadata;
    let displayName = metaData?.datasource?.propertyForDisplayText;
    displayName = displayName?.slice(displayName.lastIndexOf('.') + 1);
    const localeContext = metaData?.datasource?.tableType === 'DataPage' ? 'datapage' : 'associated';
    const localeClass = localeContext === 'datapage' ? '@baseclass' : className;
    const localeName = localeContext === 'datapage' ? metaData?.datasource?.name : configProperty;
    const localePath = localeContext === 'datapage' ? displayName : localeName;
    const items = [];
    const isDatapage = listType === 'datapage';
    const listSource = isDatapage ? configProps.listOutput : datasource;
    let autoFocusProp = additionalProps?.autoFocus
        ? {
            autoFocus: true
        }
        : {};
    if (placeholder) {
        items.push(_createElement(RadioButton, { ...autoFocusProp, defaultChecked: value === '', id: `${fullReference}.EMPTY`, value: '', key: `${fullReference}.EMPTY`, label: placeholder, name: fullReference }));
    }
    (listSource || []).forEach((item) => {
        if (additionalProps?.autoFocus && value === item.key) {
            autoFocusProp = {
                autoFocus: true
            };
        }
        items.push(_createElement(RadioButton, { ...autoFocusProp, checked: `${value}` === `${item.key}`, id: `${fullReference}.${item.key}`, value: item.key, key: `${fullReference}.${item.key}`, label: getLocalizedValue(isDatapage ? item.text : item.value, localePath, getLocaleRuleNameFromKeys(localeClass, localeContext, localeName)), name: fullReference }));
        autoFocusProp = {};
    });
    const displayComponent = useMemo(() => {
        const displayValue = getDisplayValue(listSource, value, isDatapage);
        return isTableFormatter && formatExists(formatter) ? textFormatter(formatter, displayValue) : displayValue;
    }, [listSource, value, isDatapage, isTableFormatter, formatter]);
    if (displayMode === 'DISPLAY_ONLY') {
        return displayComponent;
    }
    return (_jsx(StyledJaygasiExtensionsPizzaRadiobuttonsWrapper, { children: _jsx(RadioButtonGroup, { ...additionalProps, label: label, labelHidden: hideLabel, info: validatemessage || helperText, inline: inline, status: status, "data-testid": testId, value: value, required: required, readOnly: readOnly, onChange: (event) => {
                handleEvent(actions, 'changeNblur', propName, event.target.value);
            }, onBlur: (event) => {
                pConn.getValidationApi().validate(event.target.value);
            }, disabled: disabled, className: 'standard', name: fullReference, children: items }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaRadiobuttons);
//# sourceMappingURL=index.js.map