// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { PDFViewer } from './index';

describe('PDFViewer', () => {
  it('renders without crashing', () => {
    render(<PDFViewer value="" height="400px" />);
    expect(screen.getByTestId('pdf-viewer-wrapper')).toBeInTheDocument();
  });

  it('shows loading state when value is provided', () => {
    render(<PDFViewer value="test.pdf" height="400px" />);
    expect(screen.getByText('Loading PDF...')).toBeInTheDocument();
  });

  it('shows no PDF message when no value', () => {
    render(<PDFViewer value="" height="400px" />);
    expect(screen.getByText('No PDF provided')).toBeInTheDocument();
  });
});