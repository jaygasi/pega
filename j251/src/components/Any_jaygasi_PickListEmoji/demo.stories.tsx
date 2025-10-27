/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, rawMetadata, fieldMetadata, stateProps } from './mock';

import AnyJaygasiPickListEmoji from './index';

const meta: Meta<typeof AnyJaygasiPickListEmoji> = {
  title: 'Jaygasi/Picklist with Emoji',
  component: AnyJaygasiPickListEmoji,
  argTypes: {
    emojiConfig: {
      control: 'text',
      description: 'JSON string for emoji mappings'
    },
    fieldMetadata: {
      table: {
        disable: true,
      },
    },
    additionalProps: {
      table: {
        disable: true,
      },
    }
  },
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof AnyJaygasiPickListEmoji>;

export const BaseAnyJaygasiPickListEmoji: Story = (args: any) => {

  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    hasSuggestions: configProps.hasSuggestions,
    fieldMetadata,
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
      <AnyJaygasiPickListEmoji {...props} {...args} />
    </>
  );
};

BaseAnyJaygasiPickListEmoji.args = {
  datasource: configProps.datasource,
  label: configProps.label,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage,
  emojiConfig: configProps.emojiConfig
};
