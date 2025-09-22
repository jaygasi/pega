
/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, fieldMetadata, stateProps } from './mock';

import JaygasiExtensionsPizzaDecimal from './index';

const meta: Meta<typeof JaygasiExtensionsPizzaDecimal> = {
  title: 'JaygasiExtensionsPizzaDecimal',
  component: JaygasiExtensionsPizzaDecimal,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsPizzaDecimal>;

export const BaseJaygasiExtensionsPizzaDecimal: Story = (args: any) => {

  const props = {
    value: configProps.value,
    fieldMetadata,
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
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
      <JaygasiExtensionsPizzaDecimal {...props} {...args} />
    </>
  );
};

BaseJaygasiExtensionsPizzaDecimal.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  showGroupSeparators: configProps.showGroupSeparators,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage
};
