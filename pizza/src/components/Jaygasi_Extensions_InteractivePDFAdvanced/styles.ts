import styled from 'styled-components';

export const ViewerWrapper = styled.div<{ height?: string }>`
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

export const Highlight = styled.div<{ $confidenceColor?: string }>`
  position: absolute;
  border-radius: 4px;
  pointer-events: auto;
  cursor: pointer;
  background: ${(p) => p.$confidenceColor || 'rgba(255,193,7,0.4)'};
  transition: transform 120ms ease, box-shadow 120ms ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;
