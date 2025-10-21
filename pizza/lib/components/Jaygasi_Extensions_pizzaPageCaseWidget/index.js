import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-nested-ternary */
import { Fragment } from 'react';
import { DateTimeDisplay, Card, CardHeader, CardContent, Flex, withConfiguration } from '@pega/cosmos-react-core';
// includes in bundle
import Operator from './Operator';
import StyledJaygasiExtensionsPizzaPageCaseWidgetWrapper from './styles';
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaPageCaseWidget(props) {
    const { getPConnect, title = 'Create operator', label = 'Create operator', createLabel, updateLabel, createOperator, updateOperator, createDateTime, updateDateTime, resolveLabel, resolveOperator, resolveDateTime, hideLabel } = props;
    const [_label, user, dateTimeValue] = label === 'Create operator'
        ? [createLabel, createOperator, createDateTime]
        : label === 'Update operator'
            ? [updateLabel, updateOperator, updateDateTime]
            : [resolveLabel, resolveOperator, resolveDateTime];
    return user.userId && user.userName ? (_jsx(StyledJaygasiExtensionsPizzaPageCaseWidgetWrapper, { children: _jsxs(Card, { children: [_jsx(CardHeader, { children: title }), _jsx(CardContent, { children: _jsxs(Flex, { container: { direction: 'row' }, children: [_jsx(Operator, { label: hideLabel ? '' : _label, name: user.userName, id: user.userId, getPConnect: getPConnect, value: undefined, validatemessage: '', hideLabel: false, readOnly: false, required: false, disabled: false, externalUser: undefined, metaObj: undefined, testId: '', helperText: '' }), dateTimeValue && (_jsxs(Fragment, { children: [' ', _jsx(DateTimeDisplay, { value: dateTimeValue, variant: 'relative' })] }))] }) })] }) })) : (_jsx(StyledJaygasiExtensionsPizzaPageCaseWidgetWrapper, { children: "defVal" }));
}
export default withConfiguration(JaygasiExtensionsPizzaPageCaseWidget);
