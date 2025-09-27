/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import JaygasiExtensionsTextInputSearch from './index';
import type { JaygasiExtensionsTextInputSearchProps } from './index';

import { configProps, stateProps, fieldMetadata } from './mock';

const meta: Meta<typeof JaygasiExtensionsTextInputSearch> = {
  title: 'Jaygasi/TextInputSearch',
  component: JaygasiExtensionsTextInputSearch,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsTextInputSearch>;

const getMockProps = (overrides: Partial<JaygasiExtensionsTextInputSearchProps> = {}) => {
  return {
    value: configProps.value,
    hasSuggestions: configProps.hasSuggestions,
    formatter: configProps.formatter || 'TextInput',
    displayAsStatus: false,
    isTableFormatter: false,
    fieldMetadata,
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
        resolveConfigProps: () => ({}), // Changed to return an empty object
        getLocalizedValue: (value: string) => value
      } as any; // Cast to any to bypass strict type checking for the mock
    },
    label: overrides.label ?? configProps.label,
    helperText: overrides.helperText ?? configProps.helperText,
    placeholder: overrides.placeholder ?? configProps.placeholder,
    testId: overrides.testId ?? configProps.testId,
    readOnly: overrides.readOnly ?? configProps.readOnly,
    disabled: overrides.disabled ?? configProps.disabled,
    required: overrides.required ?? configProps.required,
    status: overrides.status ?? configProps.status,
    hideLabel: overrides.hideLabel ?? configProps.hideLabel,
    displayMode: overrides.displayMode ?? configProps.displayMode,
    variant: overrides.variant ?? configProps.variant,
    validatemessage: overrides.validatemessage ?? configProps.validatemessage,
    ...overrides
  };
};

export const BaseJaygasiExtensionsTextInputSearch = (args: JaygasiExtensionsTextInputSearchProps) => {
  return (
    <>
      <JaygasiExtensionsTextInputSearch {...getMockProps(args)} />
    </>
  );
};

BaseJaygasiExtensionsTextInputSearch.args = {
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
  formatter: 'TextInput',
  onSearchAction: (searchText: string) => {
    console.log(`Pega search action triggered for: ${searchText}`);
    // Example: Trigger a Pega action here
    // pConn.getActionsApi().updateFieldValue('.SearchText', searchText);
  }
};

export const DisplayOnlyMode = (args: JaygasiExtensionsTextInputSearchProps) => {
  return (
    <>
      <JaygasiExtensionsTextInputSearch {...getMockProps({ ...args, displayMode: 'DISPLAY_ONLY', value: 'Sample Value' })} />
    </>
  );
};

DisplayOnlyMode.args = { ...BaseJaygasiExtensionsTextInputSearch.args };

export const ErrorState = (args: JaygasiExtensionsTextInputSearchProps) => {
  return (
    <>
      <JaygasiExtensionsTextInputSearch {...getMockProps({ ...args, validatemessage: 'Invalid input' })} />
    </>
  );
};

ErrorState.args = { ...BaseJaygasiExtensionsTextInputSearch.args };