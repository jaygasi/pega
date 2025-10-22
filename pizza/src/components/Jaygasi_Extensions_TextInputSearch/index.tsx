// src/components/Jaygasi_Extensions_TextInputSearch/index.tsx

import { useEffect, useState } from 'react';
import { Icon, Button, Input, withConfiguration, registerIcon, FieldValueList, Text } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

import StyledJaygasiExtensionsTextInputSearchWrapper from './styles';

// Import and register the search icon
import * as search from '@pega/cosmos-react-core/lib/components/Icon/icons/search.icon';

registerIcon(search);

// Prop interface
export interface JaygasiExtensionsTextInputSearchProps extends PConnFieldProps {
  readonly searchPropRef?: string;
  readonly displayMode?: string;
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
     searchPropRef,
     displayMode
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
    console.log('TextInputSearch: Search button clicked!', { inputValue, searchPropRef, disabled, readOnly });
    
    if (!inputValue?.trim()) {
      console.warn('TextInputSearch: No search text provided');
      alert('Please enter search text first');
      return;
    }

    // Pega DX Pattern 1: Server-side integration using triggerFieldChange
    if (searchPropRef) {
      try {
        actions.triggerFieldChange(searchPropRef, inputValue);
        console.log('TextInputSearch: Triggered server search for:', inputValue);
      } catch (err) {
        console.error('TextInputSearch: Failed to trigger server search:', err);
      }
    }

    // Pega DX Pattern 2: Multi-method PDF communication (inspired by SmartTextInput)
    const triggerPDFSearch = (searchTerm: string) => {
      try {
        // Method 1: Standard CustomEvent for PDF viewers
        window.dispatchEvent(new CustomEvent('pdfViewerSearch', {
          detail: { searchText: searchTerm, property: searchPropRef }
        }));

        // Method 2: Legacy SimplePdfViewer event
        window.dispatchEvent(new CustomEvent('simplePdfViewerSearch', {
          detail: { searchText: searchTerm, property: searchPropRef }
        }));

        // Method 3: Global PDF Search Manager (UI_Gallery pattern)
        if ((window as any).PDFSearchManager) {
          (window as any).PDFSearchManager.triggerSearch(searchTerm);
        }

        // Method 4: Direct API call to PDF viewer
        if ((window as any).simplePdfViewer?.search) {
          const handled = (window as any).simplePdfViewer.search(searchTerm);
          if (handled) console.log('TextInputSearch: PDF viewer handled search directly');
        }

        // Method 5: Generic PDF viewer API fallback
        if ((window as any).pdfViewer?.search) {
          (window as any).pdfViewer.search(searchTerm);
        }

        console.log('TextInputSearch: Dispatched PDF search events for:', searchTerm);
      } catch (err) {
        console.error('TextInputSearch: Error in PDF search communication:', err);
      }
    };

    // Execute the PDF search
    triggerPDFSearch(inputValue);
  };

  // Handle READ-ONLY display modes (no input, just display existing values)
  if (displayMode === 'DISPLAY_ONLY') {
    const displayComp = value || <span aria-hidden='true'>&ndash;&ndash;</span>;
    return (
      <StyledJaygasiExtensionsTextInputSearchWrapper> 
        {displayComp} 
      </StyledJaygasiExtensionsTextInputSearchWrapper>
    );
  }

  if (displayMode === 'LABELS_LEFT') {
    const displayComp = value || <span aria-hidden='true'>&ndash;&ndash;</span>;
    return (
      <StyledJaygasiExtensionsTextInputSearchWrapper>
        <FieldValueList
          variant={hideLabel ? 'stacked' : 'inline'}
          data-testid={testId}
          fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
        />
      </StyledJaygasiExtensionsTextInputSearchWrapper>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    const isValDefined = value !== undefined && value !== '';
    const val = isValDefined ? (
      <Text variant='h1' as='span'>
        {value}
      </Text>
    ) : (
      ''
    );
    return (
      <StyledJaygasiExtensionsTextInputSearchWrapper>
        <FieldValueList
          variant='stacked'
          data-testid={testId}
          fields={[{ id: '2', name: hideLabel ? '' : label, value: val }]}
        />
      </StyledJaygasiExtensionsTextInputSearchWrapper>
    );
  }

  // Default editable mode with search functionality
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
         disabled={disabled || readOnly || !inputValue?.trim()}
         data-testid={`${testId}-search`}
         title={`Search for: ${inputValue || 'Enter text first'}`}
       >
         <Icon name="search" />
       </Button>
     </StyledJaygasiExtensionsTextInputSearchWrapper>
   );
 }

export default withConfiguration(JaygasiExtensionsTextInputSearch);