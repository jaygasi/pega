
/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, rawMetadata, fieldMetadata, stateProps } from './mock';

import JaygasiLlcExtensionSearchJaygasi from './index';

const meta: Meta<typeof JaygasiLlcExtensionSearchJaygasi> = {
  title: 'JaygasiLlcExtensionSearchJaygasi',
  component: JaygasiLlcExtensionSearchJaygasi,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiLlcExtensionSearchJaygasi>;

export const BaseJaygasiLlcExtensionSearchJaygasi: Story = args => {

  const [value, setValue] = useState(configProps.value);
  const datasourceMetadata = fieldMetadata;

  const props = {
    value,
    hasSuggestions: configProps.hasSuggestions,
    columns: [],
    listType: 'associated',
    datasourceMetadata,
    fieldMetadata,
    getPConnect: () => {
      return {
        getConfigProps: () => {
          return configProps;
        },
        getStateProps: () => {
          return stateProps;
        },
        getContextName: () => {
          return 'app/primary_1';
        },
        getLocalizedValue: val => {
          return val;
        },
        getLocaleRuleNameFromKeys: (localeClass, localeContext, localeName) => {
          return `${localeClass}!${localeContext}!${localeName}`;
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
        getActionsApi: () => {
          return {
            updateFieldValue: (propName, theValue) => {
              setValue(theValue);
            },
            triggerFieldChange: () => {/* nothing */}
          };
        },
        getValidationApi: () => {
          return {
            validate: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <JaygasiLlcExtensionSearchJaygasi {...props} {...args} />
    </>
  );
};

BaseJaygasiLlcExtensionSearchJaygasi.args = {
  datasource: configProps.datasource,
  label: configProps.label,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  parameters: {},
  isTableFormatter: false,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  validatemessage: configProps.validatemessage
};
