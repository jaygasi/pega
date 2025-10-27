import styled, { css } from 'styled-components';

// Main container for the entire component
export const PDFViewerContainer = styled.div(() => css`
  height: 100%;
  width: 100%;
  border: 1px solid #d1d5db; /* Softer border color */
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb; /* Light background for the whole component */
  overflow: hidden; /* Prevents content from overflowing rounded corners */

  /* --- Toolbar Styles --- */
  .rpv-core__toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    padding: 8px 12px;
    box-sizing: border-box;
    flex-shrink: 0; /* Prevent toolbar from shrinking */
  }

  .rpv-core__toolbar-left,
  .rpv-core__toolbar-middle,
  .rpv-core__toolbar-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px; /* Space between items */
  }
  
  .rpv-core__toolbar-middle {
    flex-grow: 1;
    justify-content: center;
  }

  /* --- Modern Button Styles --- */
  .rpv-core__button {
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 18px;
    color: #374151;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    
    &:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }

    &:focus, &:focus-visible {
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.6);
      border-color: #6366f1;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .rpv-core__current-page-input {
    padding: 0 8px;
    font-size: 14px;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 8px; /* Space between page number items */
  }

  .rpv-core__search-input {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 14px;
    min-height: 35px;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &:focus, &:focus-visible {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.6);
      outline: none;
    }
  }

  /* Search container */
  .pega-pdf-search-container {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`);

// Wraps the actual PDF viewer content area
export const ViewerWrapper = styled.div(() => css`
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
  flex-grow: 1; /* Allow this to fill remaining space */

  /* Isolate the viewer from the host app's box-sizing model */
  .rpv-core__viewer, .rpv-core__page-layer, .rpv-core__text-layer {
    box-sizing: content-box !important;
  }
  
  /* Make the text layer a correctly sized overlay */
  .rpv-core__text-layer {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    transform-origin: 0 0 !important;
    color: transparent !important; /* Hide text to prevent ghosting */
  }

  /* Reset the individual text spans */
  .rpv-core__text-layer-text {
    position: absolute !important;
    white-space: pre !important;
    line-height: 1 !important;
    transform-origin: 0 0 !important;
    text-rendering: geometricPrecision !important;
  }
`);

export default PDFViewerContainer;