/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, rawMetadata, fieldMetadata, stateProps } from './mock';

import JaygasiExtensionsPizzaSearchbox from './index';

const meta: Meta<typeof JaygasiExtensionsPizzaSearchbox> = {
  title: 'JaygasiExtensionsPizzaSearchbox',
  component: JaygasiExtensionsPizzaSearchbox,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsPizzaSearchbox>;

export const BaseJaygasiExtensionsPizzaSearchbox: Story = (args: any) => {

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
        getLocalizedValue: (val: any) => {
          return val;
        },
        getLocaleRuleNameFromKeys: (localeClass: string, localeContext: string, localeName: string) => {
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
            updateFieldValue: (propName: string, theValue: any) => {
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
      <JaygasiExtensionsPizzaSearchbox {...props} {...args} />
    </>
  );
};

BaseJaygasiExtensionsPizzaSearchbox.args = {
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
