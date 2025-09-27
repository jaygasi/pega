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
export interface JaygasiExtensionsTextInputSearchProps extends PConnFieldProps {
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
      // Notify any local PDF viewer on the page about the search so it can
      // navigate/highlight the matching text (viewer listens for this event).
      const dispatchSearchEvent = (text?: string) => {
        if (typeof window === 'undefined') return;
        // Prefer standard CustomEvent constructor; if not available, attempt
        // to use a vendor-provided fallback factory and otherwise skip.
        try {
          if (typeof (window as any).CustomEvent === 'function') {
            const ev = new CustomEvent('simplePdfViewerSearch', { detail: { searchText: text, property: searchPropRef } });
            window.dispatchEvent(ev);
          } else if (typeof (window as any).CustomEvent === 'object') {
            // some hosts expose CustomEvent as an object factory
            const evPoly = (window as any).CustomEvent('simplePdfViewerSearch', { detail: { searchText: text, property: searchPropRef } });
            window.dispatchEvent(evPoly);
          } else if (typeof console !== 'undefined' && (console as any).debug) {
            console.debug('TextInputSearch: CustomEvent unsupported; search event not dispatched');
          }
        } catch (err) {
          if (typeof console !== 'undefined' && (console as any).debug) console.debug('TextInputSearch: failed to dispatch search event', err);
        }
      };

      // Prefer the programmatic API when available for immediate response
      try {
        if (typeof window !== 'undefined' && (window as any).simplePdfViewer && typeof (window as any).simplePdfViewer.search === 'function') {
          const handled = (window as any).simplePdfViewer.search(inputValue);
          // If the viewer indicates it handled the search, skip event dispatch
          if (handled) return;
        }
      } catch (err) {
        if (typeof console !== 'undefined' && (console as any).debug) console.debug('TextInputSearch: error calling simplePdfViewer.search', err);
      }

      // Fallback to event dispatch for viewers that listen for the custom event
      dispatchSearchEvent(inputValue);
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