import React, { useState, useEffect, Component } from 'react';
import { Text as CosmosText } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import StyledJaygasiExtensionsPDFViewerBlobWrapper from './styles';

// Import react-pdf-viewer components
import { Worker, Viewer } from '@react-pdf-viewer/core';
import * as pdfjs from 'pdfjs-dist/build/pdf.worker.entry';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Import the search plugin and its styles
import { searchPlugin, type SearchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/search/lib/styles/index.css';

// Prop interface
interface JaygasiExtensionsPDFViewerBlobProps extends Readonly<PConnFieldProps> {
  pdfSource: string;
  height: string;
  enableDebugging?: boolean;
  highlightPropRef?: string;
  highlightTextStatic?: string;
}

// Error Boundary Component
class ErrorBoundary extends Component<{ children: React.ReactNode; onError: (error: Error) => void }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error);
    console.error("Uncaught error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return <CosmosText style={{ color: 'red' }}>Error rendering PDF.</CosmosText>;
    }
    return this.props.children;
  }
}

// Helper functions
const createPdfBlob = (pdfSource: string, enableDebugging: boolean): { url: string | null; error: string } => {
  try {
    if (enableDebugging) { console.log(`Creating PDF blob from source with length ${pdfSource?.length || 0}.`); }
    const isDataUrl = pdfSource.startsWith('data:application/pdf;base64,');
    const base64Data = isDataUrl ? pdfSource.split(',')[1] : pdfSource;
    const binary = atob(base64Data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) { array[i] = binary.charCodeAt(i); }
    const blob = new Blob([array], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    if (enableDebugging) console.log('PDF Blob URL created:', url);
    return { url, error: '' };
  } catch (err) {
    if (enableDebugging) console.error('Error processing base64 to Blob:', err);
    return { url: null, error: 'Failed to process PDF data.' };
  }
};
const getConfigProps = (getPConnect: any, enableDebugging: boolean) => {
  try { return getPConnect()?.getConfigProps?.() || {}; }
  catch (error) {
    if (enableDebugging) console.error('Error getting config props:', error);
    return {};
  }
};
const isReadOnlyMode = (displayMode: string, configProps: any): boolean => {
  return ['LABELS_LEFT', 'DISPLAY_ONLY', 'STACKED_LARGE_VAL'].includes(displayMode) || configProps?.readOnly;
};

// --- REWRITTEN SearchToolbar Component ---
const SearchToolbar: React.FC<{
  searchPluginInstance: SearchPlugin;
  initialSearchText: string;
}> = ({ searchPluginInstance, initialSearchText }) => {
  const { highlight, jumpToNextMatch, jumpToPreviousMatch } = searchPluginInstance;
  const [keyword, setKeyword] = useState(initialSearchText);

  // Effect to update the keyword if the initial prop from Pega changes
  useEffect(() => {
    setKeyword(initialSearchText);
  }, [initialSearchText]);

  const handleSearch = () => {
    if (keyword) {
      highlight({ keyword, matchCase: false });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0.5rem', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderBottom: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); }}}
          placeholder="Search document"
          style={{ border: '1px solid #ccc', padding: '0.25rem', width: '200px' }}
        />
        <button style={{ marginLeft: '0.5rem' }} type="button" onClick={handleSearch}>Search</button>
      </div>
      <button style={{ marginLeft: 'auto' }} type="button" onClick={jumpToPreviousMatch}>Previous</button>
      <button style={{ marginLeft: '0.5rem' }} type="button" onClick={jumpToNextMatch}>Next</button>
    </div>
  );
};

// Extracted Content Components
const PDFContent: React.FC<{ pdfUrl: string; height: string; plugins: any[]; onDocLoad: () => void; }> =
  ({ pdfUrl, height, plugins, onDocLoad }) => (
    <ErrorBoundary onError={(error) => console.error('Error rendering PDF viewer:', error)}>
      <div className="pdf-viewer-container" style={{ height: `${height || 600}px`, width: '100%' }}>
        <Viewer fileUrl={pdfUrl} plugins={plugins} onDocumentLoad={onDocLoad} />
      </div>
    </ErrorBoundary>
);

const PDFDisplayController: React.FC<{
  pdfSource: string;
  errorMessage: string;
  pdfUrl: string | null;
  height: string;
  plugins: any[];
  onDocLoad: () => void;
}> = ({ pdfSource, errorMessage, pdfUrl, height, plugins, onDocLoad }) => {
  if (!pdfSource) {
    return (
      <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px', color: '#555' }}>
        No PDF data provided.
      </div>
    );
  }
  if (errorMessage) { return <CosmosText style={{ color: 'red' }}>{errorMessage}</CosmosText>; }
  if (pdfUrl) { return <PDFContent pdfUrl={pdfUrl} height={height} plugins={plugins} onDocLoad={onDocLoad} />; }
  return <CosmosText style={{ color: 'blue' }}>Loading PDF...</CosmosText>;
};

// Main Component
export default function JaygasiExtensionsPDFViewerBlob(props: Readonly<JaygasiExtensionsPDFViewerBlobProps>) {
  const {
    getPConnect, pdfSource = '', enableDebugging = false, label = '',
    hideLabel = false, height = '600', helperText = '',
    highlightPropRef = '', highlightTextStatic = ''
  } = props;

  const [isPegaReady, setIsPegaReady] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchText, setSearchText] = useState('');

  const searchPluginInstance = searchPlugin();
  const { highlight } = searchPluginInstance;

  useEffect(() => {
    if (!pdfSource || typeof pdfSource !== 'string') {
      setPdfUrl(null);
      setErrorMessage('');
      return undefined;
    }
    const { url, error } = createPdfBlob(pdfSource, enableDebugging);
    setPdfUrl(url);
    setErrorMessage(error);
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
        if (enableDebugging) console.log('PDF Blob URL revoked:', url);
      }
    };
  }, [pdfSource, enableDebugging]);

  useEffect(() => {
    if (isPegaReady) {
      if (highlightPropRef) {
        try {
          const pConnect = getPConnect();
          const propValue = pConnect.getValue(highlightPropRef);
          if (propValue) { setSearchText(propValue); return; }
        } catch (e) {
          if (enableDebugging) console.error(`Error reading property ${highlightPropRef}:`, e);
        }
      }
      if (highlightTextStatic) { setSearchText(highlightTextStatic); }
    }
  }, [isPegaReady, highlightPropRef, highlightTextStatic, getPConnect, enableDebugging]);

  const handleDocumentLoad = () => {
    if (searchText) {
      highlight({ keyword: searchText, matchCase: false });
    }
  };
  
  useEffect(() => {
    if (isPegaReady) return;
    try {
      const pConnect = getPConnect?.();
      const config = pConnect?.getConfigProps?.();
      if (pConnect && config && typeof config.label !== 'undefined') {
        setIsPegaReady(true);
      }
    } catch (error) {
      if (enableDebugging) console.error('Error resolving Pega context:', error);
    }
  }, [isPegaReady, getPConnect, enableDebugging]);

  if (!isPegaReady) {
    return <CosmosText style={{ padding: '1rem' }}>Loading context...</CosmosText>;
  }

  const configProps = getConfigProps(getPConnect, enableDebugging);
  const { required = false, disabled = false, displayMode } = configProps;
  const isReadOnly = isReadOnlyMode(displayMode, configProps);
  const showLabel = !hideLabel && !isReadOnly;

  return (
    <StyledJaygasiExtensionsPDFViewerBlobWrapper className={`${disabled ? 'disabled' : ''} ${isReadOnly ? 'read-only' : ''}`}>
      {showLabel && <CosmosText>{required ? `${label} *` : label}</CosmosText>}
      {searchText && <SearchToolbar searchPluginInstance={searchPluginInstance} initialSearchText={searchText} />}
      <Worker workerUrl={pdfjs}>
        <PDFDisplayController
          pdfSource={pdfSource}
          errorMessage={errorMessage}
          pdfUrl={pdfUrl}
          height={height}
          plugins={[searchPluginInstance]}
          onDocLoad={handleDocumentLoad}
        />
      </Worker>
      {helperText && <CosmosText>{helperText}</CosmosText>}
    </StyledJaygasiExtensionsPDFViewerBlobWrapper>
  );
}