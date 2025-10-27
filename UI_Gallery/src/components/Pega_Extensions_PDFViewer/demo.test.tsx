// @ts-nocheck
import { render, screen } from '@testing-library/react';
import PegaExtensionsPDFViewer from './index';

describe('PegaExtensionsPDFViewer', () => {
  it('renders without crashing', () => {
    render(<PegaExtensionsPDFViewer value="" height="400px" />);
    expect(screen.getByTestId('pdf-viewer-wrapper')).toBeInTheDocument();
  });

  it('shows loading state when value is provided', () => {
    render(<PegaExtensionsPDFViewer value="test.pdf" height="400px" />);
    expect(screen.getByText('Loading PDF...')).toBeInTheDocument();
  });

  it('shows no PDF message when no value', () => {
    render(<PegaExtensionsPDFViewer value="" height="400px" />);
    expect(screen.getByText('No PDF provided')).toBeInTheDocument();
  });
});