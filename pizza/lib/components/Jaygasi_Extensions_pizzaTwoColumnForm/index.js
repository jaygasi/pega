import { jsx as _jsx } from "react/jsx-runtime";
import { Grid, Flex, FieldGroup, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
import DetailsRender from './DetailsRender';
import StyledJaygasiExtensionsPizzaTwoColumnFormWrapper from './styles';
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaTwoColumnForm(props) {
    const { children = [], label, showLabel, getPConnect, readOnly, displayMode } = props;
    const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };
    const numRegions = children?.length;
    const gridRepeat = "repeat(".concat(numRegions).concat(", 1fr)");
    const gridContainer = { "colGap": 6 };
    // @ts-ignore
    gridContainer.cols = gridRepeat;
    // @ts-ignore
    gridContainer.alignItems = 'start';
    const flexContainer = { direction: 'column' };
    // @ts-ignore
    flexContainer.gap = 2;
    if (readOnly && readOnly === true || displayMode && displayMode === 'DISPLAY_ONLY') {
        return (_jsx(StyledJaygasiExtensionsPizzaTwoColumnFormWrapper, { children: _jsx(FieldGroup, { name: propsToUse.showLabel ? propsToUse.label : '', children: _jsx(Grid, { container: gridContainer, "data-testid": `column-count-${numRegions}`, children: children.map((child, i) => (_jsx(Flex
                    // @ts-ignore
                    , { 
                        // @ts-ignore
                        container: { direction: 'column', alignItems: 'normal', colGap: 1, rowGap: 1.5 }, children: _jsx(DetailsRender, { child: child }) }, `r-${i + 1}`))) }) }) }));
    }
    return (_jsx(StyledJaygasiExtensionsPizzaTwoColumnFormWrapper, { children: _jsx(FieldGroup, { name: propsToUse.showLabel ? propsToUse.label : '', children: _jsx(Grid, { container: gridContainer, children: children.map((child, i) => (
                // @ts-ignore
                _jsx(Flex, { container: flexContainer, children: child }, `r-${i + 1}`))) }) }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaTwoColumnForm);
//# sourceMappingURL=index.js.map