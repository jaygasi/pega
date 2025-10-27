// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;
    
    /* Container for input with search button */
    .input-with-search {
      display: flex;
      align-items: flex-end; /* Align to bottom to match input field level */
      gap: 0.5rem; /* Consistent spacing with other components */
      position: relative;
      width: 100%;
      
      /* Target the Input component wrapper (first child) */
      & > div:first-child {
        flex-grow: 1; /* Allows the input field to take up available space */
        min-width: 0; /* Allow the input to shrink if needed */
      }
      
      /* Search emoji button styling - match emoji controls */
      .search-emoji-button {
        align-self: flex-end; /* Align button to bottom to match input field */
        margin-bottom: 0.15rem; /* Adjust to lower the emoji slightly more */
        flex-shrink: 0;
        font-size: 30px;
        width: 30px;
        height: 30px;
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        border-radius: 4px;

        &:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.04);
          transform: scale(1.05);
        }

        &:active:not(:disabled) {
          transform: scale(0.95);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &:focus {
          outline: 2px solid #007acc;
          outline-offset: 2px;
        }
      }
    }
  `;
});