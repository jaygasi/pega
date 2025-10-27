import { render, screen } from '@testing-library/react';
import PegaExtensionsSmartTextInput from './index';

// Mock getPConnect for testing
const mockGetPConnect = () => ({
  getActionsApi: () => ({
    updateFieldValue: jest.fn()
  }),
  getStateProps: () => ({
    value: 'testProperty'
  })
});

describe('PegaExtensionsSmartTextInput', () => {
  test('renders with basic props', () => {
    render(
      <PegaExtensionsSmartTextInput
        getPConnect={mockGetPConnect}
        label="Test Input"
        value="test value"
      />
    );
    
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  test('shows PDF search indicator when enabled', () => {
    render(
      <PegaExtensionsSmartTextInput
        getPConnect={mockGetPConnect}
        label="Test Input"
        value="test"
        enablePDFSearch={true}
      />
    );
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders in display mode', () => {
    render(
      <PegaExtensionsSmartTextInput
        getPConnect={mockGetPConnect}
        label="Test Input"
        value="test value"
        displayMode="DISPLAY_ONLY"
      />
    );
    
    const input = screen.getByDisplayValue('test value');
    expect(input).toBeDisabled();
  });
});