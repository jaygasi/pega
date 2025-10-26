/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-use-before-define */

import { useEffect, useMemo, useState, useCallback } from 'react';

import { Viewer, Worker } from '@react-pdf-viewer/core';

import { highlightPlugin } from '@react-pdf-viewer/highlight';

import { searchPlugin } from '@react-pdf-viewer/search';

import { Flex, Status, Text, withConfiguration } from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';

import { logError } from './logger';

// Log that the module is being loaded
console.log('InteractivePDFAdvanced module loaded');

// PDF.js worker URL - now points to the file hosted in Pega's webwb
const WORKER_URL = './webwb/PDFWorkerMin.js';

// interface for props
interface InteractivePDFAdvancedProps extends PConnFieldProps {
  // Additional props specific to InteractivePDFAdvanced
  height?: string;
  pdfProperty?: string;
  textHighlightJSON?: string;
  coordinateHighlightJSON?: string;
  onSelectProperty?: string;
  searchPropRef?: string;
  enableSearch?: boolean;
  enableDebugging?: boolean;
  confidenceFilter?: string;
}

// Helper function to find text matches within a single text item
const findTextMatchesInItem = (itemText: string, searchText: string) => {
  const matches = [];
  const regex = new RegExp(searchText.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`), 'gi');
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(itemText)) !== null) {
    matches.push({
      startIndex: match.index,
      text: match[0]
    });
    if (match.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }
  }

  return matches;
};

// Helper function to calculate bounding box from a specific text item
const calculateBoundingBoxFromItem = (textItems: any[], itemIndex: number, charOffsetInItem: number, matchText: string, page: any, enableDebugging = false) => {
  const item = textItems[itemIndex];
  if (!item?.transform) return null;

  const [scaleX, , , scaleY, translateX, translateY] = item.transform;
  const fontSize = Math.hypot(scaleX, scaleY);

  // Get text item dimensions
  const itemWidth = item.width || (item.str.length * fontSize * 0.6);
  const itemHeight = item.height || (fontSize * 1.2);

  // Calculate character width for this specific item
  const avgCharWidth = itemWidth / item.str.length;

  // Calculate match position within the text item
  const matchStartX = translateX + (charOffsetInItem * avgCharWidth);
  const matchWidth = matchText.length * avgCharWidth;
  const matchEndX = matchStartX + matchWidth;

  // Ensure the match doesn't exceed the text item bounds
  const clampedStartX = Math.max(translateX, matchStartX);
  const clampedEndX = Math.min(translateX + itemWidth, matchEndX);
  const actualWidth = clampedEndX - clampedStartX;

  const viewport = page.getViewport({ scale: 1 });

  // Convert to viewport coordinates (0-1 range)
  const left = clampedStartX / viewport.width;
  const right = (clampedStartX + actualWidth) / viewport.width;
  const top = (viewport.height - translateY - itemHeight) / viewport.height;
  const bottom = (viewport.height - translateY) / viewport.height;

  // Add small padding for better visual alignment
  const padding = 0.001; // Reduced padding for more precision
  const paddedLeft = Math.max(0, left - padding);
  const paddedRight = Math.min(1, right + padding);
  const paddedTop = Math.max(0, top - padding);
  const paddedBottom = Math.min(1, bottom + padding);

  return {
    boundingBox: {
      left: Math.max(0, Math.min(1, paddedLeft)),
      top: Math.max(0, Math.min(1, paddedTop)),
      right: Math.max(0, Math.min(1, paddedRight)),
      bottom: Math.max(0, Math.min(1, paddedBottom))
    },
    debug: enableDebugging ? {
      matchText,
      itemIndex,
      charOffsetInItem,
      fontSize,
      itemWidth,
      itemHeight,
      translateX,
      translateY,
      matchStartX,
      matchEndX,
      clampedStartX,
      clampedEndX,
      actualWidth,
      padding,
      finalBounds: { left: paddedLeft, top: paddedTop, right: paddedRight, bottom: paddedBottom },
      viewportWidth: viewport.width,
      viewportHeight: viewport.height
    } : undefined
  };
};

// Helper function to search for text in PDF and calculate bounding boxes
const searchTextInPDF = async (pdfUrl: string, textSearchTerms: any[], enableDebugging: boolean) => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;

  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  const foundHighlights = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    // eslint-disable-next-line no-await-in-loop
    const highlights = await searchPageForTerms(pdf, pageNum, textSearchTerms, enableDebugging);
    foundHighlights.push(...highlights);
  }

  return foundHighlights;
};

// Helper function to search a single page with improved text matching
const searchPageForTerms = async (pdf: any, pageNum: number, textSearchTerms: any[], enableDebugging: boolean) => {
  const page = await pdf.getPage(pageNum);
  const textContent = await page.getTextContent();

  const highlights = [];

  for (const term of textSearchTerms) {
    // Search within each text item individually for better accuracy
    for (let itemIndex = 0; itemIndex < textContent.items.length; itemIndex += 1) {
      const item = textContent.items[itemIndex];
      if (!item.str) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const matches = findTextMatchesInItem(item.str, term.text);
      for (const match of matches) {
        const result = calculateBoundingBoxFromItem(textContent.items, itemIndex, match.startIndex, match.text, page, enableDebugging);
        if (result) {
          highlights.push({
            id: `${term.id}_${pageNum}_${itemIndex}_${match.startIndex}`,
            confidence: term.confidence,
            pageIndex: pageNum - 1,
            boundingBox: result.boundingBox,
            debug: result.debug
          });
        }
      }
    }
  }

  return highlights;
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
    try {
      const raw = pConnect.getValue(candidate);
      const base64 = coercePdfSource(raw);
      if (base64) {
        return base64;
      }
    } catch (error) {
      logError(`InteractivePDFAdvanced: error reading pdfProperty ${candidate}`, error);
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
      logError(`InteractivePDFAdvanced: error writing value to ${candidate}`, error);
    }
  }

  return false;
};

const InteractivePDFAdvanced = (props: InteractivePDFAdvancedProps) => {
  // Get the Pega connection object
  const { getPConnect, value = '' } = props;
  const pConnect = getPConnect?.();

  // Get config props from Pega (fall back to an empty object if unavailable)
  const configProps = (pConnect?.getConfigProps?.() ?? {}) as Partial<InteractivePDFAdvancedProps>;

  // Log all props received (always, not just when debugging is enabled)
  console.log('InteractivePDFAdvanced component received props:', Object.keys(props));
  console.log('InteractivePDFAdvanced full props:', props);
  console.log('InteractivePDFAdvanced configProps:', configProps);
  console.log('InteractivePDFAdvanced value prop:', value);

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
    console.log('InteractivePDFAdvanced: pdfProperty effect triggered', { value, pdfProperty });
  }, [value, pdfProperty]);
  const normalizedSelectPropRef = typeof onSelectProperty === 'string' ? onSelectProperty.trim() : '';
  const normalizedSearchPropRef = typeof searchPropRef === 'string' ? searchPropRef.trim() : '';

  const handleHighlightSelect = useCallback((highlightId: string) => {
    if (!normalizedSelectPropRef || !pConnect) {
      return;
    }

    const success = tryWriteValueToClipboard(pConnect, normalizedSelectPropRef, highlightId);

    if (!success) {
      logError(`InteractivePDFAdvanced: unable to write highlight selection '${highlightId}' to ${normalizedSelectPropRef}`);
    }
  }, [normalizedSelectPropRef, pConnect]);

  // Always log that component is being rendered (for debugging)
  console.log('InteractivePDFAdvanced component rendered.');

  useEffect(() => {
    if (!enableDebugging || !normalizedSearchPropRef || !pConnect || typeof pConnect.getValue !== 'function') {
      return;
    }

    try {
      const currentValue = pConnect.getValue(normalizedSearchPropRef);
      console.log('InteractivePDFAdvanced: current search property value', {
        property: normalizedSearchPropRef,
        currentValue
      });
    } catch (error) {
      logError(`InteractivePDFAdvanced: error reading search property ${normalizedSearchPropRef}`, error);
    }
  }, [enableDebugging, normalizedSearchPropRef, pConnect]);

  useEffect(() => {
    console.log('InteractivePDFAdvanced: PDF source resolution effect', { value, pdfProperty, pConnect });
    if (value && typeof value === 'string' && value.trim() !== '') {
      console.log('InteractivePDFAdvanced: using bound value property for PDF source', value);
      setResolvedPdfBase64(value);
      return;
    }

    const propRef = typeof pdfProperty === 'string' ? pdfProperty.trim() : '';
    console.log('InteractivePDFAdvanced: resolved propRef for pdfProperty', propRef);
    if (!propRef) {
      console.log('InteractivePDFAdvanced: no pdfProperty configured and bound value empty');
      setResolvedPdfBase64('');
      return;
    }

    if (!pConnect || typeof pConnect.getValue !== 'function') {
      console.log('InteractivePDFAdvanced: pConnect unavailable when attempting to read pdfProperty');
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
      console.log(`InteractivePDFAdvanced: attempt ${attempts} to resolve pdfProperty`, { candidate: propRef, resolved });

      if (resolved) {
        console.log(`InteractivePDFAdvanced: resolved pdfProperty '${propRef}' on attempt ${attempts}`, resolved);
        setResolvedPdfBase64(resolved);
        return;
      }

      if (attempts < maxAttempts) {
        setTimeout(attemptResolve, delayMs);
      } else {
        console.warn(`InteractivePDFAdvanced: unable to resolve pdfProperty '${propRef}' after ${attempts} attempts`);
      }
    };

    attemptResolve();

    return () => {
      cancelled = true;
    };
  }, [value, pdfProperty, pConnect, enableDebugging]);

  const pdfBase64 = resolvedPdfBase64;
  console.log('InteractivePDFAdvanced: final resolvedPdfBase64', pdfBase64 ? pdfBase64.substring(0, 100) : '[empty]');

  // This value could be a literal ("0.8") or a property reference (".MyFilter")
  const confidenceFilter = typeof rawConfidenceFilter === 'string'
    ? getResolvedValue(rawConfidenceFilter, getPConnect)
    : rawConfidenceFilter;

  // Debug logging for PDF processing
  console.log('InteractivePDFAdvanced PDF processing:', {
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
      highlights = highlights.filter(h => 
        h && 
        typeof h === 'object' && 
        h.boundingBox && 
        typeof h.pageIndex === 'number' &&
        typeof h.confidence === 'number'
      );
      
      // Filter by confidence
      if (confidenceFilter) {
        const minConfidence = Number.parseFloat(confidenceFilter);
        highlights = highlights.filter(h => h.confidence >= minConfidence);
      }
      
      return highlights;
    } catch (e) {
      logError('Error parsing coordinateHighlightJSON:', e);
      return [];
    }
  }, [rawCoordinateHighlightJSON, confidenceFilter]);

  // Process text highlights - extract text and confidence for searching
  const textSearchTerms = useMemo(() => {
    const source = typeof rawTextHighlightJSON === 'string'
      ? rawTextHighlightJSON
      : '';
    if (!source || source.trim() === '') return [];
    try {
      const parsed = JSON.parse(source.trim());
      let highlights = [];
      
      if (Array.isArray(parsed)) {
        highlights = parsed;
      } else if (parsed.textHighlights && Array.isArray(parsed.textHighlights)) {
        highlights = parsed.textHighlights;
      }
      
      // Filter out invalid highlights
      highlights = highlights.filter(h => 
        h && 
        typeof h === 'object' && 
        typeof h.text === 'string' && 
        h.text.trim() !== '' &&
        typeof h.confidence === 'number'
      );
      
      // Filter by confidence if specified
      if (confidenceFilter) {
        const minConfidence = Number.parseFloat(confidenceFilter);
        highlights = highlights.filter(h => h.confidence >= minConfidence);
      }
      
      return highlights.map(h => ({ text: h.text.trim(), confidence: h.confidence, id: h.id }));
    } catch (e) {
      logError('Error parsing textHighlightJSON:', e);
      return [];
    }
  }, [rawTextHighlightJSON, confidenceFilter]);

  // Convert base64 to blob URL
  const pdfUrl = useMemo(() => {
    console.log('InteractivePDFAdvanced: converting base64 to blob URL, pdfBase64 exists:', !!pdfBase64);
    if (!pdfBase64) {
      console.log('InteractivePDFAdvanced: No pdfBase64, returning null');
      return null;
    }
    try {
      console.log('InteractivePDFAdvanced: Starting base64 conversion...');

      // This will handle "data:application/pdf;base64," prefixes,
      // whitespace, or other junk, regardless of which property it came from.
      let cleanBase64 = pdfBase64.trim();
      const prefixIndex = cleanBase64.indexOf(',');
      if (prefixIndex > -1) {
        cleanBase64 = cleanBase64.substring(prefixIndex + 1);
      }
      // This handles base64 strings that are broken into multiple lines
      cleanBase64 = cleanBase64.replaceAll(/\s/g, '');
      console.log('InteractivePDFAdvanced: cleaned base64 length', cleanBase64.length);

      const byteCharacters = atob(cleanBase64); // Use the cleaned string
      console.log('InteractivePDFAdvanced: Decoded base64, length:', byteCharacters.length);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.codePointAt(i) || 0;
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      console.log('InteractivePDFAdvanced: Created blob URL:', `${blobUrl.substring(0, 50)}...`);
      return blobUrl;
    } catch (e) {
      console.error('InteractivePDFAdvanced: Error converting base64 to blob:', e);
      logError('InteractivePDFAdvanced: Error converting base64 to blob:', e);
      if (enableDebugging) {
        console.error('InteractivePDFAdvanced: PDF conversion error:', e);
      }
      return null;
    }
  }, [pdfBase64, enableDebugging]); // 'pdfBase64' is now the correctly resolved string

  // State for found text highlights with bounding boxes
  const [foundTextHighlights, setFoundTextHighlights] = useState([]);

  // Search for text in PDF and get bounding boxes
  useEffect(() => {
    if (!pdfUrl || textSearchTerms.length === 0) {
      setFoundTextHighlights([]);
      return;
    }

    // Clear previous results
    setFoundTextHighlights([]);

    // Asynchronous text search - doesn't block PDF loading
    const performTextSearch = async () => {
      try {
    const foundHighlights = await searchTextInPDF(pdfUrl, textSearchTerms, enableDebugging);
        setFoundTextHighlights(foundHighlights);
      } catch (error) {
        logError('Error performing text search:', error);
        setFoundTextHighlights([]);
      }
    };

    // Start the search asynchronously
    performTextSearch();

  }, [pdfUrl, textSearchTerms]);

  // Initialize plugins
  const highlightPluginInstance = highlightPlugin({
    renderHighlights: (renderProps) => (
      <div>
        {processedHighlights.map((highlight) => {
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
  console.log('InteractivePDFAdvanced render decision:', {
    hasPdfUrl: !!pdfUrl,
    pdfUrl: pdfUrl ? `${pdfUrl.substring(0, 50)}...` : 'null',
    willShowNoPdfMessage: !pdfUrl
  });

  if (!pdfUrl) {
    return (
      <Flex container={{ direction: 'column', alignItems: 'center', justify: 'center' }} style={{ height }}>
        <Status variant="info">No PDF to display</Status>
      </Flex>
    );
  }

  return (
    <div style={{ height, border: '1px solid #ccc' }}>
      <Worker workerUrl={WORKER_URL}>
        <Viewer
          fileUrl={pdfUrl}
          plugins={plugins}
          onDocumentLoad={(e) => {
            if (enableDebugging) {
              console.log('PDF document loaded successfully:', e);
            }
          }}
        />
      </Worker>
      {enableDebugging && (
        <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ccc' }}>
          <Text variant="h6">Debug Information</Text>
          <Text>Coordinate Highlights: {processedHighlights.length}</Text>
          <Text>Text Highlights: {foundTextHighlights.length}</Text>
          {foundTextHighlights.some(h => h.debug) && (
            <div style={{ marginTop: 8 }}>
              <Text variant="h6" style={{ fontSize: 12 }}>Debug Info (First Highlight):</Text>
              {foundTextHighlights.find(h => h.debug) && (
                <div style={{ fontSize: 11, fontFamily: 'monospace' }}>
                  <div>Match: &quot;{foundTextHighlights.find(h => h.debug)?.debug?.matchText}&quot;</div>
                  <div>Item Index: {foundTextHighlights.find(h => h.debug)?.debug?.itemIndex}</div>
                  <div>Char Offset: {foundTextHighlights.find(h => h.debug)?.debug?.charOffsetInItem}</div>
                  <div>Font Size: {foundTextHighlights.find(h => h.debug)?.debug?.fontSize?.toFixed(2)}</div>
                  <div>Item W×H: {foundTextHighlights.find(h => h.debug)?.debug?.itemWidth?.toFixed(1)}×{foundTextHighlights.find(h => h.debug)?.debug?.itemHeight?.toFixed(1)}</div>
                  <div>Translate X/Y: {foundTextHighlights.find(h => h.debug)?.debug?.translateX?.toFixed(1)}, {foundTextHighlights.find(h => h.debug)?.debug?.translateY?.toFixed(1)}</div>
                  <div>Match X Range: {foundTextHighlights.find(h => h.debug)?.debug?.matchStartX?.toFixed(1)} - {foundTextHighlights.find(h => h.debug)?.debug?.matchEndX?.toFixed(1)}</div>
                  <div>Clamped X Range: {foundTextHighlights.find(h => h.debug)?.debug?.clampedStartX?.toFixed(1)} - {foundTextHighlights.find(h => h.debug)?.debug?.clampedEndX?.toFixed(1)}</div>
                  <div>Actual Width: {foundTextHighlights.find(h => h.debug)?.debug?.actualWidth?.toFixed(1)}</div>
                  <div>Padding: {foundTextHighlights.find(h => h.debug)?.debug?.padding}</div>
                  <div>Final Bounds: L{foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.left?.toFixed(3)} T{foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.top?.toFixed(3)} R{foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.right?.toFixed(3)} B{foundTextHighlights.find(h => h.debug)?.debug?.finalBounds?.bottom?.toFixed(3)}</div>
                  <div>Viewport: {foundTextHighlights.find(h => h.debug)?.debug?.viewportWidth?.toFixed(0)}×{foundTextHighlights.find(h => h.debug)?.debug?.viewportHeight?.toFixed(0)}</div>
                </div>
              )}
            </div>
          )}
          <Text>Confidence Filter: {confidenceFilter || 'None'}</Text>
        </div>
      )}
    </div>
  );
};

// Log that the component is being exported
console.log('InteractivePDFAdvanced component exported with withConfiguration');

export default withConfiguration(InteractivePDFAdvanced);
