import { jsx as _jsx } from "react/jsx-runtime";
import { Grid, Flex, FieldGroup, withConfiguration } from '@pega/cosmos-react-core';
import './create-nonce';
import DetailsRender from './DetailsRender';
import StyledJaygasiExtensionsPizzaFormWrapper from './styles';
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaForm(props) {
    const { children = [], NumCols = '1', label, showLabel, getPConnect, readOnly, displayMode } = props;
    const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };
    const nCols = parseInt(NumCols, 10);
    if (readOnly && readOnly === true || displayMode && displayMode === 'DISPLAY_ONLY') {
        const numRegions = '1';
        const gridRepeat = 'repeat('.concat(numRegions).concat(', 1fr)');
        const gridContainer = { colGap: 0, 'margin-line-start': 0 };
        // @ts-ignore
        gridContainer.cols = gridRepeat;
        // @ts-ignore
        gridContainer.gap = 2;
        return (_jsx(StyledJaygasiExtensionsPizzaFormWrapper, { children: _jsx(FieldGroup, { name: propsToUse.showLabel ? propsToUse.label : '', children: _jsx(Grid, { container: gridContainer, "data-testid": `column-count-${numRegions}`, children: children.map((child, i) => (_jsx(Flex
                    // @ts-ignore
                    , { 
                        // @ts-ignore
                        container: { direction: 'column', alignItems: 'normal', colGap: 1, rowGap: 1.5 }, children: _jsx(DetailsRender, { child: child }) }, `r-${i + 1}`))) }) }) }));
    }
    return (_jsx(StyledJaygasiExtensionsPizzaFormWrapper, { children: _jsx(FieldGroup, { name: propsToUse.showLabel ? propsToUse.label : '', children: _jsx(Grid, { container: {
                    cols: `repeat(${nCols}, minmax(0, 1fr))`,
                    gap: 2
                }, children: children }) }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaForm);
//# sourceMappingURL=index.js.map