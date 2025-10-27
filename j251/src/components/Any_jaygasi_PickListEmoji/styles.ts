// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;
    
    .option-emoji {
      font-size: 18px;
      margin-left: 4px;
      vertical-align: middle;
    }
    
    .display-emoji {
      font-size: 20px;
      margin-left: 6px;
      vertical-align: middle;
    }

    /* Container for picklist with external emoji */
    .picklist-with-emoji {
      display: flex;
      align-items: flex-end; /* Align to bottom to match select field level */
      gap: 0.5rem; /* Consistent spacing with other components */
      position: relative;
      width: 100%;
      
      /* Target the Select component wrapper (first child) */
      & > div:first-child {
        flex-grow: 1; /* Allows the select field to take up available space */
        min-width: 0; /* Allow the select to shrink if needed */
      }
      
      /* External emoji styling - positioned outside the select */
      .external-emoji {
        align-self: flex-end; /* Align emoji to bottom to match select field */
        margin-bottom: 0.15rem; /* Adjust to lower the emoji slightly more */
        flex-shrink: 0;
        font-size: 30px;
        width: 30px;
        height: 30px;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `;
});

export const StyledDisplayModeWrapper = styled.div(() => css`
  display: flex;
  flex-direction: column;
`);

export const StyledDisplayModeLabel = styled.div(() => css`
  font-weight: 600;
  margin-bottom: 4px;
`);

export const StyledDisplayModeValue = styled.div(() => css`
  font-size: 14px;
`);

export const StyledDisplayModeValueLarge = styled.div(() => css`
  font-size: 24px;
  font-weight: 600;
`);

export const StyledDisplayModeHelperText = styled.div(() => css`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`);
