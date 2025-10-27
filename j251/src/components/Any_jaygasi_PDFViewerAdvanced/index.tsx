// @ts-nocheck

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { searchPlugin } from '@react-pdf-viewer/search';
import { Flex, Status, Text, withConfiguration } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import { logError } from './logger';

// Log that the module is being loaded
console.log('PDFViewerAdvanced module loaded');

// Type definitions for Pega connect props
interface PConnProps {
  getPConnect?: () => any;
  value?: string;
}

// Types for highlight results after processing
interface TextHighlight {
  id: string;
  pageIndex: number;
  boundingBox: BoundingBox;
  confidence: number;
  debug?: DebugInfo;
}

// Props interface for the component
interface PDFViewerAdvancedProps extends Props, PConnProps {
  // Additional props specific to the PDFViewerAdvanced component
  height?: string;
  enableSearch?: boolean;
  pdfProperty?: string;
  coordinateHighlightJSON?: string;
  confidenceFilter?: string | number;
  onSelectProperty?: string;
  searchPropRef?: string;
}

interface Props {
  /** JSON string containing text highlights [{id, text, confidence}] */
  textHighlightJSON?: string;
  /** Debug mode flag */
  enableDebugging?: boolean;
}

// Type definitions for highlight objects
interface BoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface DebugInfo {
  [key: string]: any;
}

import { findTextInRenderedPages } from './TextHighlightSearch';

// Custom text layer renderer for proper font and positioning
// @ts-nocheck
const TextLayerWithFonts = (props) => {
  const { viewport, textContentSource } = props;
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const render = async () => {
      const textContent = await textContentSource.promise;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';

        for (const item of textContent.items) {
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

          for (const key of Object.keys(style)) {
            textSpan.style[key] = style[key];
          }

          textSpan.textContent = item.str;
          containerRef.current.appendChild(textSpan);
        }
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

// Helper function to resolve Pega property references
// This lets props like 'confidenceFilter' be a literal ("0.8") or a property (".MyFilter")
const getResolvedValue = (value: string, getPConnect: () => any) => {
  if (typeof value === 'string' && value.startsWith('.')) {
    // It's a property reference, resolve it
    const pConnect = getPConnect();
    if (pConnect && typeof pConnect.getValue === 'function') {
      return pConnect.getValue(value);
    }
    logError('getPConnect().getValue is not available to resolve property', value);
    return value;
  }
  // It's a literal value
  return value;
};

const ensureLeadingDot = (propRef: string) => {
  if (!propRef) return propRef;
  return propRef.startsWith('.') ? propRef : `.${propRef}`;
};

const coercePdfSource = (raw: unknown): string => {
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object') {
    const candidate = (raw as Record<string, unknown>).pyFileSource
      ?? (raw as Record<string, unknown>).pyStream
      ?? (raw as Record<string, unknown>).pyBinaryStream
      ?? (raw as Record<string, unknown>).pyBase64
      ?? (raw as Record<string, unknown>).value;
    if (typeof candidate === 'string') {
      return candidate;
    }
  }
  return '';
};

const tryReadPdfFromClipboard = (pConnect: any, propRef: string): string => {
  if (!pConnect || typeof pConnect.getValue !== 'function' || !propRef) {
    return '';
  }

  const trimmed = propRef.trim();
  const candidates = [trimmed];

  // Try the alternate dot/no-dot form as well in case the author configured either style
  if (trimmed.startsWith('.')) {
    candidates.push(trimmed.slice(1));
  } else {
    candidates.push(ensureLeadingDot(trimmed));
  }

  for (const candidate of candidates) {
    let raw;
    try {
      raw = pConnect.getValue(candidate);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError(new Error(`Failed to read PDF property: ${errorMessage}`), 
        `PDFViewerAdvanced: error reading pdfProperty ${candidate}`);
      continue;
    }
    const base64 = coercePdfSource(raw);
    if (base64) {
      return base64;
    }
  }

  return '';
};

const tryWriteValueToClipboard = (pConnect: any, propRef: string, newValue: unknown): boolean => {
  if (!pConnect || typeof pConnect.setValue !== 'function' || !propRef) {
    return false;
  }

  const trimmed = propRef.trim();
  if (!trimmed) {
    return false;
  }

  const rawCandidates = trimmed.startsWith('.')
    ? [trimmed, trimmed.slice(1)]
    : [trimmed, ensureLeadingDot(trimmed)];
  const candidates = Array.from(new Set(rawCandidates.filter(Boolean)));

  for (const candidate of candidates) {
    try {
      pConnect.setValue(candidate, newValue, newValue);
      return true;
    } catch (error) {
      logError(error, `PDFViewerAdvanced: error writing value to ${candidate}`);
    }
  }

  return false;
};

const PDFViewerAdvanced = (props: PDFViewerAdvancedProps) => {
  // Get the Pega connection object
  const { getPConnect, value = '' } = props;
  
  const [workerUrl, setWorkerUrl] = useState<string | null>(null);

  const getWorkerCandidates = (publicPath: string): string[] => {
    const normalizedPublicPath = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;
    const pdfjsVersion = '3.11.174';
    const candidates = [
      publicPath ? `${normalizedPublicPath}webwb/PDFWorkerMin.js` : null,
      '/prweb/webwb/PDFWorkerMin.js',
      `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`
    ].filter(Boolean) as string[];

    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
      const localWorker = new URL('../shared/pdf.worker.min.js', import.meta.url).toString();
      candidates.unshift(localWorker);
    }

    return candidates;
  };

  const validateWorkerUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`PDFViewerAdvanced: Worker check failed for candidate URL: ${url}. Error: ${errorMessage}`);
      return false;
    }
  };

  useEffect(() => {
    const findWorker = async () => {
      const connect: any = getPConnect?.();
      const envInfo = connect && typeof connect.getEnvironmentInfo === 'function' ? connect.getEnvironmentInfo() : undefined;
      const publicPath = envInfo && typeof envInfo.getPublicPath === 'function' ? envInfo.getPublicPath() : '';

      const candidates = getWorkerCandidates(publicPath);

      for (const url of candidates) {
        if (await validateWorkerUrl(url)) {
          console.log(`PDFViewerAdvanced: Successfully validated worker script at: ${url}`);
          setWorkerUrl(url);
          return;
        }
      }

      console.error(
        'PDFViewerAdvanced: FATAL - Could not find a valid PDF.js worker script. PDF functionality will be disabled. Searched paths:',
        candidates
      );
    };

    findWorker();
  }, [getPConnect]);

  const pConnect = getPConnect?.(); // This is the main `pConnect` for the component
  
  // Get config props from Pega (fall back to an empty object if unavailable)
  const configProps = (pConnect?.getConfigProps?.() ?? {}) as Partial<PDFViewerAdvancedProps>;

  // Log all props received (always, not just when debugging is enabled)
  console.log('PDFViewerAdvanced component received props:', Object.keys(props));
  console.log('PDFViewerAdvanced full props:', props);
  console.log('PDFViewerAdvanced configProps:', configProps);
  console.log('PDFViewerAdvanced value prop:', value);

  const height = configProps.height ?? props.height ?? '600px';
  const rawTextHighlightJSON = configProps.textHighlightJSON ?? props.textHighlightJSON;
  const rawCoordinateHighlightJSON = configProps.coordinateHighlightJSON ?? props.coordinateHighlightJSON;
  const enableSearch = typeof configProps.enableSearch === 'boolean' ? configProps.enableSearch : props.enableSearch ?? false;
  const enableDebugging = typeof configProps.enableDebugging === 'boolean' ? configProps.enableDebugging : props.enableDebugging ?? false;
  const pdfProperty = configProps.pdfProperty ?? props.pdfProperty;
  const onSelectProperty = configProps.onSelectProperty ?? props.onSelectProperty;
  const searchPropRef = configProps.searchPropRef ?? props.searchPropRef;
  const rawConfidenceFilter = configProps.confidenceFilter ?? props.confidenceFilter;

  const [resolvedPdfBase64, setResolvedPdfBase64] = useState<string>(value || '');
  useEffect(() => {
    console.log('PDFViewerAdvanced: pdfProperty effect triggered', { value, pdfProperty });
  }, [value, pdfProperty]);
  const normalizedSelectPropRef = typeof onSelectProperty === 'string' ? onSelectProperty.trim() : '';
  const normalizedSearchPropRef = typeof searchPropRef === 'string' ? searchPropRef.trim() : '';

  const handleHighlightSelect = useCallback((highlightId: string) => {
    if (!normalizedSelectPropRef || !pConnect) {
      return;
    }

    const success = tryWriteValueToClipboard(pConnect, normalizedSelectPropRef, highlightId);

    if (!success) {
      logError(`PDFViewerAdvanced: unable to write highlight selection '${highlightId}' to ${normalizedSelectPropRef}`);
    }
  }, [normalizedSelectPropRef, pConnect]);

  // Always log that component is being rendered (for debugging)
  console.log('PDFViewerAdvanced component rendered.');

  useEffect(() => {
    if (!enableDebugging || !normalizedSearchPropRef || !pConnect || typeof pConnect.getValue !== 'function') {
      return;
    }

    try {
      const currentValue = pConnect.getValue(normalizedSearchPropRef);
      console.log('PDFViewerAdvanced: current search property value', {
        property: normalizedSearchPropRef,
        currentValue
      });
    } catch (error) {
      logError(error, `PDFViewerAdvanced: error reading search property ${normalizedSearchPropRef}`);
    }
  }, [enableDebugging, normalizedSearchPropRef, pConnect]);

  useEffect(() => {
    console.log('PDFViewerAdvanced: PDF source resolution effect', { value, pdfProperty, pConnect });
    if (value && typeof value === 'string' && value.trim() !== '') {
      console.log('PDFViewerAdvanced: using bound value property for PDF source', value);
      setResolvedPdfBase64(value);
      return;
    }

    const propRef = typeof pdfProperty === 'string' ? pdfProperty.trim() : '';
    console.log('PDFViewerAdvanced: resolved propRef for pdfProperty', propRef);
    if (!propRef) {
      console.log('PDFViewerAdvanced: no pdfProperty configured and bound value empty');
      setResolvedPdfBase64('');
      return;
    }

    if (!pConnect || typeof pConnect.getValue !== 'function') {
      console.log('PDFViewerAdvanced: pConnect unavailable when attempting to read pdfProperty');
      return;
    }

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 6;
    const delayMs = 250;

    const attemptResolve = () => {
      if (cancelled) return;
      attempts += 1;
      const resolved = tryReadPdfFromClipboard(pConnect, propRef);
      console.log(`PDFViewerAdvanced: attempt ${attempts} to resolve pdfProperty`, { candidate: propRef, resolved });

      if (resolved) {
        console.log(`PDFViewerAdvanced: resolved pdfProperty '${propRef}' on attempt ${attempts}`, resolved);
        setResolvedPdfBase64(resolved);
        return;
      }

      if (attempts < maxAttempts) {
        setTimeout(attemptResolve, delayMs);
      } else {
        console.warn(`PDFViewerAdvanced: unable to resolve pdfProperty '${propRef}' after ${attempts} attempts`);
      }
    };

    attemptResolve();

    return () => {
      cancelled = true;
    };
  }, [value, pdfProperty, pConnect, enableDebugging]);

  const pdfBase64 = resolvedPdfBase64;
  console.log('PDFViewerAdvanced: final resolvedPdfBase64', pdfBase64 ? pdfBase64.substring(0, 100) : '[empty]');

  // This value could be a literal ("0.8") or a property reference (".MyFilter")
  const confidenceFilter = typeof rawConfidenceFilter === 'string' && getPConnect
    ? getResolvedValue(rawConfidenceFilter, () => getPConnect())
    : rawConfidenceFilter;

  // Debug logging for PDF processing
  console.log('PDFViewerAdvanced PDF processing:', {
    pdfBase64: pdfBase64 ? `${pdfBase64.substring(0, 50)}...` : 'null/empty',
    pdfBase64Length: pdfBase64?.length || 0,
    pdfPropertyConfig: pdfProperty || 'not set',
    confidenceFilterResolved: confidenceFilter
  });

  // Process coordinate highlights
  const processedHighlights = useMemo(() => {
    const source = typeof rawCoordinateHighlightJSON === 'string'
      ? rawCoordinateHighlightJSON
      : '';
    if (!source || source.trim() === '') return [];
    try {
      const parsed = JSON.parse(source.trim());
      let highlights = Array.isArray(parsed) ? parsed : parsed.pxResults || [];
      
      // Filter out invalid highlights and ensure they have required properties
      highlights = highlights.filter((h: any) => 
        h && 
        typeof h === 'object' && 
        h.boundingBox && 
        typeof h.pageIndex === 'number' &&
        typeof h.confidence === 'number'
      );
      
      // Filter by confidence
      if (confidenceFilter) {
        const minConfidence = Number.parseFloat(confidenceFilter as string);
        highlights = highlights.filter((h: any) => h.confidence >= minConfidence);
      }
      
      return highlights;
    } catch (e) {
      logError(e, 'Error parsing coordinateHighlightJSON:');
      return [];
    }
  }, [rawCoordinateHighlightJSON, confidenceFilter]);

  // Process text highlights - extract text and confidence for searching
  const textSearchTerms = useMemo(() => {
    const source = typeof rawTextHighlightJSON === 'string'
      ? rawTextHighlightJSON
      : '';
    
    console.log('Processing text highlights from JSON:', {
      rawJSON: source,
      enableDebugging
    });
    
    if (!source || source.trim() === '') {
      console.log('No text highlight JSON provided');
      return [];
    }
    
    try {
      const parsed = JSON.parse(source.trim());
      console.log('Parsed highlight JSON:', parsed);
      
      let highlights = [];
      
      if (Array.isArray(parsed)) {
        highlights = parsed;
      } else if (parsed.textHighlights && Array.isArray(parsed.textHighlights)) {
        highlights = parsed.textHighlights;
      }
      
      console.log('Initial highlights array:', highlights);
      
      // Filter out invalid highlights
      highlights = highlights.filter((h: any) => {
        const isValid = h && 
          typeof h === 'object' && 
          typeof h.text === 'string' && 
          h.text.trim() !== '' &&
          typeof h.confidence === 'number';
          
        if (!isValid && enableDebugging) {
          console.log('Invalid highlight entry:', h);
        }
        
        return isValid;
      });
      
      console.log('Valid highlights after filtering:', highlights);
      
      // Filter by confidence if specified
      if (confidenceFilter) {
        const minConfidence = Number.parseFloat(confidenceFilter as string);
        console.log('Applying confidence filter:', minConfidence);
        
        highlights = highlights.filter((h: any) => {
          const passes = h.confidence >= minConfidence;
          if (!passes && enableDebugging) {
            console.log('Highlight filtered out by confidence:', h);
          }
          return passes;
        });
      }
      
      const result = highlights.map((h: any) => ({ 
        text: h.text.trim(), 
        confidence: h.confidence, 
        id: h.id 
      }));
      
      console.log('Final processed highlights:', result);
      
      return result;
    } catch (e) {
      console.error('Error processing text highlights:', e);
      logError(e, 'Error parsing textHighlightJSON:');
      return [];
    }
  }, [rawTextHighlightJSON, confidenceFilter, enableDebugging]);

  // Convert base64 payloads into a blob URL so pdf.js never hits the network with long query strings
  // Also handle URLs that Pega might provide instead of base64 data
  const pdfUrl = useMemo(() => {
    if (!pdfBase64) {
      return null;
    }

    try {
      // If it's already a blob URL, return as-is
      if (pdfBase64.startsWith('blob:')) {
        return pdfBase64;
      }

      // If it's an HTTP/HTTPS URL, try to fetch it to avoid CORS issues
      if (pdfBase64.startsWith('http://') || pdfBase64.startsWith('https://')) {
        if (enableDebugging) {
          console.log('PDFViewerAdvanced: Processing external URL:', pdfBase64);
        }
        // For now, return the URL directly - PDF.js can handle external URLs
        // In a production environment, you might want to proxy this through Pega
        return pdfBase64;
      }

      // If it's base64 data, convert to blob URL
      if (typeof Blob === 'undefined' || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
        throw new TypeError('Required browser APIs for Blob handling are unavailable');
      }

      const trimmed = pdfBase64.trim();
      if (!trimmed) {
        return null;
      }

      const base64Part = trimmed.startsWith('data:') ? trimmed.slice(trimmed.indexOf(',') + 1) : trimmed;
      const cleaned = base64Part.replaceAll(/\s+/g, '');

      const globalObject: any = typeof globalThis === 'undefined' ? undefined : globalThis;
      const atobFn = globalObject?.atob as ((input: string) => string) | undefined;
      const bufferClass = globalObject?.Buffer as { from: (input: string, encoding: string) => { toString: (enc: string) => string } } | undefined;

      const decodeBase64 = (input: string) => {
        if (typeof atobFn === 'function') {
          return atobFn(input);
        }
        if (bufferClass && typeof bufferClass.from === 'function') {
          return bufferClass.from(input, 'base64').toString('binary');
        }
        throw new Error('No base64 decoder available');
      };

      const binary = decodeBase64(cleaned);
      const length = binary.length;
      const byteArray = new Uint8Array(length);
      for (let i = 0; i < length; i += 1) {
        byteArray[i] = (binary.codePointAt(i) ?? 0) & 0xff;
      }

      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      if (enableDebugging) {
        console.log('PDFViewerAdvanced: Created blob URL:', `${blobUrl.substring(0, 50)}...`);
      }
      return blobUrl;
    } catch (error) {
      logError(error, 'PDFViewerAdvanced: Error processing PDF source:');
      if (enableDebugging) {
        console.error('PDFViewerAdvanced: PDF processing error:', error);
      }
      return null;
    }
  }, [pdfBase64, enableDebugging]);

  // State for found text highlights with bounding boxes
  const [foundTextHighlights, setFoundTextHighlights] = useState<TextHighlight[]>([]);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  // Search for text in rendered PDF pages using DOM
  useEffect(() => {
    if (!pdfUrl || textSearchTerms.length === 0 || !pdfLoaded) {
      setFoundTextHighlights([]);
      return;
    }

    // Clear previous results
    setFoundTextHighlights([]);

    if (enableDebugging) {
      console.log('Starting text search for terms:', textSearchTerms);
    }

    // Wait for PDF to load and text layers to render, then search
    const performTextSearch = async () => {
      try {
        // Use DOM-based search that works with the rendered text layer
        const foundHighlights = await findTextInRenderedPages(textSearchTerms);
        
        if (enableDebugging) {
          console.log('Text search complete. Found highlights:', foundHighlights);
        }
        
        setFoundTextHighlights(foundHighlights);
      } catch (error) {
        console.error('Error performing text search:', error);
        logError(error, 'Error performing text search:');
        setFoundTextHighlights([]);
      }
    };

    // Delay search to allow text layers to fully render after PDF loads
    const timeoutId = setTimeout(performTextSearch, 1500);

    return () => clearTimeout(timeoutId);
  }, [pdfUrl, textSearchTerms, enableDebugging, pdfLoaded]);

  // Initialize plugins
  const highlightPluginInstance = highlightPlugin({
    renderHighlights: (renderProps) => (
      <div>
        {processedHighlights.map((highlight: TextHighlight) => {
          const { pageIndex, boundingBox } = highlight;
          if (pageIndex !== renderProps.pageIndex) return null;

          return (
            <button
              key={highlight.id}
              type="button"
              onClick={() => handleHighlightSelect(highlight.id)}
              disabled={!normalizedSelectPropRef}
              style={{
                position: 'absolute',
                left: `${boundingBox.left * 100}%`,
                top: `${boundingBox.top * 100}%`,
                width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                backgroundColor: 'rgba(255, 255, 0, 0.3)',
                border: '1px solid #ff0',
                pointerEvents: normalizedSelectPropRef ? 'auto' : 'none',
                cursor: normalizedSelectPropRef ? 'pointer' : 'default',
                opacity: normalizedSelectPropRef ? 1 : 0.7,
                zIndex: 1,
              }}
              aria-label={`Select highlight ${highlight.id}`}
            />
          );
        })}
        {foundTextHighlights.map((highlight) => {
          const { pageIndex, boundingBox } = highlight;
          if (pageIndex !== renderProps.pageIndex) return null;

          return (
            <button
              key={highlight.id}
              type="button"
              onClick={() => handleHighlightSelect(highlight.id)}
              disabled={!normalizedSelectPropRef}
              style={{
                position: 'absolute',
                left: `${boundingBox.left * 100}%`,
                top: `${boundingBox.top * 100}%`,
                width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
                border: '1px solid #0f0',
                pointerEvents: normalizedSelectPropRef ? 'auto' : 'none',
                cursor: normalizedSelectPropRef ? 'pointer' : 'default',
                opacity: normalizedSelectPropRef ? 1 : 0.7,
                zIndex: 3,
              }}
              aria-label={`Select highlight ${highlight.id}`}
            />
          );
        })}
      </div>
    ),
  });

  const searchPluginInstance = searchPlugin();

  const plugins = useMemo(() => {
    const pluginList: any[] = [highlightPluginInstance];
    if (enableSearch) {
      pluginList.push(searchPluginInstance);
    }
    return pluginList;
  }, [highlightPluginInstance, searchPluginInstance, enableSearch]);

  // Cleanup blob URL
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  // Log the final decision
  console.log('PDFViewerAdvanced render decision:', {
    hasPdfUrl: !!pdfUrl,
    pdfUrl: pdfUrl ? `${pdfUrl.substring(0, 50)}...` : 'null',
    willShowNoPdfMessage: !pdfUrl
  });

  if (!pdfUrl || !workerUrl) {
    let statusMessage = '';
    if (pdfUrl === null) {
      statusMessage = 'No PDF to display.';
    } else if (workerUrl === null) {
      statusMessage = 'PDF Worker not found.';
    }

    return (
      <Flex container={{ direction: 'column', alignItems: 'center', justify: 'center' }} style={{ height }}>
        <Status variant="info">
          {statusMessage}
        </Status>
      </Flex>
    );
  }

  return (
    <div style={{ height, border: '1px solid #ccc' }}>
      <Worker workerUrl={workerUrl}>
        <Viewer
          fileUrl={pdfUrl}
          plugins={plugins}
          defaultScale={SpecialZoomLevel.PageWidth}
          onDocumentLoad={(e) => {
            setPdfLoaded(true);
            if (enableDebugging) {
              console.log('PDF document loaded successfully:', {
                numPages: e.doc?.numPages
              });
              console.log('Text search terms to highlight:', textSearchTerms);
            }
          }}
          renderTextLayer={renderTextLayerWithFonts}
        />
      </Worker>
      {enableDebugging && (
        <div style={{ padding: '10px', backgroundColor: '#f5f5ff', borderTop: '1px solid #ccc' }}>
          <Text variant="h6">Debug Information</Text>
          <Text>Coordinate Highlights: {processedHighlights.length}</Text>
          <Text>Text Highlights Found: {foundTextHighlights.length}</Text>
          <Text>Search Terms: {textSearchTerms.length}</Text>
          {textSearchTerms.length > 0 && (
            <div style={{ fontSize: 11, marginTop: 4 }}>
              Terms: {textSearchTerms.map((t: any) => `"${t.text}"`).join(', ')}
            </div>
          )}
          {foundTextHighlights.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <Text variant="h6" style={{ fontSize: 12 }}>Found Highlights:</Text>
              <div style={{ fontSize: 11, fontFamily: 'monospace', maxHeight: '200px', overflow: 'auto' }}>
                {foundTextHighlights.map((h, idx) => (
                  <div key={h.id} style={{ marginBottom: 4, borderBottom: '1px solid #ddd', paddingBottom: 2 }}>
                    <div>#{idx + 1}: {h.id} (confidence: {h.confidence})</div>
                    <div>Page: {h.pageIndex}, Box: L{h.boundingBox.left.toFixed(3)} T{h.boundingBox.top.toFixed(3)} R{h.boundingBox.right.toFixed(3)} B{h.boundingBox.bottom.toFixed(3)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Text>Confidence Filter: {confidenceFilter !== null && confidenceFilter !== undefined ? String(confidenceFilter) : 'None'}</Text>
        </div>
      )}
    </div>
  );
};

// Log that the component is being exported
console.log('PDFViewerAdvanced component exported with withConfiguration');

export default withConfiguration(PDFViewerAdvanced);