// @ts-nocheck
import * as React from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import {
  pageNavigationPlugin,
  RenderCurrentPageLabelProps,
  RenderGoToPageProps,
  RenderNumberOfPagesProps
} from '@react-pdf-viewer/page-navigation';
import {
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin
} from '@react-pdf-viewer/zoom';
import { searchPlugin, RenderSearchProps } from '@react-pdf-viewer/search';
import { FaSearch, FaSearchMinus, FaSearchPlus, FaStepBackward, FaStepForward } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { withConfiguration } from '@pega/cosmos-react-core';
import { PDFViewerContainer, ViewerWrapper } from './styles';
import { PDFViewerDiagnostics } from './diagnostics';

// Add global error handler for PDF.js to catch any canvas issues
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
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

const TextLayerWithFonts = (props) => {
  const { viewport, textContentSource } = props;
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const render = async () => {
      const textContent = await textContentSource.promise;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';

        textContent.items.forEach((item) => {
          const textSpan = document.createElement('span');
          const fontName = item.fontName.split('-')[0].split('+')[1] || 'sans-serif';

          const style = props.applyTransform(
            {
              ...item.style,
              fontFamily: fontName,
              color: 'transparent'
            },
            { transform: viewport.transform.concat([1, 0, 0, 1, -1, -1]) }
          );

          Object.keys(style).forEach((key) => {
            textSpan.style[key] = style[key];
          });

          textSpan.textContent = item.str;
          containerRef.current.appendChild(textSpan);
        });
      }
    };

    render();
  }, [textContentSource, viewport, props]);

  return React.createElement('div', {
    ref: containerRef,
    className: 'rpv-core__text-layer',
    style: {
      ...props.style,
      width: `${viewport.width}px`,
      height: `${viewport.height}px`,
    },
  });
};

const renderTextLayerWithFonts = (props) => <TextLayerWithFonts {...props} />;

TextLayerWithFonts.propTypes = {
  viewport: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    transform: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  textContentSource: PropTypes.shape({
    promise: PropTypes.object
  }).isRequired,
  applyTransform: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};

const PegaExtensionsPDFViewer: React.FC<PDFViewerProps> = ({
  value = '',
  height = '600px',
  showToolbar = true,
  showDiagnostics = false
}) => {
  const [pdfUrl, setPdfUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [numPages, setNumPages] = React.useState<number>(0);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();
  const searchPluginInstance = searchPlugin();
  const { GoToNextPage, GoToPreviousPage, CurrentPageLabel, NumberOfPages } =
    pageNavigationPluginInstance;
  const { ZoomIn, ZoomOut } = zoomPluginInstance;
  const { Search } = searchPluginInstance;

  const plugins = [pageNavigationPluginInstance, zoomPluginInstance, searchPluginInstance];

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
              plugins={plugins}
              defaultScale={SpecialZoomLevel.PageWidth}
              onDocumentLoad={(e: any) => {
                console.log('PDFViewer: Document loaded successfully', {
                  numPages: e.doc.numPages,
                  fingerprint: e.doc.fingerprint
                });
                setNumPages(e.doc.numPages || 0);
                console.log('PDFViewer: Toolbar should be visible:', showToolbar);
                setIsLoading(false);
              }}
              renderTextLayer={renderTextLayerWithFonts} // <<< ADD THIS PROP
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
      {showToolbar && pdfUrl && (
        <div className="rpv-core__toolbar">
          <div className="rpv-core__toolbar-left">
            <ZoomOut>
              {(props: RenderZoomOutProps) => (
                <button className="rpv-core__button" onClick={props.onClick} title="Zoom Out">
                  <FaSearchMinus />
                </button>
              )}
            </ZoomOut>
            <ZoomIn>
              {(props: RenderZoomInProps) => (
                <button className="rpv-core__button" onClick={props.onClick} title="Zoom In">
                  <FaSearchPlus />
                </button>
              )}
            </ZoomIn>
          </div>
          <div className="rpv-core__toolbar-middle">
            <GoToPreviousPage>
              {(props: RenderGoToPageProps) => (
                <button
                  className="rpv-core__button"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Previous Page"
                >
                  <FaStepBackward />
                </button>
              )}
            </GoToPreviousPage>
            <div className="rpv-core__current-page-input">
              <CurrentPageLabel>
                {(props: RenderCurrentPageLabelProps) => <span>{props.currentPage + 1}</span>}
              </CurrentPageLabel>
              <span>/</span>
              <NumberOfPages>
                {(props: RenderNumberOfPagesProps) => <span>{props.numberOfPages}</span>}
              </NumberOfPages>
            </div>
            <GoToNextPage>
              {(props: RenderGoToPageProps) => (
                <button
                  className="rpv-core__button"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Next Page"
                >
                  <FaStepForward />
                </button>
              )}
            </GoToNextPage>
          </div>
          <div className="rpv-core__toolbar-right">
            <Search>
              {(props: RenderSearchProps) => (
                <div className="pega-pdf-search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    value={props.keyword}
                    onChange={(e) => props.setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        props.search();
                      }
                    }}
                    className="rpv-core__search-input"
                  />
                  <button className="rpv-core__button" onClick={props.search} title="Search">
                    <FaSearch />
                  </button>
                </div>
              )}
            </Search>
          </div>
        </div>
      )}
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

export { PegaExtensionsPDFViewer };
export default withConfiguration(PegaExtensionsPDFViewer);