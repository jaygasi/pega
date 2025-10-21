import { jsx as _jsx } from "react/jsx-runtime";
import { FieldValueList } from '@pega/cosmos-react-core';
import { format } from './date';
export default function FormattedText(props) {
    const { formatType = 'none', label, value, testId, hideLabel, variant = 'stacked', additionalProps = {} } = props;
    let text = value;
    text = format(text, formatType, additionalProps);
    const fields = [
        {
            id: label.toLowerCase(),
            name: hideLabel ? '' : label,
            value: text
        }
    ];
    return _jsx(FieldValueList, { variant: variant, fields: fields, "data-testid": testId });
}
