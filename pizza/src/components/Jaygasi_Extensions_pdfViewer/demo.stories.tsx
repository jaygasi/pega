/* eslint-disable react/jsx-no-useless-fragment */

import { configProps, stateProps } from './mock';
import { sampleBase64Pdf } from '../Jaygasi_Extensions_pdfViewerBlob/mock';

import PDFViewer from './index';
import type { JaygasiExtensionsPDFViewerProps } from './index';

const getMockProps = (overrides: Partial<JaygasiExtensionsPDFViewerProps> = {}) => {
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
    // PConnFieldProps defaults required by the component's props interface
    required: false,
    disabled: false,
    value: undefined,
    validatemessage: '',
    readOnly: false,
    testId: 'pdf-viewer-story',
    hideLabel: false,
    helperText: "",
    pdfSource: overrides.pdfSource || '',
    height: overrides.height || '600px',
    ...overrides
  };
};

export default {
  title: 'Jaygasi/PDFViewer',
  component: PDFViewer
};

export const Base = (args: JaygasiExtensionsPDFViewerProps) => {
  const props = getMockProps(args) as any;
  return <PDFViewer {...props} />;
};

Base.args = {
  pdfSource: sampleBase64Pdf,
  height: '600px'
};
