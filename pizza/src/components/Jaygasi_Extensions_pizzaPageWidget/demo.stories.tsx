
/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import JaygasiExtensionsPizzaPageWidget from './index';


import configProps from './mock';

const meta: Meta<typeof JaygasiExtensionsPizzaPageWidget> = {
  title: 'JaygasiExtensionsPizzaPageWidget',
  component: JaygasiExtensionsPizzaPageWidget,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsPizzaPageWidget>;

if (!window.PCore) {
  window.PCore = {} as any;
}

const worklistData = {
  data: {
    data: [
      {
        pxProcessName: 'Loan',
        pxRefObjectInsName: ' A-8002',
        pyAssignmentStatus: 'New',
        pxTaskLabel: 'Details'
      },
      {
        pxProcessName: 'Loan',
        pxRefObjectInsName: ' A-7001',
        pyAssignmentStatus: 'Open',
        pxTaskLabel: 'Info'
      },
      {
        pxProcessName: 'Loan',
        pxRefObjectInsName: ' A-9000',
        pyAssignmentStatus: 'Open',
        pxTaskLabel: 'Amount'
      }
    ]
  }
};

export const BaseJaygasiExtensionsPizzaPageWidget: Story = (args: any) => {

  window.PCore.getDataApiUtils = () => {
    return {
      getData: () => {
        return new Promise(resolve => {
          resolve(worklistData);
        });
      },
      getDataAsync: () => {
        return new Promise(resolve => {
          resolve(worklistData);
        });
      }
    } as any;
  };

  const props = {
    ...configProps,
    getPConnect: () => {
      return {
        getValue: (value: any) => {
          return value;
        },
        getContextName: () => {
          return 'app/primary_1';
        },
        getLocalizedValue: (value: any) => {
          return value;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {
              /* nothing */
            },
            triggerFieldChange: () => {
              /* nothing */
            }
          };
        },
        ignoreSuggestion: () => {
          /* nothing */
        },
        acceptSuggestion: () => {
          /* nothing */
        },
        setInheritedProps: () => {
          /* nothing */
        },
        resolveConfigProps: () => {
          /* nothing */
        }
      };
    }
  };

  return (
      <>
        <JaygasiExtensionsPizzaPageWidget {...props} {...args} />
      </>
    );
};

BaseJaygasiExtensionsPizzaPageWidget.args = {
  header: configProps.header,
  description: configProps.description,
  whatsnewlink: configProps.whatsnewlink,
  datasource: configProps.datasource,
};
