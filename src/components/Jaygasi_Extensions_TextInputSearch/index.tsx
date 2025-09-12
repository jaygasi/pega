// src/components/Jaygasi_Extensions_TextInputSearch/index.tsx

import { useEffect, useState } from 'react';
import { Icon, Button, Input, withConfiguration, registerIcon } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

import StyledJaygasiExtensionsTextInputSearchWrapper from './styles';

// Import and register the search icon
import * as search from '@pega/cosmos-react-core/lib/components/Icon/icons/search.icon';

registerIcon(search);

// Prop interface
interface JaygasiExtensionsTextInputSearchProps extends PConnFieldProps {
  readonly searchPropRef?: string;
}

// Main Component Function
function JaygasiExtensionsTextInputSearch(props: Readonly<JaygasiExtensionsTextInputSearchProps>) {
  const {
     getPConnect,
     placeholder,
     validatemessage,
     label,
     hideLabel = false,
     helperText,
     testId,
     additionalProps = {},
     value,
     searchPropRef
   } = props;

   const pConn = getPConnect();
   const actions = pConn.getActionsApi();

   const [readOnly, required, disabled] = [props.readOnly, props.required, props.disabled].map(
     (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
   );
 
   const [inputValue, setInputValue] = useState(value);
   useEffect(() => setInputValue(value), [value]);
 
   const handleChange = (event: any) => {
     setInputValue(event.target.value);
   };
 
   const handleSearchIconClick = () => {
     if (searchPropRef) {
       // This is the correct API call. It posts the value to the server and
       // triggers the server-side processing configured in the view.
       actions.triggerFieldChange(searchPropRef, inputValue);
     }
   };
 
   return (
     <StyledJaygasiExtensionsTextInputSearchWrapper>
       <Input
         {...additionalProps}
         type='text'
         label={label}
         labelHidden={hideLabel}
         value={inputValue}
         placeholder={placeholder}
         helperText={helperText}
         info={validatemessage}
         onChange={handleChange}
         readOnly={readOnly}
         disabled={disabled}
         required={required}
         data-testid={testId}
       />
       <Button
         variant="simple"
         label="Search"
         iconOnly
         onClick={handleSearchIconClick}
         disabled={disabled || readOnly || !inputValue}
         data-testid={`${testId}-search`}
       >
         <Icon name="search" />
       </Button>
     </StyledJaygasiExtensionsTextInputSearchWrapper>
   );
 }

export default withConfiguration(JaygasiExtensionsTextInputSearch);