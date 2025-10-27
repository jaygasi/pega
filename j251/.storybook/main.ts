import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../src/components/shared'],
  async viteFinal(config) {
    const workerPattern = '**/*.worker.min.js';
    const current = config.assetsInclude;

    if (Array.isArray(current)) {
      if (!current.includes(workerPattern)) {
        current.push(workerPattern);
      }
      return config;
    }

    if (!current) {
      config.assetsInclude = [workerPattern];
      return config;
    }

    config.assetsInclude = [current, workerPattern];
    return config;
  }
};
export default config;
