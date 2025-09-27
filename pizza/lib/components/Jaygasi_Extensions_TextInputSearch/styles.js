// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
export default styled.div(() => {
    return css `
    display: flex;
    align-items: flex-end; /* Aligns button with the bottom of the input field */
    gap: 0.5rem; /* Adds a small space between the input and the button */

    & > div:first-child { /* Targets the Cosmos Input component's wrapper */
      flex-grow: 1; /* Allows the input field to take up available space */
    }
  `;
});
//# sourceMappingURL=styles.js.map