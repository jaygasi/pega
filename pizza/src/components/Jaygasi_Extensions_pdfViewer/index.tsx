import { Text as CosmosText } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import StyledJaygasiExtensionsPDFViewerWrapper from './styles';

export interface JaygasiExtensionsPDFViewerProps extends Readonly<PConnFieldProps> {
  pdfSource: string;
  height: string;
  fileName?: string;
  debug?: boolean;
}

export default function JaygasiExtensionsPDFViewer(props: Readonly<JaygasiExtensionsPDFViewerProps>) {
  const { 
    getPConnect, 
    label, 
    hideLabel = true, 
    value, 
    pdfSource: propPdfSource, 
    fileName: fileNameProp,
    debug = false 
  } = props;

  const pConnect = getPConnect();

  // FIX: Check if fileNameProp exists before trying to resolve its value
  let resolvedFileName = '';
  if (fileNameProp) {
    resolvedFileName = pConnect.getValue(fileNameProp);
  }

  const {
    readOnly = false,
    required = false,
    disabled = false,
    displayMode,
    height = '600px'
  } = pConnect.getConfigProps();
  
  const { helperText } = props;

  const getPdfSrc = () => {
    if (!value && !propPdfSource) {
      return 'about:blank';
    }
    const pdfSource = value || propPdfSource;
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
    <StyledJaygasiExtensionsPDFViewerWrapper className={`${disabled ? 'disabled' : ''} ${readOnly || displayMode ? 'read-only' : ''}`}>
      {!hideLabel && <CosmosText>{required ? `${label} *` : label}</CosmosText>}

      <iframe
        key={pdfUrl}
        src={pdfUrl}
        width='100%'
        height={height}
        title={resolvedFileName || label}
      />

      {/* FIX: Corrected typo from CosmasText and closing tag */}
      {helperText && <CosmosText>{helperText}</CosmosText>}
      {required && (!value && !propPdfSource) && <CosmosText style={{ color: 'red' }}>This field is required</CosmosText>}
    </StyledJaygasiExtensionsPDFViewerWrapper>
  );
}