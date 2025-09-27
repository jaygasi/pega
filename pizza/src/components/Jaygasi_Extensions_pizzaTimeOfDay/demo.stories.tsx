/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';
import { configProps, stateProps } from './mock';
import JaygasiExtensionsPizzaTimeOfDay from './index';

const meta: Meta<typeof JaygasiExtensionsPizzaTimeOfDay> = {
  title: 'Jaygasi/PizzaTimeOfDay',
  component: JaygasiExtensionsPizzaTimeOfDay,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsPizzaTimeOfDay>;

export const BaseJaygasiExtensionsPizzaTimeOfDay: Story = (args: any) => {
  const props = {
    value: configProps.value,
    additionalProps: configProps.additionalProps,
    hasSuggestions: configProps.hasSuggestions,
    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        getValidationApi: () => {
          return {
            validate: () => {/* nothing */}
          };
        },
        getStateProps: () => {
          return stateProps;
        },
        getConfigProps: () => {
          return configProps;
        },
        ignoreSuggestion: () => {/* nothing */},
        clearErrorMessages: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <JaygasiExtensionsPizzaTimeOfDay {...props} {...args} />
    </>
  );
};

BaseJaygasiExtensionsPizzaTimeOfDay.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  withSeconds: configProps.withSeconds,
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
