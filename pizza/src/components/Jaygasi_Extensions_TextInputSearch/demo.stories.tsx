/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import JaygasiExtensionsTextInputSearch from './index';
import type { JaygasiExtensionsTextInputSearchProps } from './index';

import { configProps, stateProps, fieldMetadata } from './mock';

const meta: Meta<typeof JaygasiExtensionsTextInputSearch> = {
  title: 'Jaygasi/TextInputSearch',
  component: JaygasiExtensionsTextInputSearch,
  excludeStories: /.*Data$/,
  parameters: {
    docs: {
      page: () => import('./Docs.mdx'),
    },
  },
  argTypes: {
    fieldMetadata: {
      table: {
        disable: true,
      },
    },
    additionalProps: {
      table: {
        disable: true,
      },
    },
    displayMode: {
      control: {
        type: 'select',
      },
      options: {
        'Edit Mode (Default)': '',
        'Display Only (Read-only)': 'DISPLAY_ONLY', 
        'Labels Left (Read-only)': 'LABELS_LEFT',
        'Stacked Large Value (Read-only)': 'STACKED_LARGE_VAL'
      },
      table: {
        defaultValue: { summary: '' },
      },
      description: 'Display modes: Edit allows input & search, others are read-only for showing existing values'
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['inline', 'stacked'],
      table: {
        defaultValue: { summary: 'inline' },
      },
    },
    formatter: {
      control: {
        type: 'select',
      },
      options: ['TextInput', 'SearchInput', 'TextArea'],
      table: {
        defaultValue: { summary: 'TextInput' },
      },
    },
    status: {
      control: {
        type: 'select',
      },
      options: ['', 'success', 'warning', 'error'],
      table: {
        defaultValue: { summary: '' },
      },
    },
    getPConnect: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsTextInputSearch>;

const getMockProps = (overrides: Partial<JaygasiExtensionsTextInputSearchProps> = {}) => {
  return {
    value: overrides.value ?? configProps.value, // Use override value first
    hasSuggestions: overrides.hasSuggestions ?? configProps.hasSuggestions,
    formatter: overrides.formatter ?? configProps.formatter ?? 'TextInput',
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
            updateFieldValue: (prop: string, value: any) => {
              console.log('Mock updateFieldValue called:', { prop, value });
            },
            triggerFieldChange: (prop: string, value: any) => {
              console.log('Mock triggerFieldChange called:', { prop, value });
              alert(`Search triggered for: "${value}" on property: ${prop}`);
            },
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
    searchPropRef: overrides.searchPropRef ?? configProps.searchPropRef, // Add searchPropRef
    ...overrides
  };
};

export const BaseJaygasiExtensionsTextInputSearch = (args: JaygasiExtensionsTextInputSearchProps) => {
  // Merge args with mock props to make controls responsive
  const props = getMockProps({
    ...args,
    // Ensure these Storybook controls are passed through
    displayMode: args.displayMode,
    variant: args.variant,
    formatter: args.formatter,
    status: args.status,
    disabled: args.disabled,
    readOnly: args.readOnly,
    required: args.required,
    hideLabel: args.hideLabel,
    value: args.value,
    label: args.label,
    placeholder: args.placeholder,
    helperText: args.helperText,
    validatemessage: args.validatemessage
  });

  return (
    <>
      <JaygasiExtensionsTextInputSearch {...props} />
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
  searchPropRef: configProps.searchPropRef, // Add searchPropRef to make button clickable
  value: 'Sample search text' // Add default value to make button clickable
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