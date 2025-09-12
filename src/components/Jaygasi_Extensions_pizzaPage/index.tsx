import { useMemo, Children } from 'react';
import { OneColumnPage as OneColumn, withConfiguration } from '@pega/cosmos-react-core';
import { ConfigurableLayout } from '@pega/cosmos-react-work'
// import { registerIcon } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';



// temp
// import * as headlineIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/headline.icon';

import StyledJaygasiExtensionsPizzaPageWrapper from './styles';

import GetNextWork from './GetNextWork';
import { getLayoutDataFromRegion } from './utils';

// temp
// registerIcon(headlineIcon);

// currently getting 'icon' from props is not supported with iconRegistry
// have to manually get icon, so can't determine a runtime for now
// so "headline" icon is hardcoded.

// interface for props
interface JaygasiExtensionsPizzaPageProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  children: any;
  title: string;
  useConfigurableLayout: boolean;
  enableGetNextWork: boolean;
}

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaPage(props: JaygasiExtensionsPizzaPageProps) {

  // add back in icon when working
  // const { children, title, icon, useConfigurableLayout = false, getPConnect, enableGetNextWork } = props;
  const { children = [], title, useConfigurableLayout, getPConnect, enableGetNextWork } = props;
  const childArray = useMemo(() => {
    return Children.toArray(children);
  }, [children]);
  const child0: any = childArray[0];
  const layoutItemsA = useMemo(() => {
    return getLayoutDataFromRegion(child0);
  }, [child0]);

  // temp
  const tempIcon = "pi pi-headline";

  return (

    <StyledJaygasiExtensionsPizzaPageWrapper>
    <OneColumn
      a={useConfigurableLayout ? <ConfigurableLayout items={layoutItemsA} /> : childArray[0]}
      title={title}
      icon={tempIcon?.replace('pi pi-', '')}
       // @ts-ignore
      actions={enableGetNextWork ? <GetNextWork getPConnect={getPConnect} /> : null}
    />
    </StyledJaygasiExtensionsPizzaPageWrapper>

  );



}

export default withConfiguration(JaygasiExtensionsPizzaPage);
