import { Text as CosmosText } from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

import StyledcitiExtensionsPDFViewerWrapper from './styles';

// interface for props
export interface citiExtensionsPDFViewerProps extends Readonly<PConnFieldProps> {
  pdfSource: string;
  height: string;
  debug?: boolean;
}

export default function citiExtensionsPDFViewer(props: Readonly<citiExtensionsPDFViewerProps>) {
  // Destructure `value` (standard Pega prop) and `pdfSource` (custom prop for Storybook)
  const { getPConnect, label, hideLabel = true, value, pdfSource: propPdfSource, debug = false } = props;
  
  // Prioritize the standard `value` prop for the PDF data, falling back to `propPdfSource`
  const pdfSource = value || propPdfSource;

  // Get configuration properties from getPConnect, including the new 'height' property
  const { 
    readOnly = false, 
    required = false, 
    disabled = false, 
    displayMode,
    height = '600px' // Default height if not configured
  } = getPConnect().getConfigProps();
  
  const { helperText } = props;

  // Create the full data URI for the iframe
  const getPdfSrc = () => {
    if (!pdfSource) {
      return 'about:blank';
    }
    // Ensure it's a full data URI
    if (pdfSource.startsWith('data:application/pdf;base64,')) {
      return pdfSource;
    }
    return `data:application/pdf;base64,${pdfSource}`;
  };

  const pdfUrl = getPdfSrc();

  if (debug) {
    console.log(`PDFViewer using src: ${pdfUrl.substring(0, 100)}...`);
  }

  return (
    <StyledcitiExtensionsPDFViewerWrapper className={`${disabled ? 'disabled' : ''} ${readOnly || displayMode ? 'read-only' : ''}`}>
      {!hideLabel && <CosmosText>{required ? `${label} *` : label}</CosmosText>}
        <iframe
          key={pdfUrl}
          src={pdfUrl}
          width='100%'
          height={height} // Use the height from config props
          title={label}
        />
      {helperText && <CosmosText>{helperText}</CosmosText>}
      {required && !pdfSource && <CosmosText style={{ color: 'red' }}>This field is required</CosmosText>}
    </StyledcitiExtensionsPDFViewerWrapper>
  );
}