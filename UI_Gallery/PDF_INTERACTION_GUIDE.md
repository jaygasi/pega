# Smart Text Input with PDF Viewer Integration

## Overview

This implementation provides seamless interaction between text input fields and PDF viewers without modifying your existing two-column layout component.

## Components

### 1. `Pega_Extensions_SmartTextInput`
- **Purpose**: Enhanced text input with PDF search capabilities
- **Features**: 
  - Standard text input functionality
  - Optional PDF search integration
  - Visual indicators when PDF search is active
  - Configurable search triggers (focus, change, or both)

### 2. `Pega_Extensions_PDFViewerInteractive`
- **Purpose**: Enhanced PDF viewer with external search capabilities
- **Features**:
  - All original PDF viewer functionality
  - Global search manager integration
  - External search term reception
  - Search state callbacks

### 3. `Jaygasi_Extensions_pizzaTwoColumnForm` (unchanged)
- **Purpose**: Layout container for organizing components
- **Usage**: Place SmartTextInput components in Region A, PDFViewerInteractive in Region B

## How It Works

### Communication Flow
```
SmartTextInput (Focus/Change) 
    ↓ 
Global PDFSearchManager 
    ↓ 
PDFViewerInteractive (Search & Highlight)
```

### Global Communication System
- Uses `window.PDFSearchManager` for component communication
- PDF viewers register themselves on mount
- Text inputs trigger searches via the global manager
- No direct component dependencies required

## Configuration

### SmartTextInput Properties
- `enablePDFSearch`: Enable PDF interaction (default: false)
- `searchOnFocus`: Trigger search when field is focused (default: true)
- `searchOnChange`: Trigger search when field value changes (default: false)
- `searchTarget`: Optional target PDF viewer ID (for multiple PDFs)

### PDFViewerInteractive Properties
- `externalSearchTerm`: Search term from external source
- `autoSearchOnChange`: Auto-search when external term changes
- `onSearchStateChange`: Callback for search state notifications

## Setup Instructions

### 1. In Your Pega View:
1. Use `Jaygasi_Extensions_pizzaTwoColumnForm` for layout
2. Add `Pega_Extensions_SmartTextInput` components to Region A
3. Add `Pega_Extensions_PDFViewerInteractive` to Region B

### 2. Configure SmartTextInput:
- Set `enablePDFSearch` to `true`
- Choose search trigger: `searchOnFocus` and/or `searchOnChange`
- Bind to your data properties as usual

### 3. Configure PDFViewerInteractive:
- Set PDF source as usual
- Optionally set `onSearchStateChange` for search feedback

## Example Configuration

### SmartTextInput (Region A):
```json
{
  "label": "Search Terms",
  "value": "@P .CustomerName",
  "enablePDFSearch": true,
  "searchOnFocus": true,
  "searchOnChange": false,
  "placeholder": "Enter customer name..."
}
```

### PDFViewerInteractive (Region B):
```json
{
  "value": "@P .ContractPDF",
  "height": "600px",
  "showToolbar": true,
  "autoSearchOnChange": true
}
```

## Benefits

✅ **No Layout Changes**: Use existing two-column form as-is
✅ **Reusable Components**: Both components work independently  
✅ **Flexible Configuration**: Enable/disable PDF search per field
✅ **Multiple Search Triggers**: Focus, change, or both
✅ **Global Communication**: Works across any layout structure
✅ **Backward Compatible**: Original PDF viewer remains unchanged

## Usage Scenarios

1. **Contract Review**: Search for customer names, dates, or terms in PDF contracts
2. **Document Analysis**: Highlight key terms from form fields in PDF documents  
3. **Data Validation**: Cross-reference form data with PDF content
4. **Interactive Forms**: Create dynamic connections between structured data and documents

This system provides the field-to-PDF interaction you wanted while maintaining clean, reusable components!