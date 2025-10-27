// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    display: flex;
    align-items: flex-end; /* Align to bottom to match input field level */
    gap: 0.5rem; /* Adds a small space between the input and the button */
    position: relative;
    width: 100%; /* Take full width like before */

    & > div:first-child { /* Targets the Cosmos Input component's wrapper */
      flex-grow: 1; /* Allows the input field to take up available space */
      min-width: 0; /* Allow the input to shrink if needed */
    }

    /* Button positioning for proper vertical alignment */
    button {
      align-self: flex-end; /* Align button to bottom to match input field */
      margin-bottom: -0.15rem; /* Adjust to lower the button slightly more */
      flex-shrink: 0;

      /* Consistent button size */
      min-width: 40px;
      min-height: 40px;

      /* Improve visual appearance */
      transition: all 0.2s ease;

      /* Increase icon size */
      svg {
        width: 20px;
        height: 20px;
      }

      &:hover:not(:disabled) {
        transform: scale(1.05);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  `;
});