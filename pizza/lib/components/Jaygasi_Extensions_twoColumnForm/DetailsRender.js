import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from 'react';
import { FieldValueList } from '@pega/cosmos-react-core';
const DetailsRender = (props) => {
    const { child } = props;
    const kids = child.props.getPConnect().getChildren();
    const displayCompArr = [];
    Object.values(kids).forEach((value) => {
        const { type } = value.getPConnect().getRawMetadata();
        const { hideLabel, variant, testId, label } = value
            .getPConnect()
            .resolveConfigProps(value.getPConnect().getConfigProps());
        let displayComp;
        const key = JSON.stringify(value.getPConnect());
        if (type === 'reference') {
            const refElement = value.getPConnect().getComponent();
            displayCompArr.push(refElement);
        }
        else {
            const element = value.getPConnect().getComponent();
            const displayEl = _jsx(Fragment, { children: element }, key);
            const fvlStyle = {
                myColGap: {
                    columnGap: '0',
                    marginLineStart: 0
                }
            };
            // const myEl = <div>boo</div>;
            displayComp = (_jsx(Fragment, { children: _jsx(FieldValueList, { style: fvlStyle.myColGap, variant: hideLabel ? 'stacked' : variant, "data-testid": testId, fields: [{ id: '1', name: hideLabel ? '' : label, value: displayEl }] }) }, key));
            displayCompArr.push(displayComp);
        }
    });
    return _jsx(_Fragment, { children: displayCompArr });
};
export default DetailsRender;
