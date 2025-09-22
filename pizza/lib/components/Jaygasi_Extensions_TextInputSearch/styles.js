// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
export default styled.div(() => {
    return css `
    margin: 0px 0;
    & > div:first-child {  // Style for label Flex container
      margin-bottom: 8px;  // Space between label/icon and input
    }
    & svg {  // Icon styling
      color: var(--neutral-light-05, #6c757d);  // Example color, adjust as needed
    }
  `;
});
//# sourceMappingURL=styles.js.map