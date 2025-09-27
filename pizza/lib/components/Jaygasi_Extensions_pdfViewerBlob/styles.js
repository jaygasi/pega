import styled, { css } from 'styled-components';
export default styled.div(() => {
    return css `
    width: 100%;

    & > label,
    & > span { /* Target CosmosText for label and helper text */
      display: block;
      padding-bottom: 0.5rem;
      font-weight: 500;
    }

    /* Target the container div for the viewer */
    .pdf-viewer-container {
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    /* In read-only mode, remove the border */
    &.read-only .pdf-viewer-container {
      border: none;
      border-radius: 0;
    }

    &.disabled {
      opacity: 0.5;
    }
  `;
});
//# sourceMappingURL=styles.js.map