
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import type { Meta, StoryObj } from '@storybook/react';

import { AppAnnouncement as PegaAppAnnouncement } from '@pega/cosmos-react-work';

import JaygasiExtensionsPizzaPage from './index';
import { pyHome1Resolved, pyHome1Raw } from './mock';

const meta: Meta<typeof JaygasiExtensionsPizzaPage> = {
  title: 'JaygasiExtensionsPizzaPage',
  component: JaygasiExtensionsPizzaPage,
  excludeStories: /.*Data$/,
};

export default meta;
type Story = StoryObj<typeof JaygasiExtensionsPizzaPage>;

export const BaseJaygasiExtensionsPizzaPage: Story = (args: any) => {
  if (!window.PCore) {
    window.PCore = {} as any;
  }

  window.PCore.getLocaleUtils = () => {
    return {
      getLocaleValue: (val: any) => {
        return val;
      }
    } as any;
  };

  const configProps = pyHome1Resolved.children[0].children[0].config;

  const props = {
    useConfigurableLayout: false,
    icon: pyHome1Raw.config.icon,

    getPConnect: () => {
      return {
        getStateProps: () => {
          return {};
        },
        getActionsApi: () => {
          return {
            getNextWork: () => {
              return new Promise(resolve => {
                resolve({});
              });
            },
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        getChildren: () => {
          return pyHome1Raw.children;
        },
        getComponentName: () => {
          return '';
        },
        getLocalizedValue: (value: any) => {
          return value;
        },
        getRawMetadata: () => {
          return pyHome1Raw;
        },
        createComponent: (config: any) => {
          if (config.type === 'AppAnnouncement') {
            return (
              <PegaAppAnnouncement
                key='app-announcements'
                heading='Announcements'
                description={configProps.description}
                whatsNewLink={configProps.whatsnewlink}
                image={configProps.image.replace(/ /g, '+')}
                datasource={configProps.datasource}
                label={configProps.label}
                getPConnect={() => {
                  return {
                    getChildren: () => {
                      return pyHome1Resolved.children;
                    }
                  };
                }}
              />
            );
          }
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  const regionAChildren = pyHome1Raw.children[0].children.map(child => {
    return props.getPConnect().createComponent(child);
  });

  return (
    <>
      <JaygasiExtensionsPizzaPage {...props} {...args}>{regionAChildren}</JaygasiExtensionsPizzaPage>
    </>
  );
};

BaseJaygasiExtensionsPizzaPage.args = {
  title: 'Page Template',
  enableGetNextWork: pyHome1Raw.config.enableGetNextWork,
};
