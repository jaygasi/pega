import styled from 'styled-components';
export const ViewerWrapper = styled.div `
  width: 100%;
  height: ${(p) => p.height || '600px'};
  display: flex;
  flex-direction: column;

  /* Scope to avoid host global rules */
  &.jaygasi-advanced-pdf {
    .rpv-core__viewer {
      display: flex !important;
      flex-direction: column !important;
      min-height: 0 !important;
    }

    .rpv-core__inner-pages {
      flex: 1 1 0 !important;
      min-height: 0 !important;
      overflow: auto !important;
    }

    .rpv-default-layout__toolbar {
      display: flex !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      gap: 8px !important;
      white-space: nowrap !important;
    }

    /* Force toolbar buttons to inline-flex so host button rules don't make them full-width */
    .rpv-core__toolbar-button,
    .rpv-core__icon-button,
    button {
      display: inline-flex !important;
      width: auto !important;
      padding: 4px 8px !important;
      align-items: center !important;
      justify-content: center !important;
    }
  }
`;
export const Highlight = styled.div `
  position: absolute;
  border-radius: 2px;
  pointer-events: auto;
  cursor: pointer;
  background: transparent; /* Remove filled background for outline-only effect */
  border: 2px solid ${(p) => p.$confidenceColor?.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')') || 'rgb(255,193,7)'};
  transition: transform 120ms ease, border-color 120ms ease, border-width 120ms ease;
  
  /* Hover effect to make border more prominent when hovering over words */
  &:hover {
    border-width: 3px;
    transform: scale(1.02); /* Slight scale to make the word border more noticeable */
  }
  
  /* Active/selected state for clicked words */
  &:active {
    border-width: 4px;
    border-color: #ff6b35; /* Orange highlight for selected words */
  }
`;
