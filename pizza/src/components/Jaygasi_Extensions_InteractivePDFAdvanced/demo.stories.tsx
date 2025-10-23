import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import JaygasiExtensionsInteractivePDFAdvanced from './index';
// reuse the sample base64 from the existing pdfViewer mock
import { configProps as pdfViewerMockConfig } from '../Jaygasi_Extensions_pdfViewer/mock';

// Extract the sample base64 PDF at the top level
const sampleBase64Pdf = pdfViewerMockConfig?.pdfSource || '';

// Default highlight data
const defaultTextHighlights = [
  { id: 'text1', text: 'Jay', confidence: 0.95 },
  { id: 'text2', text: 'PROFESSIONAL', confidence: 0.9 },
  { id: 'text3', text: 'Data', confidence: 0.85 },
  { id: 'text4', text: '20', confidence: 0.88 }
];

const defaultCoordinateHighlights = [
  { id: 'coord1', confidence: 0.95, pageIndex: 0, boundingBox: { left: 15/100, top: 20/100, right: 27/100, bottom: 23/100 } },
  { id: 'coord2', confidence: 0.88, pageIndex: 0, boundingBox: { left: 30/100, top: 20/100, right: 45/100, bottom: 23/100 } },
  { id: 'coord3', confidence: 0.92, pageIndex: 0, boundingBox: { left: 50/100, top: 35/100, right: 68/100, bottom: 38/100 } }
];
const mockPConnect = (args?: any) => {
  return {
    getValue: (path: string) => {
      if (path === (args?.pdfProperty || 'pdfBase64')) return sampleBase64Pdf;
      return null;
    },
    getActionsApi: () => ({ updateFieldValue: (_path: string, _value: any) => {} }),
    registerComponent: (_pdfUrl: string, _searchTerms: string) => {
      // Mock implementation - no-op for Storybook
    },
    getConfigProps: () => ({
      enableDebugging: args?.enableDebugging ?? true,
      pdfProperty: 'pdfBase64',
      textHighlightJSON: args?.textHighlightJSON ?? JSON.stringify(defaultTextHighlights),
      coordinateHighlightJSON: args?.coordinateHighlightJSON ?? JSON.stringify(defaultCoordinateHighlights),
      enableSearch: args?.enableSearch ?? false,
      height: args?.height || '600px',
      confidenceFilter: args?.confidenceFilter || ''
    })
  };
};

// Wrapper component for Storybook controls
const StorybookWrapper = (args: any) => {
  const mockPConnectWithArgs = mockPConnect(args);
  return <JaygasiExtensionsInteractivePDFAdvanced getPConnect={() => mockPConnectWithArgs} />;
};

const meta: Meta = {
  title: 'Jaygasi/InteractivePDFAdvanced',
  component: StorybookWrapper,
  argTypes: {
    height: {
      control: 'text',
      description: 'Component height (CSS value)',
      defaultValue: '600px'
    },
    enableDebugging: {
      control: 'boolean',
      description: 'Show debug information panel',
      defaultValue: true
    },
    textHighlightJSON: {
      control: 'text',
      description: 'JSON string for text-based highlights',
      defaultValue: JSON.stringify(defaultTextHighlights)
    },
    coordinateHighlightJSON: {
      control: 'text',
      description: 'JSON string for coordinate-based highlights',
      defaultValue: JSON.stringify(defaultCoordinateHighlights)
    },
    confidenceFilter: {
      control: 'text',
      description: 'Minimum confidence threshold (0-1)',
      defaultValue: ''
    },
    enableSearch: {
      control: 'boolean',
      description: 'Enable search functionality',
      defaultValue: false
    }
  }
};
export default meta;

type Story = StoryObj<typeof StorybookWrapper>;

export const Base: Story = {
  args: {
    enableDebugging: true,
    height: '600px',
    textHighlightJSON: JSON.stringify(defaultTextHighlights),
    coordinateHighlightJSON: JSON.stringify(defaultCoordinateHighlights)
  },
};

export const NoCoordinateHighlights: Story = {
  args: {
    enableDebugging: true,
    height: '600px',
    textHighlightJSON: JSON.stringify(defaultTextHighlights),
    coordinateHighlightJSON: ''
  },
};

export const DirectJSON: Story = {
  args: {
    enableDebugging: true,
    height: '700px'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ height: 700 }}>
          <StorybookWrapper {...args} />
        </div>
      </div>
      <div style={{ width: 360, padding: 8, boxSizing: 'border-box' }}>
        <TestHarness />
      </div>
    </div>
  )
};

function TestHarness() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h4>JSON Format Examples</h4>
      <p>This component now accepts JSON directly through the textHighlightJSON and coordinateHighlightJSON properties.</p>
      
      <div style={{ marginTop: 12 }}>
        <h5>Text Highlights JSON Format (Simplified):</h5>
        <p>Now only text and confidence are required - bounding boxes are calculated automatically!</p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: 8, fontSize: 12, overflow: 'auto' }}>
{JSON.stringify([
  { "id": "text1", "text": "word", "confidence": 0.95 },
  { "id": "text2", "text": "phrase", "confidence": 0.88 }
], null, 2)}
        </pre>
      </div>
      
      <div style={{ marginTop: 12 }}>
        <h5>Coordinate Highlights JSON Format (Simplified):</h5>
        <p>Now accepts a direct array of highlights - no pxResults wrapper needed!</p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: 8, fontSize: 12, overflow: 'auto' }}>
{JSON.stringify([
  { "id": "highlight1", "confidence": 0.95, "pageIndex": 0, "boundingBox": { "left": 0.1, "top": 0.2, "right": 0.3, "bottom": 0.25 } },
  { "id": "highlight2", "confidence": 0.88, "pageIndex": 0, "boundingBox": { "left": 0.4, "top": 0.3, "right": 0.6, "bottom": 0.35 } }
], null, 2)}
        </pre>
      </div>
      
      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        Use the Storybook controls above to modify the JSON and see the highlights update in real-time.
      </div>
    </div>
  );
}

const TextHighlightingComponent = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h4>Text-Based Highlighting Example</h4>
      <p>This demonstrates text-based highlighting where the component searches for specific words/phrases within the PDF content.</p>
      
      <div style={{ marginTop: 12 }}>
        <StorybookWrapper 
          textHighlightJSON={JSON.stringify([
            { "id": "text1", "text": "Jay", "confidence": 0.95, "pageIndex": 0, "boundingBox": { "left": 0.1, "top": 0.15, "right": 0.2, "bottom": 0.2 } },
            { "id": "text2", "text": "Data", "confidence": 0.88, "pageIndex": 0, "boundingBox": { "left": 0.5, "top": 0.3, "right": 0.6, "bottom": 0.35 } }
          ])}
          enableDebugging={true}
        />
      </div>
      
      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        The component automatically searches for the specified text within the PDF and highlights matches.
      </div>
    </div>
  );
};

export const TextHighlighting: Story = {
  render: () => <TextHighlightingComponent />
};
