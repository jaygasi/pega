/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { stateProps, configProps } from './mock';

import AnyExtTextInputEmoji from './index';

const meta: Meta<typeof AnyExtTextInputEmoji> = {
  title: 'Jaygasi/Text with Emoji',
  component: AnyExtTextInputEmoji,
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
      options: ['', 'LABELS_LEFT', 'DISPLAY_ONLY', 'STACKED_LARGE_VAL'],
      table: {
        defaultValue: { summary: '' },
      },
    },
    variant: {
      table: {
        disable: true,
      },
    },
    getPConnect: {
      table: {
        disable: true,
      },
    },
    emojiConfig: {
      control: {
        type: 'text',
      },
      description: 'JSON configuration mapping status values to emojis',
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'Current field value - try typing "Failed", "Completed", "In Progress", etc.',
    },
    label: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A text input field that displays emojis next to the input based on configurable status mappings.',
      },
    },
  },
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof AnyExtTextInputEmoji>;

// Story component wrapper
const StoryWrapper = ({ initialValue, ...args }: any) => {
  const [value, setValue] = useState(initialValue);

  const props = {
    value,
    hasSuggestions: false,
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
            triggerFieldChange: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    },
    ...args,
  };

  return <AnyExtTextInputEmoji {...props} />;
};

// Default story with standard status emojis
export const Default: Story = {
  render: (args) => <StoryWrapper initialValue="Failed" {...args} />,
  args: {
    label: 'Project Status',
    placeholder: 'Enter status (e.g., Completed, Failed, In Progress, Pending)',
    testId: configProps.testId,
    readOnly: configProps.readOnly,
    disabled: configProps.disabled,
    required: configProps.required,
    status: configProps.status,
    hideLabel: configProps.hideLabel,
    displayMode: configProps.displayMode,
    validatemessage: configProps.validatemessage,
    emojiConfig: configProps.emojiConfig
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage with standard status emojis. Try typing different status values like "Completed", "Failed", "In Progress", or "Pending" to see the emojis change.',
      },
    },
  },
};

// Project status story
export const ProjectStatus: Story = {
  render: (args) => <StoryWrapper initialValue="In Progress" {...args} />,
  args: {
    label: 'Project Phase',
    placeholder: 'Enter project phase...',
    emojiConfig: '{"status_emojis":[{"status":"Not Started","emoji":"🔴"},{"status":"In Progress","emoji":"🟡"},{"status":"Review","emoji":"🔵"},{"status":"Completed","emoji":"🟢"},{"status":"On Hold","emoji":"⏸️"}]}',
  },
  parameters: {
    docs: {
      description: {
        story: 'Project status example with color-coded emojis. Try: "Not Started", "In Progress", "Review", "Completed", or "On Hold".',
      },
    },
  },
};

// Order status story  
export const OrderStatus: Story = {
  render: (args) => <StoryWrapper initialValue="Shipped" {...args} />,
  args: {
    label: 'Order Status',
    placeholder: 'Enter order status...',
    emojiConfig: '{"status_emojis":[{"status":"Ordered","emoji":"📦"},{"status":"Processing","emoji":"⚙️"},{"status":"Shipped","emoji":"🚚"},{"status":"Delivered","emoji":"✅"},{"status":"Cancelled","emoji":"❌"}]}',
  },
  parameters: {
    docs: {
      description: {
        story: 'E-commerce order tracking example. Try: "Ordered", "Processing", "Shipped", "Delivered", or "Cancelled".',
      },
    },
  },
};

// Priority levels story
export const PriorityLevels: Story = {
  render: (args) => <StoryWrapper initialValue="High" {...args} />,
  args: {
    label: 'Priority Level',
    placeholder: 'Enter priority level...',
    emojiConfig: '{"status_emojis":[{"status":"Low","emoji":"🟢"},{"status":"Medium","emoji":"🟡"},{"status":"High","emoji":"🟠"},{"status":"Critical","emoji":"🔴"},{"status":"Emergency","emoji":"🚨"}]}',
  },
  parameters: {
    docs: {
      description: {
        story: 'Priority levels with escalating color scheme. Try: "Low", "Medium", "High", "Critical", or "Emergency".',
      },
    },
  },
};

// Display modes story
export const DisplayModes: Story = {
  render: (args) => <StoryWrapper initialValue="Completed" {...args} />,
  args: {
    label: 'Task Status',
    displayMode: 'LABELS_LEFT',
    emojiConfig: configProps.emojiConfig,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing labels left display mode. Change the displayMode control to see different layouts.',
      },
    },
  },
};

// Read-only display story
export const ReadOnlyDisplay: Story = {
  render: (args) => <StoryWrapper initialValue="Completed" {...args} />,
  args: {
    label: 'Final Status',
    readOnly: true,
    emojiConfig: configProps.emojiConfig,
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only field showing how the component displays in non-editable mode.',
      },
    },
  },
};