// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
export default styled.div(() => {
    return css `
    /* width: 100%; */

    & > label {
      display: block;
      padding-bottom: 0.5rem;
      font-weight: 500;
    }

    iframe {
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `;
});
