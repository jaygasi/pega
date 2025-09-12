/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, stateProps, rawMetadata } from './mock';

import JaygasiExtensionsPDFViewerBlob from './index';

const meta: Meta<typeof JaygasiExtensionsPDFViewerBlob> = {
  title: 'JaygasiExtensionsPDFViewerBlob',
  component: JaygasiExtensionsPDFViewerBlob,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsPDFViewerBlob>;

export const BaseJaygasiExtensionsPDFViewerBlob: Story = (args: any) => {
  const props = {
    ...configProps,
    getPConnect: () => {
      return {
        getConfigProps: () => {
          return configProps;
        },
        getStateProps: () => {
          return stateProps;
        },
        getLocalizedValue: (val: any) => {
          return val;
        },
        getCaseInfo: () => {
          return {
            getClassName: () => {
              return 'DIXL-MediaCo-Work-NewService';
            }
          };
        },
        getRawMetadata: () => {
          return rawMetadata;
        },
        getValue: (prop: string) => {
          // Mock getValue to resolve property references for highlighting
          if (prop === '.HighlightThisText') {
            return 'search term from property';
          }
          return '';
        }
      };
    }
  };

  return (
    <>
      <JaygasiExtensionsPDFViewerBlob {...props} {...args} />
    </>
  );
};

BaseJaygasiExtensionsPDFViewerBlob.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  height: String(configProps.height),
  pdfSource: configProps.pdfSource,
  highlightPropRef: '',
  highlightTextStatic: '',
  enableDebugging: true
};
