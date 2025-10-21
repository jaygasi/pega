// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
export default styled.div(() => {
    return css `
    display: flex;
    align-items: center; /* Center alignment for better visual balance */
    gap: 0.5rem; /* Adds a small space between the input and the button */
    position: relative;
    width: 100%; /* Take full width like before */

    & > div:first-child { /* Targets the Cosmos Input component's wrapper */
      flex-grow: 1; /* Allows the input field to take up available space */
      min-width: 0; /* Allow the input to shrink if needed */
    }

    /* Enhanced button positioning for better alignment */
    button {
      align-self: center;
      transform: translateY(10px); /* Fine-tune vertical alignment */
      flex-shrink: 0;
      
      /* Increased button size */
      min-width: 40px;
      min-height: 40px;
      
      /* Improve visual appearance */
      transition: all 0.2s ease;
      
      /* Increase icon size */
      svg {
        width: 20px;
        height: 20px;
      }
      
      &:hover {
        transform: translateY(10px) scale(1.05);
      }
      
      &:disabled {
        opacity: 0.5;
      }
    }
  `;
});
