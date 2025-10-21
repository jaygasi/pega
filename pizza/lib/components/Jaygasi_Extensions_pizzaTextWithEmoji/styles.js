// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
export default styled.div(() => {
    return css `
    margin: 0px 0;
    
    /* Style for the emoji and input container */
    .emoji-input-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Emoji styling */
    .status-emoji {
      font-size: 20px;
      line-height: 1;
      display: flex;
      align-items: center;
      user-select: none;
    }
    
    /* Display mode styling */
    .display-with-emoji {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Ensure input takes up available space when emoji is present */
    .input-with-emoji {
      flex: 1;
    }
  `;
});
