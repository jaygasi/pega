// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;
    
    /* Apply TextInputSearch pattern directly to the edit mode wrapper */
    &[data-display-mode="EDIT"] {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      width: 100%;
      
      /* Target the Input component wrapper (first child) - same as TextInputSearch */
      & > div:first-child {
        flex-grow: 1;
        min-width: 0;
      }
      
      /* Target the emoji span (like TextInputSearch targets button) */
      .status-emoji {
        align-self: center;
        transform: translateY(8px);
        flex-shrink: 0;
        font-size: 24px;
        width: 28px;
        height: 28px;
        margin: 0;
      }
    }
    
    /* Style for the emoji and input container - keep for non-edit modes */
    .emoji-input-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      width: 100%;
    }
    
    /* Input field styling */
    .input-with-emoji {
      flex-grow: 1;
      min-width: 0;
    }
    
    /* Emoji styling - default size for display modes, will be overridden for edit mode */
    .status-emoji {
      font-size: 14px; /* Default smaller size for display modes */
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      width: 16px; /* Default smaller size for display modes */
      height: 16px; /* Default smaller size for display modes */
      flex-shrink: 0;
      /* No transform by default - only for edit mode */
    }
    
    /* Display mode styling - for read-only display */
    .display-with-emoji {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      vertical-align: baseline;
    }
    
    .display-with-emoji .status-emoji {
      font-size: 14px; /* Smaller size for display modes to match text better */
      line-height: 1;
      vertical-align: baseline;
      margin-top: 0;
      margin-bottom: 1px;
      align-self: baseline;
      width: 16px;
      height: 16px;
      transform: none; /* Remove the translateY transform for display modes */
    }
    
    /* Specific fixes for different display modes */
    &[data-display-mode="EDIT"] {
      .emoji-input-container {
        align-items: center; /* Use flexbox center alignment */
      }
      
      .status-emoji {
        /* Keep the larger size for edit mode */
        font-size: 24px;
        width: 28px;
        height: 28px;
        margin: 0;
      }
    }
    
    /* Override emoji size for display modes */
    &[data-display-mode="LABELS_LEFT"] .status-emoji,
    &[data-display-mode="DISPLAY_ONLY"] .status-emoji {
      font-size: 14px !important;
      width: 16px !important;
      height: 16px !important;
      transform: none !important;
    }
    
    &[data-display-mode="LABELS_LEFT"] .display-with-emoji,
    &[data-display-mode="DISPLAY_ONLY"] .display-with-emoji {
      align-items: baseline;
    }
    
    &[data-display-mode="STACKED_LARGE_VAL"] .display-with-emoji {
      align-items: baseline;
    }
    
    &[data-display-mode="STACKED_LARGE_VAL"] .status-emoji {
      font-size: 28px; /* Increased from 20px to match larger header text */
      margin-bottom: 2px;
      width: 32px;
      height: 32px;
    }
    
    /* Ensure consistent alignment across all scenarios */
    .emoji-input-container {
      /* Force minimum height to match input field */
      min-height: 40px;
    }
    
    /* Handle FieldValueList alignment */
    div[data-testid] .display-with-emoji {
    }
    
    /* Ensure emoji is vertically centered relative to the input's visual area */
    /* This addresses the specific alignment issue seen in screenshots */
    &[data-display-mode="EDIT"] .emoji-input-container {
      align-items: center;
      min-height: 48px; /* Account for label + input height */
    }
    
    /* Fine-tune emoji position - Match TextInputSearch button pattern */
    &[data-display-mode="EDIT"] .status-emoji {
      align-self: center;
      transform: translateY(10px); /* Same transform as TextInputSearch button */
      flex-shrink: 0; /* Same as TextInputSearch button */
      font-size: 24px;
      width: 28px;
      height: 28px;
      margin: 0;
    }
  `;
});