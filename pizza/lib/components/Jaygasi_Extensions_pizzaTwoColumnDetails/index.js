import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, Children } from 'react';
import { Grid, Flex, FieldGroup, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
import DetailsRender from './DetailsRender';
import HighlightRender from './HighlightRender';
import StyledJaygasiExtensionsPizzaTwoColumnDetailsWrapper, { StyledDetailsGridContainer, StyledHighlightedFieldsHrLine } from './styles';
// includes in bundle
import { getAllFields } from './utils';
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaTwoColumnDetails(props) {
    const { getPConnect, label, children, showLabel = true, showHighlightedData = false } = props;
    const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };
    // update children with readonly
    Children.toArray(children).forEach((child) => {
        child.props.getPConnect().setInheritedProp('readOnly', true);
        child.props.getPConnect().setInheritedProp('displayMode', 'DISPLAY_ONLY');
    });
    const numRegions = getAllFields(getPConnect)?.length;
    const gridRepeat = "repeat(".concat(String(numRegions)).concat(", 1fr)");
    const gridContainer = { colGap: 6 };
    gridContainer.cols = gridRepeat;
    gridContainer.alignItems = 'start';
    // Set up highlighted data to pass in return if is set to show, need raw metadata to pass to createComponent
    let highlightedDataArr = [];
    if (showHighlightedData) {
        // @ts-ignore
        const { highlightedData = [] } = getPConnect().getRawMetadata().config;
        highlightedDataArr = highlightedData.map((field) => {
            return _jsx(HighlightRender, { field: field, getPConnect: props.getPConnect });
        });
    }
    return (_jsx(StyledJaygasiExtensionsPizzaTwoColumnDetailsWrapper, { children: _jsxs(FieldGroup, { name: propsToUse.showLabel ? propsToUse.label : '', children: [showHighlightedData && highlightedDataArr.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Flex, { container: { direction: 'row', alignItems: 'start', colGap: 10 }, "data-testid": `highlighted-column-count-${numRegions}`, children: highlightedDataArr.map((child, i) => (_jsx(Fragment, { children: child }, `hf-${i + 1}`))) }), _jsx(StyledHighlightedFieldsHrLine, {})] })), _jsx(Grid, { as: StyledDetailsGridContainer, container: gridContainer, "data-testid": `column-count-${numRegions}`, children: children.map((child, i) => (_jsx(Flex
                    // @ts-ignore
                    , { 
                        // @ts-ignore
                        container: { direction: 'column', alignItems: 'normal', colGap: 1, rowGap: 1.5 }, children: _jsx(DetailsRender, { child: child }) }, `r-${i + 1}`))) })] }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaTwoColumnDetails);
