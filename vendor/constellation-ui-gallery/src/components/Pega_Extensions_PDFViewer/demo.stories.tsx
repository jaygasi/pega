import React from 'react';
import type { Meta } from '@storybook/react';
import type { StoryFn } from '@storybook/react';
import PDFViewer from './index';

export default {
  title: 'Pega Extensions/PDFViewer',
  component: PDFViewer,
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof PDFViewer>> = (args) => (
  <PDFViewer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
  height: '600px',
  debug: false,
};
