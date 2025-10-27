import styled, { css } from 'styled-components';

export const SmartTextInputContainer = styled.div(() => css`
  position: relative;
  
  /* Visual indicator when PDF search is active */
  &.pdf-search-active {
    .smart-text-input {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
  }
  
  /* Search indicator icon */
  .pdf-search-indicator {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #6366f1;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    
    &.active {
      opacity: 1;
    }
  }
  
  .smart-text-input {
    width: 100%;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
`);

export default SmartTextInputContainer;