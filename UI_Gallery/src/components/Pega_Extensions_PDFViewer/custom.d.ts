declare module './styles' {
  // Minimal typing for the ViewerWrapper styled-component
  export const ViewerWrapper: any;
}

declare module './diagnostics' {
  const PDFViewerDiagnostics: any;
  export { PDFViewerDiagnostics };
}

// Storybook and local story helpers
declare module '@storybook/react-webpack5' {
  // Minimal StoryObj typing used by our stories
  export type StoryObj<T = any> = {
    args?: Partial<T>;
  };
}

// Allow importing the component index from stories without JSX diagnostics
declare module './index' {
  const Component: any;
  export default Component;
}
