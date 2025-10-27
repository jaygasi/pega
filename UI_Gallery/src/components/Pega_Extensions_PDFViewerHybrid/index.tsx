// @ts-nocheck
import * as React from 'react';
import { useEffect, useMemo, useState, useRef } from 'react';
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
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { FaSearch, FaSearchMinus, FaSearchPlus, FaStepBackward, FaStepForward } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { withConfiguration } from '@pega/cosmos-react-core';
import { PDFViewerContainer, ViewerWrapper } from './styles';
import { PDFViewerDiagnostics } from './diagnostics';

// ============================================================================
// HYBRID PDF VIEWER - Combines PDFViewer reliability with highlighting features
// ============================================================================
// This component extends the PDFViewer with advanced highlighting capabilities
// from InteractivePDFAdvanced while maintaining the excellent UI/UX.

// Worker URL configuration
const PDFJS_VERSION = '3.4.120';
const WORKER_URL = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.js`;

// Add global error handler for PDF.js to catch any canvas issues
if (globalThis.window !== undefined) {
  globalThis.window.addEventListener('error', (event) => {
    if (event.message?.includes('pdf')) {
      console.error('PDF.js error caught:', event.error, event.message);
    }
  });
}

// ============================================================================
// INTERFACE DEFINITIONS
// ============================================================================

export interface HighlightColor {
  coordinate?: string;
  text?: string;
  test?: string;
}

export interface HybridPDFViewerProps {
  // Original PDFViewer props
  value?: string; // PDF source (URL or base64)
  height?: string;
  showToolbar?: boolean; // Toggle toolbar visibility
  showDiagnostics?: boolean; // For debugging

  // New highlighting props (from InteractivePDFAdvanced)
  highlightProperty?: string; // Property name for coordinate-based highlights
  textHighlightProperty?: string; // Property name for text-based highlights
  additionalHighlightProps?: string; // Comma-separated list of additional highlight properties
  textHighlightJSON?: string; // Direct JSON string for text highlights
  testPxResultsJson?: string; // JSON string for test highlights
  confidenceFilter?: string; // Minimum confidence threshold for highlights

  // Highlight configuration
  enableHighlighting?: boolean; // Enable highlighting features
  enableDebugging?: boolean; // Show debug information panel
  highlightColors?: HighlightColor; // Customize highlight colors

  // Pega integration
  getPConnect?: () => any;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert base64 to blob URL if needed, or handle external URLs
 */
async function processUrl(input: string): Promise<string> {
  if (!input) return '';

  // If it's already a blob URL, return as-is
  if (input.startsWith('blob:')) {
    return input;
  }

  // If it's an HTTP/HTTPS URL, use directly
  if (input.startsWith('http://') || input.startsWith('https://')) {
    console.log('HybridPDFViewer: Processing external URL:', input);
    return input;
  }

  // Assume it's base64 data
  if (input.startsWith('data:application/pdf;base64,')) {
    return input;
  }

  // Convert base64 to blob URL
  try {
    const byteCharacters = atob(input);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.codePointAt(i) || 0;
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error converting base64 to blob:', error);
    throw error;
  }
}

/**
 * Render text layer with fonts (ensures text selection works properly)
 */
function renderTextLayerWithFonts(canvasLayer: any, page: any) {
  page.getTextContent().then((textContent: any) => {
    const textLayerDiv = canvasLayer.nextSibling;
    if (!textLayerDiv) return;

    textLayerDiv.innerHTML = '';

    const scale = canvasLayer.style.width
      ? Number.parseFloat(canvasLayer.style.width) / page.view[2]
      : 1;

    for (const item of textContent.items) {
      const span = document.createElement('span');
      span.textContent = item.str;
      span.style.position = 'absolute';
      span.style.left = (item.transform[4] * scale) / page.view[2] * 100 + '%';
      span.style.top = (page.view[3] - item.transform[5]) / page.view[3] * 100 + '%';
      span.style.fontSize = (item.height * scale).toFixed(2) + 'px';
      span.style.opacity = '0';
      textLayerDiv.appendChild(span);
    }
  });
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const HybridPDFViewer = (props: HybridPDFViewerProps) => {
  const {
    value,
    height = '600px',
    showToolbar = true,
    showDiagnostics = false,
    highlightProperty = 'highlights',
    textHighlightProperty = 'textHighlights',
    additionalHighlightProps,
    textHighlightJSON,
    testPxResultsJson,
    confidenceFilter,
    enableHighlighting = true,
    enableDebugging = false,
    highlightColors = {
      coordinate: 'rgba(255, 255, 0, 0.3)',
      text: 'rgba(0, 255, 0, 0.3)',
      test: 'rgba(255, 0, 0, 0.3)'
    },
    getPConnect
  } = props;

  const pConnect = getPConnect?.();

  // State management
  const [pdfUrl, setPdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [numPages, setNumPages] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Highlight state
  const [processedHighlights, setProcessedHighlights] = useState<any[]>([]);
  const [textHighlights, setTextHighlights] = useState<any[]>([]);
  const [testHighlights, setTestHighlights] = useState<any[]>([]);

  // ========================================================================
  // EFFECT: Load PDF from value prop
  // ========================================================================
  useEffect(() => {
    if (!value) {
      setPdfUrl('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const loadPdf = async () => {
      try {
        const processedUrl = await processUrl(value);
        console.log('HybridPDFViewer: Processed URL:', processedUrl);
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

  // ========================================================================
  // EFFECT: Process coordinate-based highlights
  // ========================================================================
  useEffect(() => {
    if (!enableHighlighting || !pConnect) {
      setProcessedHighlights([]);
      return;
    }

    try {
      let mergedHighlights = pConnect.getValue(highlightProperty)?.pxResults || [];

      // Handle additional highlight props
      if (additionalHighlightProps) {
        const additionalProps = additionalHighlightProps.split(',').map((p: string) => p.trim());
        for (const prop of additionalProps) {
          const additionalData = pConnect.getValue(prop);
          if (additionalData?.pxResults) {
            mergedHighlights = mergedHighlights.concat(additionalData.pxResults);
          }
        }
      }

      // Convert pySearchPage to boundingBox if needed
      mergedHighlights = mergedHighlights.map((highlight: any) => {
        if (highlight.pySearchPage && !highlight.boundingBox) {
          const { pyFirstPartPropensity, pyMaxScore, pyBestPerformance, pyMinScore } = highlight.pySearchPage;
          return {
            ...highlight,
            boundingBox: {
              left: pyMinScore || 0,
              top: pyFirstPartPropensity || 0,
              right: pyMaxScore || 1,
              bottom: pyBestPerformance || 1
            }
          };
        }
        return highlight;
      });

      // Filter by confidence
      if (confidenceFilter) {
        const minConfidence = Number.parseFloat(confidenceFilter);
        mergedHighlights = mergedHighlights.filter((h: any) => h.pyScore >= minConfidence);
      }

      setProcessedHighlights(mergedHighlights);
    } catch (err) {
      console.error('Error processing highlights:', err);
      setProcessedHighlights([]);
    }
  }, [pConnect, highlightProperty, additionalHighlightProps, confidenceFilter, enableHighlighting]);

  // ========================================================================
  // EFFECT: Process text-based highlights
  // ========================================================================
  useEffect(() => {
    if (!enableHighlighting) {
      setTextHighlights([]);
      return;
    }

    try {
      let textHighlightsList: any[] = [];

      // Get from property
      if (pConnect) {
        const data = pConnect.getValue(textHighlightProperty);
        if (data?.pxResults) {
          textHighlightsList = data.pxResults;
        }
      }

      // Get from JSON prop
      if (textHighlightJSON) {
        try {
          const parsed = JSON.parse(textHighlightJSON);
          if (Array.isArray(parsed)) {
            textHighlightsList = textHighlightsList.concat(parsed);
          }
        } catch (e) {
          console.error('Error parsing textHighlightJSON:', e);
        }
      }

      // Filter by confidence
      if (confidenceFilter) {
        const minConfidence = Number.parseFloat(confidenceFilter);
        textHighlightsList = textHighlightsList.filter(
          (h: any) => (h.confidence || h.pyScore || 1) >= minConfidence
        );
      }

      setTextHighlights(
        textHighlightsList.map((h: any) => ({
          ...h,
          boundingBox: h.boundingBox || { left: 0, top: 0, right: 1, bottom: 1 }
        }))
      );
    } catch (err) {
      console.error('Error processing text highlights:', err);
      setTextHighlights([]);
    }
  }, [pConnect, textHighlightProperty, textHighlightJSON, confidenceFilter, enableHighlighting]);

  // ========================================================================
  // EFFECT: Process test highlights
  // ========================================================================
  useEffect(() => {
    if (!testPxResultsJson) {
      setTestHighlights([]);
      return;
    }

    try {
      const parsed = JSON.parse(testPxResultsJson);
      setTestHighlights(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error('Error parsing testPxResultsJson:', e);
      setTestHighlights([]);
    }
  }, [testPxResultsJson]);

  // ========================================================================
  // SETUP PLUGINS
  // ========================================================================

  // Highlight plugin with custom rendering
  const highlightPluginInstance = useMemo(() => {
    return highlightPlugin({
      renderHighlights: (props) => (
        <div>
          {/* Coordinate-based highlights */}
          {processedHighlights.map((highlight, index) => {
            const { pxTrackingIndex, boundingBox } = highlight;
            if (pxTrackingIndex !== props.pageIndex) return null;

            return (
              <div
                key={`coord-${pxTrackingIndex}-${index}`}
                style={{
                  position: 'absolute',
                  left: `${boundingBox.left * 100}%`,
                  top: `${boundingBox.top * 100}%`,
                  width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                  height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                  backgroundColor: highlightColors.coordinate,
                  border: '1px solid #ff0',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
            );
          })}

          {/* Text-based highlights */}
          {textHighlights.map((highlight, index) => {
            const { pxTrackingIndex, boundingBox } = highlight;
            if (pxTrackingIndex !== props.pageIndex || !boundingBox) return null;

            return (
              <div
                key={`text-${pxTrackingIndex}-${index}`}
                style={{
                  position: 'absolute',
                  left: `${boundingBox.left * 100}%`,
                  top: `${boundingBox.top * 100}%`,
                  width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                  height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                  backgroundColor: highlightColors.text,
                  border: '1px solid #0f0',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />
            );
          })}

          {/* Test highlights */}
          {testHighlights.map((highlight, index) => {
            const { pxTrackingIndex, boundingBox } = highlight;
            if (pxTrackingIndex !== props.pageIndex) return null;

            return (
              <div
                key={`test-${pxTrackingIndex}-${index}`}
                style={{
                  position: 'absolute',
                  left: `${boundingBox.left * 100}%`,
                  top: `${boundingBox.top * 100}%`,
                  width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                  height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                  backgroundColor: highlightColors.test,
                  border: '1px solid #f00',
                  pointerEvents: 'none',
                  zIndex: 3
                }}
              />
            );
          })}
        </div>
      )
    });
  }, [processedHighlights, textHighlights, testHighlights, highlightColors]);

  // Create plugins array
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();
  const searchPluginInstance = searchPlugin();

  const plugins = useMemo(() => {
    const pluginList = [
      pageNavigationPluginInstance,
      zoomPluginInstance,
      searchPluginInstance
    ];
    if (enableHighlighting) {
      pluginList.push(highlightPluginInstance);
    }
    return pluginList;
  }, [pageNavigationPluginInstance, zoomPluginInstance, searchPluginInstance, highlightPluginInstance, enableHighlighting]);

  // ========================================================================
  // RENDER
  // ========================================================================

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
              onDocumentLoad={(e: any) => {
                console.log('HybridPDFViewer: Document loaded successfully', {
                  numPages: e.doc.numPages,
                  fingerprint: e.doc.fingerprint
                });
                setNumPages(e.doc.numPages || 0);
                setIsLoading(false);
              }}
              renderTextLayer={renderTextLayerWithFonts}
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
            <pageNavigationPluginInstance.ZoomOut>
              {(props: RenderZoomOutProps) => (
                <button className="rpv-core__button" onClick={props.onClick} title="Zoom Out">
                  <FaSearchMinus />
                </button>
              )}
            </pageNavigationPluginInstance.ZoomOut>
            <zoomPluginInstance.ZoomIn>
              {(props: RenderZoomInProps) => (
                <button className="rpv-core__button" onClick={props.onClick} title="Zoom In">
                  <FaSearchPlus />
                </button>
              )}
            </zoomPluginInstance.ZoomIn>
          </div>
          <div className="rpv-core__toolbar-middle">
            <pageNavigationPluginInstance.GoToPreviousPage>
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
            </pageNavigationPluginInstance.GoToPreviousPage>
            <div className="rpv-core__current-page-input">
              <pageNavigationPluginInstance.CurrentPageLabel>
                {(props: RenderCurrentPageLabelProps) => <span>{props.currentPage + 1}</span>}
              </pageNavigationPluginInstance.CurrentPageLabel>
              <span>/</span>
              <pageNavigationPluginInstance.NumberOfPages>
                {(props: RenderNumberOfPagesProps) => <span>{props.numberOfPages}</span>}
              </pageNavigationPluginInstance.NumberOfPages>
            </div>
            <pageNavigationPluginInstance.GoToNextPage>
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
            </pageNavigationPluginInstance.GoToNextPage>
          </div>
          <div className="rpv-core__toolbar-right">
            <searchPluginInstance.Search>
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
            </searchPluginInstance.Search>
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
      {(showDiagnostics || enableDebugging) && (
        <div
          style={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid #ddd',
            padding: '10px',
            fontSize: 12,
            zIndex: 1000,
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            maxWidth: '400px'
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>Debug Info</div>
          <div>isLoading: {String(isLoading)}</div>
          <div>numPages: {numPages}</div>
          <div style={{ maxWidth: 380, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            url: {pdfUrl || '(empty)'}
          </div>
          {enableHighlighting && (
            <>
              <div style={{ marginTop: '8px', fontWeight: 500 }}>Highlights:</div>
              <div>Coordinate: {processedHighlights.length}</div>
              <div>Text: {textHighlights.length}</div>
              <div>Test: {testHighlights.length}</div>
            </>
          )}
          {error && <div style={{ color: 'red', marginTop: '8px' }}>error: {error}</div>}
        </div>
      )}
    </PDFViewerContainer>
  );
};

HybridPDFViewer.propTypes = {
  value: PropTypes.string,
  height: PropTypes.string,
  showToolbar: PropTypes.bool,
  showDiagnostics: PropTypes.bool,
  highlightProperty: PropTypes.string,
  textHighlightProperty: PropTypes.string,
  additionalHighlightProps: PropTypes.string,
  textHighlightJSON: PropTypes.string,
  testPxResultsJson: PropTypes.string,
  confidenceFilter: PropTypes.string,
  enableHighlighting: PropTypes.bool,
  enableDebugging: PropTypes.bool,
  getPConnect: PropTypes.func
};

HybridPDFViewer.defaultProps = {
  value: '',
  height: '600px',
  showToolbar: true,
  showDiagnostics: false,
  highlightProperty: 'highlights',
  textHighlightProperty: 'textHighlights',
  enableHighlighting: true,
  enableDebugging: false,
  getPConnect: undefined
};

export { HybridPDFViewer };
export default withConfiguration(HybridPDFViewer);
