// @ts-ignore - types are not perfect for pdfjs-dist
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer.js';

export interface TextBoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export const createTextLayer = async (page: any, viewport: any): Promise<HTMLDivElement> => {
  const textContent = await page.getTextContent();
  const textLayerDiv = document.createElement('div');
  
  // Set up the text layer container with proper styling
  textLayerDiv.style.visibility = 'hidden';
  textLayerDiv.style.position = 'absolute';
  textLayerDiv.style.left = '0';
  textLayerDiv.style.top = '0';
  textLayerDiv.style.right = '0';
  textLayerDiv.style.bottom = '0';
  textLayerDiv.style.overflow = 'hidden';
  textLayerDiv.style.opacity = '0';
  textLayerDiv.style.lineHeight = '1.0';
  textLayerDiv.style.width = `${viewport.width}px`;
  textLayerDiv.style.height = `${viewport.height}px`;
  textLayerDiv.className = 'textLayer';
  
  // Temporarily add to document for measurements
  document.body.appendChild(textLayerDiv);

  // Create and configure the text layer builder
  // @ts-ignore - TextLayerBuilder types are incomplete
  const textLayer = new TextLayerBuilder({
    textLayerDiv,
    pageIndex: page.pageNumber - 1,
    viewport: viewport.clone({ dontFlip: true }),
    enhanceTextSelection: true
  } as any);

  // Set the text content and render
  await new Promise<void>((resolve) => {
    // @ts-ignore - types don't include these methods but they exist
    textLayer.setTextContent(textContent);
    // @ts-ignore
    textLayer.render();
    // Wait a bit for fonts to load and text to render
    setTimeout(resolve, 100);
  });
  return textLayerDiv;
};

export const findTextBoundingBoxes = (
  textLayerDiv: HTMLDivElement,
  searchText: string,
  viewport: any
): TextBoundingBox[] => {
  const textNodes = Array.from(textLayerDiv.querySelectorAll('.pdfViewer'));
  const range = document.createRange();
  const matches: TextBoundingBox[] = [];
  
  // Normalize search text for comparison
  const normalizedSearch = searchText.toLowerCase().trim();
  
  for (const node of textNodes) {
    const text = node.textContent || '';
    let startIndex = 0;
    
    while (true) {
      const index = text.toLowerCase().indexOf(normalizedSearch, startIndex);
      if (index === -1) break;
      
      // Get precise text bounds using range
      range.setStart(node.firstChild!, index);
      range.setEnd(node.firstChild!, index + searchText.length);
      
      const rects = Array.from(range.getClientRects());
      for (const rect of rects) {
        const { left, top, right, bottom } = rect;
        
        // Convert coordinates to relative viewport (0-1) coordinates
        matches.push({
          left: left / viewport.width,
          top: top / viewport.height,
          right: right / viewport.width,
          bottom: bottom / viewport.height,
        });
      }
      
      startIndex = index + 1;
    }
  }
  
  textLayerDiv.remove();
  return matches;
};