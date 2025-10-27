// @ts-nocheck
import { useEffect, useState, useRef } from 'react';
import { withConfiguration, Input, Icon, registerIcon } from '@pega/cosmos-react-core';
import SmartTextInputContainer from './styles';
import '../shared/create-nonce';

// Import search icon for visual indicator
import * as searchIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/search.icon';
registerIcon(searchIcon);

export interface SmartTextInputProps {
  getPConnect?: any;
  label: string;
  value?: string;
  placeholder?: string;
  helperText?: string;
  validatemessage?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  testId?: string;
  fieldMetadata?: any;
  additionalProps?: any;
  displayMode?: 'DISPLAY_ONLY' | '';
  
  // PDF Interaction Props
  enablePDFSearch?: boolean;
  searchOnFocus?: boolean;
  searchOnChange?: boolean;
  searchTarget?: string;
}

// Global communication system for PDF interaction
const PDFSearchManager = {
  listeners: new Map(),
  
  // Register a PDF viewer to receive search requests
  registerPDFViewer: (id: string, callback: (term: string) => void) => {
    PDFSearchManager.listeners.set(id, callback);
  },
  
  // Unregister a PDF viewer
  unregisterPDFViewer: (id: string) => {
    PDFSearchManager.listeners.delete(id);
  },
  
  // Trigger search in PDF viewer(s)
  triggerSearch: (term: string, targetId?: string) => {
    if (targetId && PDFSearchManager.listeners.has(targetId)) {
      // Search specific target
      PDFSearchManager.listeners.get(targetId)?.(term);
    } else {
      // Search all registered PDF viewers
      PDFSearchManager.listeners.forEach((callback) => callback(term));
    }
  }
};

// Make the manager globally available
if (typeof window !== 'undefined') {
  (window as any).PDFSearchManager = PDFSearchManager;
}

export const PegaExtensionsSmartTextInput = (props: SmartTextInputProps) => {
  const {
    getPConnect,
    placeholder = '',
    validatemessage = '',
    label,
    value = '',
    hideLabel = false,
    helperText = '',
    testId = '',
    fieldMetadata,
    additionalProps = {},
    displayMode,
    enablePDFSearch = false,
    searchOnFocus = true,
    searchOnChange = false,
  } = props;

  const pConn = getPConnect();
  const actions = pConn?.getActionsApi();
  const propName = pConn?.getStateProps()?.value;
  const maxLength = fieldMetadata?.maxLength;

  let { readOnly, required, disabled } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const [inputValue, setInputValue] = useState(value);
  const [status, setStatus] = useState<string>();
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    } else {
      setStatus(validatemessage !== '' ? 'error' : undefined);
    }
  }, [validatemessage]);

  // Handle PDF search communication
  const triggerPDFSearch = (searchTerm: string) => {
    if (!enablePDFSearch || !searchTerm?.trim()) return;
    
    try {
      // Method 1: Event for working PDF viewer
      window.dispatchEvent(new CustomEvent('pdfViewerSearch', {
        detail: { searchText: searchTerm }
      }));
      
      // Method 2: Global search manager (for PDFViewerInteractive)
      if ((window as any).PDFSearchManager) {
        (window as any).PDFSearchManager.search(searchTerm);
      }
      
      // Method 3: Custom event (for PDFViewerSimple)
      window.dispatchEvent(new CustomEvent('pdfSearchRequest', {
        detail: { searchText: searchTerm }
      }));
      
      // Method 4: Direct window API call (fallback)
      if ((window as any).pdfViewer?.search) {
        (window as any).pdfViewer.search(searchTerm);
      }
      
      console.log('SmartTextInput: Triggered PDF search for:', searchTerm);
    } catch (error) {
      console.error('SmartTextInput: Error triggering PDF search:', error);
    }
  };  // Debounced search for onChange
  const debouncedSearch = (searchTerm: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      triggerPDFSearch(searchTerm);
    }, 500); // 500ms delay
  };

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    if (actions) {
      actions.updateFieldValue(propName, newValue);
      // Also use triggerFieldChange for better Pega integration (like other working components)
      actions.triggerFieldChange(propName, newValue);
    }
    
    // Trigger PDF search on change if enabled
    if (enablePDFSearch && searchOnChange) {
      debouncedSearch(newValue);
    }
  };

  const handleFocus = () => {
    // Trigger PDF search on focus if enabled
    if (enablePDFSearch && searchOnFocus && inputValue) {
      triggerPDFSearch(inputValue);
    }
    
    if (actions) {
      actions.updateFieldValue(propName, inputValue);
      // Also use triggerFieldChange for better Pega integration
      actions.triggerFieldChange(propName, inputValue);
    }
  };

  const handleBlur = (event: any) => {
    const newValue = event.target.value;
    if (actions && newValue !== value) {
      actions.updateFieldValue(propName, newValue);
    }
  };

  // Display mode for read-only
  if (displayMode === 'DISPLAY_ONLY' || readOnly) {
    return (
      <SmartTextInputContainer>
        <Input
          {...additionalProps}
          label={hideLabel ? '' : label}
          info={validatemessage || helperText}
          data-testid={testId}
          value={inputValue}
          status={status}
          placeholder={placeholder}
          disabled={true}
          readOnly={true}
          required={required}
          maxLength={maxLength}
          className="smart-text-input"
        />
      </SmartTextInputContainer>
    );
  }

  return (
    <SmartTextInputContainer className={isPDFSearchActive ? 'pdf-search-active' : ''}>
      <Input
        {...additionalProps}
        label={hideLabel ? '' : label}
        info={validatemessage || helperText}
        data-testid={testId}
        value={inputValue}
        status={status}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="smart-text-input"
      />
      {enablePDFSearch && (
        <div className={`pdf-search-indicator ${isPDFSearchActive ? 'active' : ''}`}>
          <Icon name="search" />
        </div>
      )}
    </SmartTextInputContainer>
  );
};

export { PDFSearchManager };
export default withConfiguration(PegaExtensionsSmartTextInput);