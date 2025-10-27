// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;
    
    .option-emoji {
      font-size: 16px;
      margin-left: 4px;
      vertical-align: middle;
    }
    
    .display-emoji {
      font-size: 16px;
      margin-left: 4px;
      vertical-align: middle;
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
