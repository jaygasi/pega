
/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { configProps, stateProps } from './mock';

import JaygasiExtensionsPizzaBoolean from './index';

const meta: Meta<typeof JaygasiExtensionsPizzaBoolean> = {
  title: 'JaygasiExtensionsPizzaBoolean',
  component: JaygasiExtensionsPizzaBoolean,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsPizzaBoolean>;

export const BaseJaygasiExtensionsPizzaBoolean: Story = (args: any) => {

  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    additionalProps: configProps.additionalProps,
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: (propName: string, theValue: any) => {
              setValue(theValue);
            },
            triggerFieldChange: () => { /* nothing */}
          };
        },
        getValidationApi: () => {
          return {
            validate: () => { /* nothing */}
          };
        }
      };
    }
  };

  return (
    <>
      <JaygasiExtensionsPizzaBoolean {...props} {...args} />
    </>
  );
};

BaseJaygasiExtensionsPizzaBoolean.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  caption: configProps.caption,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  trueLabel: configProps.trueLabel,
  falseLabel: configProps.falseLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage
};
