import { jsx as _jsx } from "react/jsx-runtime";
import { FieldValueList, Text } from '@pega/cosmos-react-core';
const HighlightRender = (props) => {
    const { getPConnect, field } = props;
    field.config['displayMode'] = 'DISPLAY_ONLY';
    // Mark as status display when using pyStatusWork
    if (field.config?.value === '@P .pyStatusWork') {
        field.type = 'TextInput';
        field.config.displayAsStatus = true;
    }
    const configProps = getPConnect().resolveConfigProps(field.config);
    // @ts-ignore
    const reactField = getPConnect().createComponent(field);
    return (_jsx(FieldValueList, { style: { width: 'auto' }, variant: 'stacked', "data-testid": field.testId, fields: [
            {
                id: '2',
                name: configProps.hideLabel ? '' : configProps.label,
                value: (_jsx(Text, { variant: 'h1', as: 'span', children: reactField }))
            }
        ] }));
};
export default HighlightRender;
