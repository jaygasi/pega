import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Jaygasi_Extensions_TextInputSearch/index.tsx
import { useEffect, useState } from 'react';
import { Icon, Button, Input, withConfiguration, registerIcon } from '@pega/cosmos-react-core';
import './create-nonce';
import StyledJaygasiExtensionsTextInputSearchWrapper from './styles';
// Import and register the search icon
import * as search from '@pega/cosmos-react-core/lib/components/Icon/icons/search.icon';
registerIcon(search);
// Main Component Function
function JaygasiExtensionsTextInputSearch(props) {
    const { getPConnect, placeholder, validatemessage, label, hideLabel = false, helperText, testId, additionalProps = {}, value, searchPropRef } = props;
    const pConn = getPConnect();
    const actions = pConn.getActionsApi();
    const [readOnly, required, disabled] = [props.readOnly, props.required, props.disabled].map((prop) => prop === true || (typeof prop === 'string' && prop === 'true'));
    const [inputValue, setInputValue] = useState(value);
    useEffect(() => setInputValue(value), [value]);
    const handleChange = (event) => {
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
            }
            catch (err) {
                console.error('TextInputSearch: Failed to trigger server search:', err);
            }
        }
        // Pega DX Pattern 2: Multi-method PDF communication (inspired by SmartTextInput)
        const triggerPDFSearch = (searchTerm) => {
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
                if (window.PDFSearchManager) {
                    window.PDFSearchManager.triggerSearch(searchTerm);
                }
                // Method 4: Direct API call to PDF viewer
                if (window.simplePdfViewer?.search) {
                    const handled = window.simplePdfViewer.search(searchTerm);
                    if (handled)
                        console.log('TextInputSearch: PDF viewer handled search directly');
                }
                // Method 5: Generic PDF viewer API fallback
                if (window.pdfViewer?.search) {
                    window.pdfViewer.search(searchTerm);
                }
                console.log('TextInputSearch: Dispatched PDF search events for:', searchTerm);
            }
            catch (err) {
                console.error('TextInputSearch: Error in PDF search communication:', err);
            }
        };
        // Execute the PDF search
        triggerPDFSearch(inputValue);
    };
    return (_jsxs(StyledJaygasiExtensionsTextInputSearchWrapper, { children: [_jsx(Input, { ...additionalProps, type: 'text', label: label, labelHidden: hideLabel, value: inputValue, placeholder: placeholder, helperText: helperText, info: validatemessage, onChange: handleChange, readOnly: readOnly, disabled: disabled, required: required, "data-testid": testId }), _jsx(Button, { variant: "simple", label: "Search", iconOnly: true, onClick: handleSearchIconClick, disabled: disabled || readOnly || !inputValue?.trim(), "data-testid": `${testId}-search`, title: `Search for: ${inputValue || 'Enter text first'}`, children: _jsx(Icon, { name: "search" }) })] }));
}
export default withConfiguration(JaygasiExtensionsTextInputSearch);
