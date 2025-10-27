// @ts-nocheck
import * as React from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { withConfiguration } from '@pega/cosmos-react-core';
import { PDFViewerContainer, ViewerWrapper } from './styles';
import { PDFViewerDiagnostics } from './diagnostics';

// Import required CSS for PDF viewer functionality
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Add global error handler for PDF.js to catch any canvas issues
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.message?.includes('pdf')) {
      console.error('PDF.js error caught:', event.error, event.message);
    }
  });
}

// Simple interface for the component
export interface PDFViewerInteractiveProps {
  value?: string; // PDF source (URL or base64)
  height?: string;
  showToolbar?: boolean; // Toggle toolbar visibility
  showDiagnostics?: boolean; // For debugging
  // NEW: External search integration
  externalSearchTerm?: string; // Search term from external field
  autoSearchOnChange?: boolean; // Auto-search when external term changes
  highlightExternalMatches?: boolean; // Highlight external matches
  onSearchStateChange?: (searching: boolean, term: string) => void; // Callback for search state
  // Pega integration
  searchPropRef?: string; // Property reference for search term
  getPConnect?: () => any; // Pega connection for actions API
}

// Convert base64 to blob URL if needed, or handle external URLs
async function processUrl(input: string): Promise<string> {
  if (!input) return '';
  
  // If it's already a blob URL, return as-is
  if (input.startsWith('blob:')) {
    return input;
  }
  
  // If it's an HTTP/HTTPS URL, we may need to proxy it to avoid CORS issues
  if (input.startsWith('http://') || input.startsWith('https://')) {
    console.log('PDFViewer: Processing external URL:', input);
    // For testing, try to fetch and convert to blob to avoid CORS
    try {
      const response = await fetch(input, {
        mode: 'cors',
        headers: {
          'Accept': 'application/pdf',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      console.log('PDFViewer: Successfully fetched PDF blob, size:', blob.size);
      return URL.createObjectURL(blob);
    } catch (error) {
      console.warn('PDFViewer: Failed to fetch PDF via proxy, trying direct URL:', error);
      // Fallback to direct URL - might work in some cases
      return input;
    }
  }
  
  // If it's base64, convert to blob URL
  if (input.startsWith('data:application/pdf;base64,') || /^[A-Za-z0-9+/=]+$/.exec(input)) {
    try {
      const base64String = input.startsWith('data:application/pdf;base64,') 
        ? input.substring('data:application/pdf;base64,'.length)
        : input;
      
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const blob = new Blob([bytes], { type: 'application/pdf' });
      console.log('PDFViewer: Converted base64 to blob, size:', blob.size);
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Failed to process base64 PDF:', error);
      return '';
    }
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

// Custom text layer removed - using default text layer for proper search functionality

const PegaExtensionsPDFViewerInteractive: React.FC<PDFViewerInteractiveProps> = ({
  value = '',
  height = '600px',
  showToolbar = true,
  showDiagnostics = false,
  externalSearchTerm = '',
  autoSearchOnChange = true,
  // highlightExternalMatches reserved for future highlighting features
  onSearchStateChange,
  searchPropRef,
  getPConnect
}) => {
  const [pdfUrl, setPdfUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [numPages, setNumPages] = React.useState<number>(0);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const componentIdRef = React.useRef(`pdf-viewer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // NEW: External search state management
  const [currentSearchTerm, setCurrentSearchTerm] = React.useState('');
  const [pegaSearchTerm, setPegaSearchTerm] = React.useState('');
  
  // Pega connection for actions API
  const pConnect = getPConnect ? getPConnect() : null;
  const actionsApi = pConnect?.getActionsApi ? pConnect.getActionsApi() : null;

  // Use defaultLayoutPlugin for Pega compatibility (like working PDF components)
  const defaultLayoutPluginInstance = React.useMemo(() => defaultLayoutPlugin(), []);
  const plugins = React.useMemo(() => [defaultLayoutPluginInstance], [defaultLayoutPluginInstance]);

  // Handle Pega search property updates (write search term to Pega property)
  React.useEffect(() => {
    try {
      if (searchPropRef && actionsApi && pegaSearchTerm) {
        console.log('PDFViewerInteractive: Writing search term to Pega property:', searchPropRef, pegaSearchTerm);
        actionsApi.updateFieldValue(searchPropRef, pegaSearchTerm);
      }
    } catch (error) {
      console.error('PDFViewerInteractive: Error updating Pega property:', error);
    }
  }, [pegaSearchTerm, searchPropRef, actionsApi]);

  // NEW: Register with global PDF search manager (fallback for components without Pega integration)
  React.useEffect(() => {
    try {
      const PDFSearchManager = (window as any).PDFSearchManager;
      if (PDFSearchManager && typeof PDFSearchManager.registerPDFViewer === 'function') {
        const componentId = componentIdRef.current;
        
        // Register this PDF viewer instance
        PDFSearchManager.registerPDFViewer(componentId, (searchTerm: string) => {
          console.log('PDFViewerInteractive: Received global search request:', searchTerm);
          setCurrentSearchTerm(searchTerm);
          setPegaSearchTerm(searchTerm); // Also update Pega search term
          
          // Use DOM manipulation for defaultLayoutPlugin search
          setTimeout(() => {
            try {
              const searchInput = document.querySelector('.rpv-search__input') as HTMLInputElement;
              if (searchInput) {
                searchInput.value = searchTerm;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Try to trigger search
                const searchButton = document.querySelector('.rpv-search__search-button') as HTMLButtonElement;
                if (searchButton) {
                  searchButton.click();
                } else {
                  // Try Enter key if button not found
                  const enterEvent = new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    bubbles: true
                  });
                  searchInput.dispatchEvent(enterEvent);
                }
                
                if (onSearchStateChange) {
                  onSearchStateChange(true, searchTerm);
                }
              }
            } catch (error) {
              console.error('PDFViewerInteractive: Error executing search:', error);
            }
          }, 1000); // Give defaultLayoutPlugin time to render
        });
        
        // Cleanup on unmount
        return () => {
          if (PDFSearchManager && typeof PDFSearchManager.unregisterPDFViewer === 'function') {
            PDFSearchManager.unregisterPDFViewer(componentId);
          }
        };
      }
    } catch (error) {
      console.error('PDFViewerInteractive: Error setting up PDF search manager:', error);
    }
  }, []); // Remove onSearchStateChange from dependency array to prevent re-registration

  // Process the PDF source when it changes
  React.useEffect(() => {
    console.log('PDFViewer: Processing value:', value);
    console.log('PDFViewer: Container dimensions:', { height, width: '100%' });
    console.log('PDFViewer: Toolbar enabled:', showToolbar);
    setError('');

    if (!value) {
      setPdfUrl('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Handle async URL processing
    const loadPdf = async () => {
      try {
        const processedUrl = await processUrl(value);
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
  }, [value, height, showToolbar]);

  // NEW: Handle external search term changes
  React.useEffect(() => {
    if (!externalSearchTerm || !autoSearchOnChange || !pdfUrl) {
      return;
    }

    // Only search if the term is different from current
    if (externalSearchTerm !== currentSearchTerm && externalSearchTerm.trim()) {
      console.log('PDFViewerInteractive: External search triggered:', externalSearchTerm);
      setCurrentSearchTerm(externalSearchTerm);
      
      // Wait for the default layout to be fully rendered
      const searchTimeout = setTimeout(() => {
        try {
          const searchInput = document.querySelector('.rpv-search__input') as HTMLInputElement;
          const searchButton = document.querySelector('.rpv-search__search-button') as HTMLButtonElement;
          
          if (searchInput && searchButton) {
            console.log('PDFViewerInteractive: Executing external search for:', externalSearchTerm);
            searchInput.value = externalSearchTerm;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchButton.click();
            
            if (onSearchStateChange) {
              onSearchStateChange(true, externalSearchTerm);
            }
          } else {
            console.warn('PDFViewerInteractive: Search controls not ready for external search');
          }
        } catch (error) {
          console.error('PDFViewerInteractive: Error in external search:', error);
        }
      }, 1500); // Longer wait for external searches

      return () => clearTimeout(searchTimeout);
    }
  }, [externalSearchTerm, autoSearchOnChange, currentSearchTerm, onSearchStateChange, pdfUrl]);

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
            {/* @ts-ignore: Suppress Viewer prop type errors */}
            {/* @ts-ignore */}
            <Viewer
              fileUrl={pdfUrl}
              plugins={Array.isArray(plugins) ? plugins : []}
              defaultScale={SpecialZoomLevel.PageWidth}
              onDocumentLoad={(e: any) => {
                try {
                  console.log('PDFViewer: Document loaded successfully', {
                    numPages: e.doc?.numPages,
                    fingerprint: e.doc?.fingerprint
                  });
                  setNumPages(e.doc?.numPages || 0);
                  console.log('PDFViewer: Toolbar should be visible:', showToolbar);
                  setIsLoading(false);
                  setError('');
                } catch (loadError) {
                  console.error('PDFViewer: Error in document load handler:', loadError);
                  setError('Error processing PDF document');
                  setIsLoading(false);
                }
              }}
              onDocumentLoadError={(error: any) => {
                console.error('PDFViewer: Failed to load PDF:', error);
                setError(`Failed to load PDF: ${error?.message || 'Unknown error'}`);
                setIsLoading(false);
              }}
              onPageChange={(e: any) => {
                console.log('PDFViewer: Page changed to:', e?.currentPage + 1);
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
      {showToolbar && (
        <div style={{ 
          padding: '8px 12px', 
          display: 'flex', 
          gap: 8,
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6'
        }}>
          <input
            type="text"
            placeholder="Search PDF..."
            value={pegaSearchTerm}
            onChange={(e) => {
              setPegaSearchTerm(e.target.value);
              setCurrentSearchTerm(e.target.value);
              
              // Trigger search in PDF viewer
              setTimeout(() => {
                const searchInput = document.querySelector('.rpv-search__input') as HTMLInputElement;
                if (searchInput) {
                  searchInput.value = e.target.value;
                  searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                  
                  if (e.target.value) {
                    const searchButton = document.querySelector('.rpv-search__search-button') as HTMLButtonElement;
                    if (searchButton) {
                      searchButton.click();
                    }
                  }
                }
              }, 100);
            }}
            style={{ 
              flex: 1, 
              padding: '6px 12px', 
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button 
            type="button" 
            onClick={() => {
              setPegaSearchTerm('');
              setCurrentSearchTerm('');
              
              // Clear search in PDF viewer
              setTimeout(() => {
                const searchInput = document.querySelector('.rpv-search__input') as HTMLInputElement;
                if (searchInput) {
                  searchInput.value = '';
                  searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }, 100);
            }}
            style={{
              padding: '6px 12px',
              border: '1px solid #ced4da',
              backgroundColor: '#fff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      )}
      <ViewerWrapper
        className="pega-pdfviewer-wrapper"
        ref={wrapperRef}
        data-testid="pdf-viewer-wrapper"
        style={{ flex: 1, overflow: 'auto' }}
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

export { PegaExtensionsPDFViewerInteractive };
export default withConfiguration(PegaExtensionsPDFViewerInteractive);