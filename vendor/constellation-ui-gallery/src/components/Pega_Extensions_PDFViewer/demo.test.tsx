/// <reference types="jest" />
import React from 'react';
import '@testing-library/jest-dom';

// Provide the Jest global to TypeScript (some TS configs treat `jest` as a namespace)
declare const jest: any;

// Jest can't import CSS from node_modules during tests; mock the viewer styles here.
(jest as any).mock('@react-pdf-viewer/core/lib/styles/index.css', () => ({}));
(jest as any).mock('@react-pdf-viewer/default-layout/lib/styles/index.css', () => ({}));

import { render, screen } from '@testing-library/react';
import PDFViewer from './index';

test('renders fallback message when no PDF provided', async () => {
  render(<PDFViewer /> as unknown as React.ReactElement);
  expect(await screen.findByText('No PDF source available')).toBeVisible();
});
