/**
 * Text highlighting utilities that work with the rendered PDF text layer
 * This approach uses the actual DOM text layer created by the PDF viewer
 * to ensure highlights align perfectly with the visible text
 */

interface BoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * Search for text in the rendered PDF pages and return bounding boxes
 * This function waits for the text layer to be rendered, then searches within it
 */
export const findTextInRenderedPages = async (
  searchTerms: Array<{ id: string; text: string; confidence: number }>,
  maxAttempts = 30,
  delayMs = 200
): Promise<Array<{ id: string; confidence: number; pageIndex: number; boundingBox: BoundingBox }>> => {
  const results: Array<{ id: string; confidence: number; pageIndex: number; boundingBox: BoundingBox }> = [];
  
  // Wait for text layers to be rendered
  let attempts = 0;
  let textLayers: NodeListOf<Element> | null = null;
  
  while (attempts < maxAttempts) {
    textLayers = document.querySelectorAll('.rpv-core__text-layer');
    // Check if text layers have content (spans)
    if (textLayers && textLayers.length > 0) {
      const firstLayer = textLayers[0];
      const spans = firstLayer.querySelectorAll('span');
      if (spans.length > 0) {
        console.log(`Found ${textLayers.length} text layers with content after ${attempts + 1} attempts`);
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, delayMs));
    attempts += 1;
  }
  
  if (!textLayers || textLayers.length === 0) {
    console.warn('No text layers found in the DOM');
    return results;
  }
  
  // Search each page's text layer
  for (const [pageIndex, textLayer] of Array.from(textLayers).entries()) {
    const pageContainer = textLayer.closest('.rpv-core__page-layer');
    if (!pageContainer) {
      console.warn(`Page ${pageIndex}: No page container found`);
      continue;
    }
    
    // Find the canvas which represents the actual PDF page
    const canvasElement = pageContainer.querySelector('canvas');
    if (!canvasElement) {
      console.warn(`Page ${pageIndex}: No canvas found`);
      continue;
    }
    
    // Get the canvas bounding rect - this is what we need to calculate relative to
    const canvasRect = canvasElement.getBoundingClientRect();
    
    if (canvasRect.width === 0 || canvasRect.height === 0) {
      console.warn(`Page ${pageIndex}: Canvas has zero dimensions`);
      continue;
    }
    
    console.log(`Page ${pageIndex} canvas dimensions:`, {
      width: canvasRect.width,
      height: canvasRect.height,
      left: canvasRect.left,
      top: canvasRect.top
    });
    
    // Search for each term
    for (const term of searchTerms) {
      const textSpans = textLayer.querySelectorAll('span');
      const searchText = term.text.toLowerCase();
      
      for (const span of Array.from(textSpans)) {
        const spanText = (span.textContent || '').toLowerCase();
        
        if (spanText.includes(searchText)) {
          // Get the bounding rectangle of the span in screen coordinates
          const spanRect = span.getBoundingClientRect();
          
          // Calculate position relative to the canvas (PDF page)
          const relativeLeft = (spanRect.left - canvasRect.left) / canvasRect.width;
          const relativeTop = (spanRect.top - canvasRect.top) / canvasRect.height;
          const relativeRight = (spanRect.right - canvasRect.left) / canvasRect.width;
          const relativeBottom = (spanRect.bottom - canvasRect.top) / canvasRect.height;
          
          console.log(`Found "${term.text}" on page ${pageIndex}:`, {
            spanText,
            spanRect: {
              left: spanRect.left,
              top: spanRect.top,
              right: spanRect.right,
              bottom: spanRect.bottom,
              width: spanRect.width,
              height: spanRect.height
            },
            canvasRect: {
              left: canvasRect.left,
              top: canvasRect.top,
              width: canvasRect.width,
              height: canvasRect.height
            },
            relative: {
              left: relativeLeft,
              top: relativeTop,
              right: relativeRight,
              bottom: relativeBottom
            }
          });
          
          results.push({
            id: `${term.id}_page${pageIndex}_${results.length}`,
            confidence: term.confidence,
            pageIndex,
            boundingBox: {
              left: relativeLeft,
              top: relativeTop,
              right: relativeRight,
              bottom: relativeBottom
            }
          });
        }
      }
    }
  }
  
  console.log(`Text search complete. Found ${results.length} matches for ${searchTerms.length} terms`);
  return results;
};
