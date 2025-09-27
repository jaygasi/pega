import styled, { css } from 'styled-components';
export const ViewerWrapper = styled.div `
  /* Base container: Full width, fixed/flex height, relative for absolute highlights */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: ${(props) => props.height || '800px'};
  width: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;

  /* Pega override: Prevent container from being squeezed by parent grids/flex */
  box-sizing: border-box !important;

  /*
    CSS Overrides:
    The following styles are scoped to this component to prevent Pega's global
    stylesheets from breaking the PDF viewer's layout. We use !important
    aggressively to ensure these styles win the specificity battle.
  */

  /* Core viewer layout - scoped to the component class to increase specificity */
  &.jaygasi-interactive-pdf .rpv-core__viewer {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    width: 100% !important;
    overflow: hidden !important;
    /* Allow children to shrink properly when inside constrained flex parents */
    min-height: 0 !important;
  }

  &.jaygasi-interactive-pdf .rpv-core__inner-pages {
    /* Use a zero flex-basis so this area can flexibly shrink/grow inside the
       viewer container and avoid being pushed off-screen by the toolbar. */
    flex: 1 1 0 !important;
    overflow: auto !important;
    background-color: #f8f9fa; /* Light gray background for page area */
    padding: 16px;
    min-height: 0 !important;
  }

  /* Toolbar container: keep horizontal layout and prevent external rules */
  &.jaygasi-interactive-pdf .rpv-default-layout__toolbar {
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
    -webkit-box-pack: justify !important;
    -ms-flex-pack: justify !important;
    justify-content: space-between !important;
    flex-shrink: 0 !important; /* Prevent shrinking */
    padding: 4px 8px !important;
    background-color: #f1f1f1 !important;
    border-bottom: 1px solid #d0d0d0 !important;
    height: 2.5rem !important;
    box-sizing: border-box !important;
    white-space: nowrap !important; /* Prevent wrapping which can stack items */
    flex-wrap: nowrap !important;
  }

  /* Inner toolbar structure */
  &.jaygasi-interactive-pdf .rpv-toolbar {
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
    gap: 8px !important;
  }

  &.jaygasi-interactive-pdf .rpv-toolbar__left,
  &.jaygasi-interactive-pdf .rpv-toolbar__middle,
  &.jaygasi-interactive-pdf .rpv-toolbar__right {
    display: flex !important;
    align-items: center !important;
  }
  
  .rpv-toolbar__middle {
    flex-grow: 1 !important;
    justify-content: center !important;
  }

  /* Buttons: Clean, hoverable, Pega-resistant */
  /* Target both the viewer buttons and any button elements inside the toolbar.
     The following selector is intentionally specific to override Pega/Cosmos rules
     like "button { display: block; width: 100%; }" which break the layout. */
  &.jaygasi-interactive-pdf .rpv-core__button,
  &.jaygasi-interactive-pdf .rpv-core__minimal-button,
  &.jaygasi-interactive-pdf .rpv-default-layout__toolbar button,
  &.jaygasi-interactive-pdf .rpv-default-layout__toolbar .p-button,
  &.jaygasi-interactive-pdf .rpv-default-layout__toolbar .cosmos-button {
    background-color: transparent !important;
    border: 1px solid transparent !important;
    border-radius: 4px !important;
    color: #333 !important;
    cursor: pointer !important;
    padding: 0 !important;
    margin: 0 2px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 32px !important;
    height: 32px !important;
    transition: background-color 0.2s ease !important;

    &:hover {
      background-color: #e0e0e0 !important;
      border-color: #ccc !important;
    }
  }
  
  /* Inputs: Clean, focused styles */
  .rpv-core__input {
    border: 1px solid #ccc !important;
    border-radius: 4px !important;
    height: 32px !important;
    box-sizing: border-box !important;
    text-align: center !important;
    color: #333 !important;
    background-color: #fff !important;
    font-size: 14px !important;

    &:focus {
      border-color: #007bff !important;
      outline: none !important;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25) !important;
    }
  }

  .rpv-page-navigation__current-page-input {
      width: 40px !important;
  }
`;
export const Highlight = styled.div `
  background-color: ${(props) => props.$confidenceColor};
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  opacity: 0.4;
  position: absolute;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  z-index: 10;

  &:hover {
    opacity: 0.6;
  }

  ${(props) => props.$isSelected &&
    css `
      box-shadow: 0 0 0 2px white, 0 0 0 4px #0ea5e9 !important;
      opacity: 0.7 !important;
    `}
`;
//# sourceMappingURL=styles.js.map