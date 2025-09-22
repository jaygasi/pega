/* eslint-disable react/jsx-no-useless-fragment */

import { configProps, stateProps, sampleBase64Pdf } from './mock';

import PDFViewer from './index';
import type { citiExtensionsPDFViewerProps } from './index';

const getMockProps = (overrides: Partial<citiExtensionsPDFViewerProps> = {}) => {
  return {
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */},
            onFocus: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */},
        getLocalizedValue: (value: string) => value,
        getConfigProps: () => {
          return configProps;
        }
      };
    },
    label: "PDF Viewer",
    hideLabel: false,
    helperText: "",
    pdfSource: overrides.pdfSource || '',
    height: overrides.height || '600px',
    ...overrides
  };
};

export default {
  title: 'citiExtensionsPDFViewer',
  component: PDFViewer
};

export const Base = (args: citiExtensionsPDFViewerProps) => {
  return <PDFViewer {...getMockProps(args)} />;
};

Base.args = {
  pdfSource: sampleBase64Pdf,
  height: '600px'
};
