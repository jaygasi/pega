/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useMemo, useState } from 'react';

import { Viewer, Worker } from '@react-pdf-viewer/core';

import { highlightPlugin } from '@react-pdf-viewer/highlight';

import { searchPlugin } from '@react-pdf-viewer/search';

import { Flex, Status, Text } from '@pega/cosmos-react-core';

import { logError } from './logger';

// PDF.js worker URL
const WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

// Helper function to search for text in PDF and calculate bounding boxes
const searchTextInPDF = async (pdfUrl: string, textSearchTerms: any[], enableDebugging: boolean) => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;

  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  const foundHighlights = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const highlights = await searchPageForTerms(pdf, pageNum, textSearchTerms, enableDebugging);
    foundHighlights.push(...highlights);
  }

  return foundHighlights;
};

// Helper function to search a single page
const searchPageForTerms = async (pdf: any, pageNum: number, textSearchTerms: any[], enableDebugging: boolean) => {
  const page = await pdf.getPage(pageNum);
  const textContent = await page.getTextContent();
  
  const pageText = textContent.items
    .filter((item): item is any => 'str' in item)
    .map(item => item.str)
    .join(' ');
  
  const highlights = [];

  for (const term of textSearchTerms) {
    const matches = findTextMatches(pageText, term.text);
    for (const match of matches) {
      const result = calculateBoundingBox(textContent.items, match.index, match.text, page, enableDebugging);
      if (result) {
        highlights.push({
          id: `${term.id}_${pageNum}_${match.index}`,
          confidence: term.confidence,
          pageIndex: pageNum - 1,
          boundingBox: result.boundingBox,
          debug: result.debug
        });
      }
    }
  }

  return highlights;
};

// Helper function to find text matches
const findTextMatches = (pageText: string, searchText: string) => {
  const regex = new RegExp(searchText.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`), 'gi');
  const matches = [];
  let match;
  
  while ((match = regex.exec(pageText)) !== null) {
    matches.push({ index: match.index, text: match[0] });
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
  }
  
  return matches;
};

// Helper function to calculate bounding box with improved precision
const calculateBoundingBox = (textItems: any[], matchIndex: number, matchText: string, page: any, enableDebugging = false) => {
  let charIndex = 0;
  let foundItem = null;
  let charOffsetInItem = 0;
  let matchSpansMultipleItems = false;
  let endItem = null;
  let endCharOffset = 0;

  // Find the text item containing the match start
  for (const item of textItems) {
    if ('str' in item) {
      const itemEndIndex = charIndex + item.str.length;
      if (matchIndex >= charIndex && matchIndex < itemEndIndex) {
        foundItem = item;
        charOffsetInItem = matchIndex - charIndex;

        // Check if match spans multiple items
        const matchEndIndex = matchIndex + matchText.length;
        if (matchEndIndex > itemEndIndex) {
          matchSpansMultipleItems = true;
          // Find the end item
          let tempCharIndex = charIndex;
          for (const endItemCandidate of textItems) {
            if ('str' in endItemCandidate) {
              const endItemEndIndex = tempCharIndex + endItemCandidate.str.length;
              if (matchEndIndex <= endItemEndIndex) {
                endItem = endItemCandidate;
                endCharOffset = matchEndIndex - tempCharIndex;
                break;
              }
              tempCharIndex = endItemEndIndex + 1;
            }
          }
        }
        break;
      }
      charIndex = itemEndIndex + 1; // +1 for space
    }
  }

  if (!foundItem?.transform) return null;

  const [scaleX, , , scaleY, translateX, translateY] = foundItem.transform;
  const fontSize = Math.hypot(scaleX, scaleY);

  // Get text item dimensions
  const itemWidth = foundItem.width || (foundItem.str.length * fontSize * 0.6);
  const itemHeight = foundItem.height || (fontSize * 1.2);

  let matchStartX = translateX;
  let matchEndX = translateX + itemWidth;
  let matchTopY = translateY;
  let matchBottomY = translateY + itemHeight;

  if (matchSpansMultipleItems && endItem?.transform) {
    // Handle multi-item spans
    const [endScaleX, , , endScaleY, endTranslateX, endTranslateY] = endItem.transform;
    const endItemWidth = endItem.width || (endItem.str.length * Math.hypot(endScaleX, endScaleY) * 0.6);
    const endItemHeight = endItem.height || (Math.hypot(endScaleX, endScaleY) * 1.2);

    matchStartX = translateX + (charOffsetInItem * (itemWidth / foundItem.str.length));
    matchEndX = endTranslateX + (endCharOffset * (endItemWidth / endItem.str.length));
    matchTopY = Math.min(translateY, endTranslateY);
    matchBottomY = Math.max(translateY + itemHeight, endTranslateY + endItemHeight);
  } else {
    // Single item match - use precise positioning
    const avgCharWidth = itemWidth / foundItem.str.length;
    const startOffset = charOffsetInItem * avgCharWidth;
    const matchWidth = matchText.length * avgCharWidth;

    matchStartX = translateX + startOffset;
    matchEndX = matchStartX + matchWidth;

    // Ensure bounds are within the text item
    matchStartX = Math.max(translateX, Math.min(matchStartX, translateX + itemWidth - matchWidth));
    matchEndX = Math.min(translateX + itemWidth, matchEndX);
  }

  const viewport = page.getViewport({ scale: 1 });

  // Convert to viewport coordinates (0-1 range)
  const left = matchStartX / viewport.width;
  const right = matchEndX / viewport.width;
  const top = (viewport.height - matchBottomY) / viewport.height;
  const bottom = (viewport.height - matchTopY) / viewport.height;

  // Add small padding for better visual alignment (PDF text extraction can be slightly offset)
  const padding = 0.002; // 0.2% padding on each side
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
      charOffset: charOffsetInItem,
      fontSize,
      itemWidth,
      itemHeight,
      translateX,
      translateY,
      matchStartX,
      matchEndX,
      matchSpansMultipleItems,
      padding,
      finalBounds: { left: paddedLeft, top: paddedTop, right: paddedRight, bottom: paddedBottom },
      viewportWidth: viewport.width,
      viewportHeight: viewport.height
    } : undefined
  };
};const InteractivePDFAdvanced = ({
  getPConnect
}) => {
  const pConnect = getPConnect();
  const configProps = pConnect?.getConfigProps() || {};

  // Extract configuration with defaults
  const {
    pdfProperty = 'pdfBase64',
    textHighlightJSON,
    coordinateHighlightJSON,
    enableSearch = false,
    enableDebugging = false,
    confidenceFilter,
    height = '600px'
  } = configProps;

  // Read values from Pega clipboard
  const pdfBase64 = pConnect.getValue(pdfProperty);

  // Process coordinate highlights
  const processedHighlights = useMemo(() => {
    if (!coordinateHighlightJSON || coordinateHighlightJSON.trim() === '') return [];
    try {
      const parsed = JSON.parse(coordinateHighlightJSON.trim());
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
  }, [coordinateHighlightJSON, confidenceFilter]);

  // Process text highlights - extract text and confidence for searching
  const textSearchTerms = useMemo(() => {
    if (!textHighlightJSON || textHighlightJSON.trim() === '') return [];
    try {
      const parsed = JSON.parse(textHighlightJSON.trim());
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
  }, [textHighlightJSON, confidenceFilter]);

  // Convert base64 to blob URL
  const pdfUrl = useMemo(() => {
    if (!pdfBase64) return null;
    try {
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.codePointAt(i) || 0;
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    } catch (e) {
      logError('Error converting base64 to blob:', e);
      return null;
    }
  }, [pdfBase64]);

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
    renderHighlights: (props) => (
      <div>
        {processedHighlights.map((highlight, index) => {
          const { pageIndex, boundingBox } = highlight;
          if (pageIndex !== props.pageIndex) return null;

          return (
            <div
              key={`${pageIndex}-${boundingBox.left}-${boundingBox.top}-${index}`}
              style={{
                position: 'absolute',
                left: `${boundingBox.left * 100}%`,
                top: `${boundingBox.top * 100}%`,
                width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                backgroundColor: 'rgba(255, 255, 0, 0.3)',
                border: '1px solid #ff0',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          );
        })}
        {foundTextHighlights.map((highlight, index) => {
          const { pageIndex, boundingBox } = highlight;
          if (pageIndex !== props.pageIndex) return null;

          return (
            <div
              key={`text-${pageIndex}-${boundingBox.left}-${boundingBox.top}-${index}`}
              style={{
                position: 'absolute',
                left: `${boundingBox.left * 100}%`,
                top: `${boundingBox.top * 100}%`,
                width: `${(boundingBox.right - boundingBox.left) * 100}%`,
                height: `${(boundingBox.bottom - boundingBox.top) * 100}%`,
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
                border: '1px solid #0f0',
                pointerEvents: 'none',
                zIndex: 3,
              }}
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

  // Register component conditionally
  useEffect(() => {
    if (pConnect?.registerComponent) {
      pConnect.registerComponent('InteractivePDFAdvanced', InteractivePDFAdvanced);
    }
  }, [pConnect]);

  // Cleanup blob URL
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

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
                  <div>Match: "{foundTextHighlights.find(h => h.debug)?.debug?.matchText}"</div>
                  <div>Char Offset: {foundTextHighlights.find(h => h.debug)?.debug?.charOffset}</div>
                  <div>Font Size: {foundTextHighlights.find(h => h.debug)?.debug?.fontSize?.toFixed(2)}</div>
                  <div>Item W×H: {foundTextHighlights.find(h => h.debug)?.debug?.itemWidth?.toFixed(1)}×{foundTextHighlights.find(h => h.debug)?.debug?.itemHeight?.toFixed(1)}</div>
                  <div>Translate X/Y: {foundTextHighlights.find(h => h.debug)?.debug?.translateX?.toFixed(1)}, {foundTextHighlights.find(h => h.debug)?.debug?.translateY?.toFixed(1)}</div>
                  <div>Match X Range: {foundTextHighlights.find(h => h.debug)?.debug?.matchStartX?.toFixed(1)} - {foundTextHighlights.find(h => h.debug)?.debug?.matchEndX?.toFixed(1)}</div>
                  <div>Spans Multiple: {foundTextHighlights.find(h => h.debug)?.debug?.matchSpansMultipleItems ? 'Yes' : 'No'}</div>
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

export default InteractivePDFAdvanced;
