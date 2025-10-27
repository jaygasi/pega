import type { StoryObj } from '@storybook/react-webpack5';
import PegaExtensionsSmartTextInput from './index.stories-wrapper';

const meta = {
  title: 'Pega Extensions/SmartTextInput',
  component: PegaExtensionsSmartTextInput,
  parameters: {
    docs: {
      description: {
        component: 'Smart Text Input with PDF search interaction capabilities'
      }
    }
  },
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    hideLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    enablePDFSearch: { control: 'boolean' },
    searchOnFocus: { control: 'boolean' },
    searchOnChange: { control: 'boolean' },
    searchTarget: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsSmartTextInput>;

export const Default: Story = {
  args: {
    label: 'Smart Text Input',
    value: '',
    placeholder: 'Enter text...',
    helperText: 'This input can trigger PDF searches',
    enablePDFSearch: false
  }
};

export const WithPDFSearch: Story = {
  args: {
    label: 'Search Terms',
    value: 'red',
    placeholder: 'Enter search term...',
    helperText: 'Focus or change this field to search in PDF',
    enablePDFSearch: true,
    searchOnFocus: true,
    searchOnChange: true
  }
};

export const SearchOnFocusOnly: Story = {
  args: {
    label: 'Focus to Search',
    value: 'contract',
    placeholder: 'Focus to search...',
    helperText: 'Click in this field to search PDF for current value',
    enablePDFSearch: true,
    searchOnFocus: true,
    searchOnChange: false
  }
};

export const SearchOnChangeOnly: Story = {
  args: {
    label: 'Type to Search',
    value: '',
    placeholder: 'Type to search...',
    helperText: 'Search happens as you type (debounced)',
    enablePDFSearch: true,
    searchOnFocus: false,
    searchOnChange: true
  }
};