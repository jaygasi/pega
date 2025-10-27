// @ts-nocheck
import * as React from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { searchPlugin } from '@react-pdf-viewer/search';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { withConfiguration } from '@pega/cosmos-react-core';
import { PDFViewerContainer, ViewerWrapper } from './styles';
import { PDFViewerDiagnostics } from './diagnostics';

// Add global error handler for PDF.js to catch any canvas issues
if (globalThis.window !== undefined) {
  globalThis.window.addEventListener('error', (event) => {
    if (event.message?.includes('pdf')) {
      console.error('PDF.js error caught:', event.error, event.message);
    }
  });
}

// Simple interface for the component
export interface PDFViewerProps {
  value?: string; // PDF source (URL or base64)
  height?: string;
  showToolbar?: boolean; // Toggle toolbar visibility
  showDiagnostics?: boolean; // For debugging
}

// Helper function to check if URL contains base64 data
function containsBase64Data(url: string): boolean {
  try {
    // Extract everything after the domain
    const domainEndIndex = url.indexOf('/', url.indexOf('://') + 3);
    if (domainEndIndex === -1) return false;
    
    const pathPart = url.substring(domainEndIndex + 1); // Skip the first /
    
    // Check if it contains PDF header (JVBER = %PDF in base64)
    const hasPdfHeader = pathPart.includes('JVBER');
    
    // Also check if the majority of the content looks like base64
    const base64LikeChars = (pathPart.match(/[A-Za-z0-9+/=%]/g) || []).length;
    const totalChars = pathPart.length;
    const base64Ratio = base64LikeChars / totalChars;
    
    return hasPdfHeader && base64Ratio > 0.8 && totalChars > 100;
  } catch {
    return false;
  }
}

// Helper function to convert base64 to blob URL
function convertBase64ToBlobUrl(input: string): string {
  try {
    let base64String = input.startsWith('data:application/pdf;base64,') 
      ? input.substring('data:application/pdf;base64,'.length)
      : input;
    
    // Remove any whitespace
    base64String = base64String.replaceAll(/\s/g, '');
    
    // Pad base64 string to make length multiple of 4
    const padding = (4 - (base64String.length % 4)) % 4;
    if (padding > 0) {
      base64String += '='.repeat(padding);
      console.log('PDFViewer: Padded base64 string with', padding, 'equals');
    }
    
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i += 1) {
      bytes[i] = binaryString.codePointAt(i) || 0;
    }
    
    const blob = new Blob([bytes], { type: 'application/pdf' });
    console.log('PDFViewer: Converted base64 to blob, size:', blob.size);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('PDFViewer: Failed to convert base64 to blob:', error);
    return '';
  }
}

// Helper function to extract base64 from URL and convert to blob
function extractBase64FromUrl(url: string): string | null {
  try {
    // Extract everything after the domain
    const domainEndIndex = url.indexOf('/', url.indexOf('://') + 3);
    if (domainEndIndex === -1) {
      throw new Error('No path found in URL');
    }
    
    const pathPart = url.substring(domainEndIndex + 1); // Skip the first /
    
    // Find the last slash before JVBER
    const lastSlashBeforeJvber = pathPart.lastIndexOf('/', pathPart.indexOf('JVBER'));
    if (lastSlashBeforeJvber === -1) {
      throw new Error('No slash found before JVBER');
    }
    
    const base64String = pathPart.substring(lastSlashBeforeJvber + 1);
    
    // Try to decode URL encoding in the base64 string
    let decodedBase64;
    try {
      decodedBase64 = decodeURIComponent(base64String);
    } catch {
      decodedBase64 = base64String;
    }
    
    // Validate it's base64-like (allow spaces and some other chars)
    const invalidChars = decodedBase64.match(/[^A-Za-z0-9+/=\s]/g);
    if (invalidChars) {
      throw new Error('Invalid base64 characters');
    }
    
    console.log('PDFViewer: Extracted base64 from URL path, converting to blob...');
    const blobUrl = convertBase64ToBlobUrl(decodedBase64);
    return blobUrl || null; // Return null if conversion failed
  } catch (error) {
    console.warn('PDFViewer: Failed to extract base64 from URL:', error);
    return null; // Return null to indicate extraction failed
  }
}

// Helper function to fetch PDF from URL
async function fetchPdfFromUrl(url: string): Promise<string> {
  console.log('PDFViewer: Fetching PDF from URL:', url);
  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: { 'Accept': 'application/pdf' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    console.log('PDFViewer: Successfully fetched PDF blob, size:', blob.size);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.warn('PDFViewer: Failed to fetch PDF:', error);
    return url; // Fallback to direct URL
  }
}

// Helper function to check if input is base64 data
function isBase64Data(input: string): boolean {
  if (input.startsWith('data:application/pdf;base64,')) return true;
  return /^[A-Za-z0-9+/=\s]+$/.test(input);
}

// Convert base64 to blob URL if needed, or handle external URLs
async function processUrl(input: string): Promise<string> {
  if (!input) return '';
  
  // If it's already a blob URL, return as-is
  if (input.startsWith('blob:')) {
    return input;
  }
  
  // Check if HTTP URL contains base64 data (Pega workaround)
  if ((input.startsWith('http://') || input.startsWith('https://')) && containsBase64Data(input)) {
    const extracted = extractBase64FromUrl(input);
    if (extracted) {
      return extracted; // Successfully extracted and converted
    }
    // If extraction failed, don't try to fetch the long URL to avoid 414 error
    console.warn('PDFViewer: Detected base64 data in URL but failed to extract, skipping fetch to avoid 414 error');
    return ''; // Return empty to indicate failure
  }
  
  // If it's an HTTP/HTTPS URL, try to fetch it
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return await fetchPdfFromUrl(input);
  }
  
  // If it's base64, convert to blob URL
  if (isBase64Data(input)) {
    return convertBase64ToBlobUrl(input);
  }
  
  return input;
}

// PDF.js worker URL - try multiple CDNs for reliability
const WORKER_URLS = [
  'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js',  
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

// Try to use a worker that matches our version more closely
const WORKER_URL = WORKER_URLS[1]; // Try jsdelivr instead

const PDFViewer: React.FC<PDFViewerProps> = ({
  value = '',
  height = '600px',
  showToolbar = true,
  showDiagnostics = false
}) => {
  const [pdfUrl, setPdfUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [numPages, setNumPages] = React.useState<number>(0);
  const [isDocumentReady, setIsDocumentReady] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const normalizedValue = React.useMemo(() => (typeof value === 'string' ? value : ''), [value]);

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();
  const searchPluginInstance = searchPlugin();

  const plugins = React.useMemo(
    () => [
      toolbarPluginInstance,
      pageNavigationPluginInstance,
      zoomPluginInstance,
      searchPluginInstance
    ],
    [toolbarPluginInstance, pageNavigationPluginInstance, zoomPluginInstance, searchPluginInstance]
  );

  // External search integration - listen for TextInputSearch events
  React.useEffect(() => {
    const handlePDFSearch = (event: CustomEvent) => {
      const { searchText } = event.detail;
      if (searchText && typeof searchText === 'string') {
        console.log('PDFViewer: Received external search request:', searchText);

        // Trigger programmatic search using the search plugin
        try {
          if (searchPluginInstance && pdfUrl && !isLoading && isDocumentReady) {
            searchPluginInstance.highlight(searchText).then(matches => {
              console.log('PDFViewer: Programmatic search triggered for:', searchText, 'Found matches:', matches.length, 'PDF loaded:', !!pdfUrl, 'Loading:', isLoading, 'Document ready:', isDocumentReady);
            }).catch(searchError => {
              console.error('PDFViewer: Search failed:', searchError);
            });
          } else {
            console.warn('PDFViewer: Cannot search - search plugin not available or PDF not ready yet. Plugin:', !!searchPluginInstance, 'URL:', pdfUrl, 'Loading:', isLoading, 'Document ready:', isDocumentReady);
          }
        } catch (searchError) {
          console.error('PDFViewer: Could not trigger programmatic search:', searchError);
        }
      }
    };

    // Listen for various search events dispatched by TextInputSearch
    globalThis.addEventListener('pdfViewerSearch', handlePDFSearch as EventListener);
    globalThis.addEventListener('simplePdfViewerSearch', handlePDFSearch as EventListener);

    // Register global PDF viewer API
    (globalThis as any).pdfViewer = {
      search: (searchText: string) => {
        console.log('PDFViewer: Direct API search called:', searchText);
        if (searchPluginInstance && pdfUrl && !isLoading && isDocumentReady) {
          searchPluginInstance.highlight(searchText).then(matches => {
            console.log('PDFViewer: Direct API search executed for:', searchText, 'Found matches:', matches.length, 'PDF loaded:', !!pdfUrl, 'Loading:', isLoading, 'Document ready:', isDocumentReady);
            return matches.length > 0;
          }).catch(searchError => {
            console.error('PDFViewer: Direct API search failed:', searchError);
            return false;
          });
          return true; // Return true to indicate search was attempted
        } else {
          console.warn('PDFViewer: Direct API cannot search - search plugin not available or PDF not ready yet. Plugin:', !!searchPluginInstance, 'URL:', pdfUrl, 'Loading:', isLoading, 'Document ready:', isDocumentReady);
          return false;
        }
      }
    };

    return () => {
      globalThis.removeEventListener('pdfViewerSearch', handlePDFSearch as EventListener);
      globalThis.removeEventListener('simplePdfViewerSearch', handlePDFSearch as EventListener);
      delete (globalThis as any).pdfViewer;
    };
  }, [searchPluginInstance, pdfUrl, isLoading, isDocumentReady]);

  // Process the PDF source when it changes
  React.useEffect(() => {
    console.log('PDFViewer: Processing value:', normalizedValue);
    console.log('PDFViewer: Container dimensions:', { height, width: '100%' });
    console.log('PDFViewer: Toolbar enabled:', showToolbar);
    setError('');
    setIsDocumentReady(false); // Reset document ready state

    if (!normalizedValue) {
      setPdfUrl('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Handle async URL processing
    const loadPdf = async () => {
      try {
        const processedUrl = await processUrl(normalizedValue);
        console.log('PDFViewer: Processed URL:', processedUrl);
        setPdfUrl(processedUrl);
        setIsLoading(false);
      } catch (err) {
        console.error('Error processing PDF URL:', err);
        setError('Failed to load PDF');
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [normalizedValue]);

  // Process the PDF source when it changes  // Render the component
  const renderContent = () => {
    if (error) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#666',
            fontSize: '16px'
          }}
        >
          {error}
        </div>
      );
    }

    if (pdfUrl) {
      return (
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            height: '100%'
          }}
        >
          <Worker workerUrl={WORKER_URL}>
            <Viewer
              fileUrl={pdfUrl}
              plugins={plugins}
              defaultScale={SpecialZoomLevel.PageWidth}
              characterMap={{
                isCompressed: true,
                url: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/'
              }}
              onDocumentLoad={(event: any) => {
                const totalPages = event?.doc?.numPages ?? 0;
                console.log('PDFViewer: Document loaded with', totalPages, 'pages.');
                setNumPages(totalPages);
                setIsDocumentReady(true);
              }}

            />
          </Worker>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#666',
            fontSize: '16px'
          }}
        >
          Loading PDF...
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#666',
          fontSize: '16px'
        }}
      >
        No PDF provided
      </div>
    );
  };

  return (
    <PDFViewerContainer style={{ height: height || '600px' }}>
      {showToolbar && pdfUrl && <Toolbar />}
      <ViewerWrapper
        className="pega-pdfviewer-wrapper"
        ref={wrapperRef}
        data-testid="pdf-viewer-wrapper"
      >
        {showDiagnostics && <PDFViewerDiagnostics value={value} height={height} />}
        {renderContent()}
      </ViewerWrapper>
      {showDiagnostics && (
        <div
          style={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid #ddd',
            padding: '8px',
            fontSize: 12,
            zIndex: 1000
          }}
        >
          <div style={{ fontWeight: 600 }}>PDFViewer debug</div>
          <div>isLoading: {String(isLoading)}</div>
          <div>numPages: {numPages}</div>

          <div style={{ maxWidth: 480, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            url: {pdfUrl || '(empty)'}
          </div>
          {error && <div style={{ color: 'red' }}>error: {error}</div>}
        </div>
      )}
    </PDFViewerContainer>
  );
};

export { PDFViewer };
export default withConfiguration(PDFViewer);