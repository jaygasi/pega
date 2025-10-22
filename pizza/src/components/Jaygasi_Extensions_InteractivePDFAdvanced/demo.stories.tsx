import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import JaygasiExtensionsInteractivePDFAdvanced from './index';
// reuse the sample base64 from the existing pdfViewer mock
import { configProps as pdfViewerMockConfig } from '../Jaygasi_Extensions_pdfViewer/mock';

// Extract the sample base64 PDF at the top level
const sampleBase64Pdf = pdfViewerMockConfig?.pdfSource || '';

// Default text highlight data - TEXT-BASED highlighting (no coordinates needed)
const defaultTextHighlights = [
  { id: 'text-1', text: 'Jay', confidence: 0.95, pageIndex: 0 },
  { id: 'text-2', text: 'PROFESSIONAL', confidence: 0.9, pageIndex: 0 },
  { id: 'text-3', text: 'Data', confidence: 0.85, pageIndex: 0 }
];

const defaultCoordinateHighlights = [
  { id: 'coord1', confidence: 0.95, pageIndex: 0, boundingBox: { left: 15/100, top: 20/100, right: 27/100, bottom: 23/100 } },
  { id: 'coord2', confidence: 0.88, pageIndex: 0, boundingBox: { left: 30/100, top: 20/100, right: 45/100, bottom: 23/100 } },
  { id: 'coord3', confidence: 0.92, pageIndex: 0, boundingBox: { left: 50/100, top: 35/100, right: 68/100, bottom: 38/100 } }
];
const mockPConnect = (args?: any) => {
  // Parse highlight data from args or use defaults
  let textHighlights = defaultTextHighlights;
  let coordinateHighlights = defaultCoordinateHighlights;

  // Handle default text highlights JSON (for programmatic control)
  try {
    if (args?.defaultTextHighlightsJson) {
      const parsed = JSON.parse(args.defaultTextHighlightsJson);
      if (Array.isArray(parsed)) {
        textHighlights = parsed;
      }
    }
  } catch (e) {
    console.warn('Error parsing defaultTextHighlightsJson:', e);
  }

  // Handle default coordinate highlights JSON (for programmatic control)
  try {
    if (args?.defaultCoordinateHighlightsJson) {
      const parsed = JSON.parse(args.defaultCoordinateHighlightsJson);
      if (Array.isArray(parsed)) {
        coordinateHighlights = parsed;
      }
    }
  } catch (e) {
    console.warn('Error parsing defaultCoordinateHighlightsJson:', e);
  }

  return {
    getValue: (path: string) => {
      if (path === (args?.pdfProperty || 'pdfBase64')) return sampleBase64Pdf;
      if (path === (args?.highlightProperty || 'highlights')) return { pxResults: [] };
      // Only return textHighlights if textHighlightJSON is not set (to avoid double processing)
      if (path === (args?.textHighlightProperty || 'textHighlights') && !args?.textHighlightJSON) {
        return { pxResults: textHighlights };
      }
      return null;
    },
    getActionsApi: () => ({ updateFieldValue: (_path: string, _value: any) => {} }),
    registerComponent: (_pdfUrl: string, _searchTerms: string) => {
      // Mock implementation - no-op for Storybook
    },
    getConfigProps: () => ({
      enableDebugging: args?.enableDebugging ?? true,
      pdfProperty: args?.pdfProperty || 'pdfBase64',
      highlightProperty: args?.highlightProperty || 'highlights',
      textHighlightProperty: args?.textHighlightProperty || 'textHighlights',
      additionalHighlightProps: args?.additionalHighlightProps || '',
      textHighlightJSON: args?.textHighlightJSON || '', // User can override with JSON string
      onSelectProperty: 'selectedHighlight',
      height: args?.height || '600px',
      confidenceFilter: args?.confidenceFilter || '',
      testPxResultsJson: args?.testPxResultsJson || JSON.stringify(coordinateHighlights)
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
    pdfProperty: {
      control: 'text',
      description: 'Property name for PDF base64 data',
      defaultValue: 'pdfBase64'
    },
    highlightProperty: {
      control: 'text',
      description: 'Property name for coordinate highlights',
      defaultValue: 'highlights'
    },
    textHighlightProperty: {
      control: 'text',
      description: 'Property name for text highlights',
      defaultValue: 'textHighlights'
    },
    additionalHighlightProps: {
      control: 'text',
      description: 'Comma-separated list of additional highlight properties',
      defaultValue: ''
    },
    textHighlightJSON: {
      control: 'text',
      description: 'JSON string for additional text highlights',
      defaultValue: ''
    },
    enableSearch: {
      control: 'boolean',
      description: 'Enable search functionality',
      defaultValue: false
    },
    enableDebugging: {
      control: 'boolean',
      description: 'Show debug information panel',
      defaultValue: true
    },
    confidenceFilter: {
      control: 'text',
      description: 'Minimum confidence threshold (0-1)',
      defaultValue: ''
    },
    height: {
      control: 'text',
      description: 'Component height (CSS value)',
      defaultValue: '600px'
    },
    testPxResultsJson: {
      control: 'text',
      description: 'JSON string for test coordinate highlights',
      defaultValue: ''
    },
    defaultTextHighlightsJson: {
      control: 'text',
      description: 'JSON string for default text highlights data',
      defaultValue: JSON.stringify(defaultTextHighlights)
    },
    defaultCoordinateHighlightsJson: {
      control: 'text',
      description: 'JSON string for default coordinate highlights data',
      defaultValue: JSON.stringify(defaultCoordinateHighlights)
    }
  }
};
export default meta;

type Story = StoryObj<typeof StorybookWrapper>;

export const Base: Story = {
  args: {
    enableDebugging: true,
    height: '600px',
    defaultTextHighlightsJson: JSON.stringify(defaultTextHighlights)
  },
};

export const WithTextHighlightJSON: Story = {
  args: {
    enableDebugging: true,
    height: '600px',
    textHighlightJSON: JSON.stringify([
      { id: 'custom-1', text: 'Jay', confidence: 0.95, pageIndex: 0 },
      { id: 'custom-2', text: 'Data', confidence: 0.85, pageIndex: 0 }
    ])
  },
};

export const DirectJSON: Story = {
  args: {
    enableDebugging: true,
    height: '600px'
  },
};

function TestHarness() {
  const [text, setText] = useState('');

  const apply = () => {
    if (!text) return;
    try {
      const parsed = JSON.parse(text);
      console.log('Parsed JSON for highlights:', parsed);
      // TODO: Implement dynamic highlight application
      alert('Dynamic highlight application not yet implemented. Use the textHighlightJSON control instead.');
    } catch (err) {
      console.warn('Invalid JSON', err);
      alert('Invalid JSON format');
    }
  };

  const clear = () => {
    console.log('Clear highlights requested');
    // TODO: Implement dynamic highlight clearing
    alert('Dynamic highlight clearing not yet implemented.');
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h4>Test Highlight JSON</h4>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: 300, fontFamily: 'monospace', fontSize: 12 }}
        placeholder='Paste text highlight JSON here. Format: [{"id": "text1", "text": "word", "confidence": 0.95, "pageIndex": 0}]'
      />
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={apply}>Apply JSON</button>
        <button onClick={() => {
          const sample = { 
            pxResults: [
              { id: 'word1', confidence: 0.95, area: { left: 15, top: 25, width: 8, height: 2.5, pageindex: 0 } },
              { id: 'word2', confidence: 0.88, area: { left: 25, top: 25, width: 12, height: 2.5, pageindex: 0 } },
              { id: 'word3', confidence: 0.92, area: { left: 40, top: 30, width: 15, height: 2.5, pageindex: 0 } },
              { id: 'word4', confidence: 0.87, area: { left: 20, top: 35, width: 10, height: 2.5, pageindex: 0 } }
            ]
          };
          let attempts = 0;
          const tryCall = () => {
            const fn = (globalThis as any).__applyPDFHighlights;
            if (typeof fn === 'function') {
              fn(sample);
            } else if (attempts < 10) {
              attempts += 1;
              setTimeout(tryCall, 100);
            } else {
              try { globalThis.postMessage({ type: 'InteractivePDFAdvanced:apply', payload: sample }, globalThis.location.origin); } catch (err) { console.warn('Apply sample failed', err); }
            }
          };
          tryCall();
        }}>Apply Sample</button>
        <button onClick={clear}>Clear Highlights</button>
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        Tip: click Apply to call the viewer's global helper. If the helper is missing, enable debugging via component config.
      </div>
    </div>
  );
}

const TextHighlightingComponent = () => {
  const [textJson, setTextJson] = useState(JSON.stringify([
    { id: 'text-1', text: 'Jay', confidence: 0.95, pageIndex: 0 },
    { id: 'text-2', text: 'PROFESSIONAL', confidence: 0.9, pageIndex: 0 },
    { id: 'text-3', text: 'Data', confidence: 0.85, pageIndex: 0 }
  ], null, 2));

  const getMockPConnect = () => {
    let textHighlights = [];
    try {
      const parsed = JSON.parse(textJson);
      textHighlights = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Error parsing text JSON:', e);
      textHighlights = [];
    }

    return {
      getValue: (path: string) => {
        if (path === 'pdfBase64') return sampleBase64Pdf;
        if (path === 'highlights') return { pxResults: [] };
        if (path === 'textHighlights') return { pxResults: textHighlights };
        return null;
      },
      getActionsApi: () => ({ updateFieldValue: (_path: string, _value: any) => {} }),
      registerComponent: (_pdfUrl: string, _searchTerms: string) => {},
      getConfigProps: () => ({
        enableDebugging: true,
        pdfProperty: 'pdfBase64',
        highlightProperty: 'highlights',
        textHighlightProperty: 'textHighlights',
        additionalHighlightProps: '',
        textHighlightJSON: '',
        onSelectProperty: 'selectedHighlight',
        height: '600px',
        confidenceFilter: '',
        testPxResultsJson: JSON.stringify(defaultCoordinateHighlights)
      })
    };
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h4>Text-Based Highlighting Test</h4>
      <p>This tests the new text-based highlighting feature that searches for text within the PDF.</p>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="textHighlightsInput">Text Highlights JSON:</label>
          <textarea
            id="textHighlightsInput"
            value={textJson}
            onChange={(e) => setTextJson(e.target.value)}
            style={{ width: '100%', height: 200, fontFamily: 'monospace', fontSize: 12, marginTop: 4 }}
          />
        </div>
        <div style={{ flex: 2 }}>
          <JaygasiExtensionsInteractivePDFAdvanced
            getPConnect={getMockPConnect}
          />
        </div>
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
        Instructions: The component will automatically search for the text specified in the JSON and highlight matches.
        Open browser console to see detailed debugging information.
      </div>
    </div>
  );
};

export const TextHighlighting: Story = {
  render: () => <TextHighlightingComponent />
};
