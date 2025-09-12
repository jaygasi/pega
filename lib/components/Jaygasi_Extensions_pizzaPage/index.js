import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, Children } from 'react';
import { OneColumnPage as OneColumn, withConfiguration } from '@pega/cosmos-react-core';
import { ConfigurableLayout } from '@pega/cosmos-react-work';
import './create-nonce';
// temp
// import * as headlineIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/headline.icon';
import StyledJaygasiExtensionsPizzaPageWrapper from './styles';
import GetNextWork from './GetNextWork';
import { getLayoutDataFromRegion } from './utils';
// Duplicated runtime code from Constellation Design System Component
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaPage(props) {
    // add back in icon when working
    // const { children, title, icon, useConfigurableLayout = false, getPConnect, enableGetNextWork } = props;
    const { children = [], title, useConfigurableLayout, getPConnect, enableGetNextWork } = props;
    const childArray = useMemo(() => {
        return Children.toArray(children);
    }, [children]);
    const child0 = childArray[0];
    const layoutItemsA = useMemo(() => {
        return getLayoutDataFromRegion(child0);
    }, [child0]);
    // temp
    const tempIcon = "pi pi-headline";
    return (_jsx(StyledJaygasiExtensionsPizzaPageWrapper, { children: _jsx(OneColumn, { a: useConfigurableLayout ? _jsx(ConfigurableLayout, { items: layoutItemsA }) : childArray[0], title: title, icon: tempIcon?.replace('pi pi-', ''), 
            // @ts-ignore
            actions: enableGetNextWork ? _jsx(GetNextWork, { getPConnect: getPConnect }) : null }) }));
}
export default withConfiguration(JaygasiExtensionsPizzaPage);
//# sourceMappingURL=index.js.map