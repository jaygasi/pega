import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import JaygasiExtensionsInteractivePDFAdvanced from './index';
// reuse the sample base64 from the existing pdfViewer mock
import { configProps as pdfViewerMockConfig } from '../Jaygasi_Extensions_pdfViewer/mock';

// Minimal mock PConnect - match the small API our component uses
const mockPConnect = () => ({
  getValue: (path: string) => {
    if (path === 'pdfBase64') return sampleBase64Pdf;
    if (path === 'highlights') return { pxResults: [] };
    return null;
  },
  getActionsApi: () => ({ updateFieldValue: (_path: string, _value: any) => {} }),
  getConfigProps: () => ({
    enableDebugging: true,
    testPxResultsJson: JSON.stringify({ pxResults: [ { id: 't1', confidence: 0.95, area: { left: 10, top: 10, width: 30, height: 15, pageindex: 0 } } ] })
  })
});

const meta: Meta = {
  title: 'Jaygasi/InteractivePDFAdvanced',
  component: JaygasiExtensionsInteractivePDFAdvanced,
};
export default meta;

type Story = StoryObj<typeof JaygasiExtensionsInteractivePDFAdvanced>;

const sampleBase64Pdf = pdfViewerMockConfig?.pdfSource || '';

export const Base: Story = {
  args: {
    getPConnect: mockPConnect as any,
    PDFReference: 'pdfBase64',
    HighlightData: 'highlights',
    OnSelectProperty: 'selectedHighlight',
    height: '700px'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ height: args.height || 700 }}>
          <JaygasiExtensionsInteractivePDFAdvanced {...args} />
        </div>
      </div>
      <div style={{ width: 360, padding: 8, boxSizing: 'border-box' }}>
        <TestHarness />
      </div>
    </div>
  )
};

function TestHarness() {
  const [text, setText] = useState('');

  const apply = () => {
    if (!text) return;
    try {
      const parsed = JSON.parse(text);
      let attempts = 0;
      const tryCall = () => {
        const fn = (window as any).__applyPDFHighlights;
        if (typeof fn === 'function') {
          fn(parsed);
        } else if (attempts < 10) {
          attempts += 1;
          setTimeout(tryCall, 100);
        } else {
          // Fallback: postMessage so the component can accept the payload via message listener
          try {
            window.postMessage({ type: 'InteractivePDFAdvanced:apply', payload: parsed }, window.location.origin);
            return;
          } catch (err) {
            console.warn('InteractivePDFAdvanced: apply helper not available after waiting. Ensure enableDebugging=true in config.', err);
          }
        }
      };
      tryCall();
    } catch (err) {
      console.warn('Invalid JSON', err);
    }
  };

  const clear = () => {
    let attempts = 0;
    const tryClear = () => {
      const fn = (window as any).__clearPDFHighlights;
      if (typeof fn === 'function') fn();
      else if (attempts < 10) { attempts += 1; setTimeout(tryClear, 100); }
      else {
        try {
          window.postMessage({ type: 'InteractivePDFAdvanced:clear' }, window.location.origin);
          return;
        } catch (err) {
          console.warn('InteractivePDFAdvanced: clear helper not available.', err);
        }
      }
    };
    tryClear();
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h4>Test Highlight JSON</h4>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: 300, fontFamily: 'monospace', fontSize: 12 }}
        placeholder='Paste pxResults JSON here (object with pxResults or array)'
      />
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button onClick={apply}>Apply JSON</button>
        <button onClick={() => {
          const sample = { pxResults: [ { id: 't1', confidence: 0.95, area: { left: 10, top: 10, width: 30, height: 15, pageindex: 0 } } ] };
          let attempts = 0;
          const tryCall = () => {
            const fn = (window as any).__applyPDFHighlights;
            if (typeof fn === 'function') {
              fn(sample);
            } else if (attempts < 10) {
              attempts += 1;
              setTimeout(tryCall, 100);
            } else {
              try { window.postMessage({ type: 'InteractivePDFAdvanced:apply', payload: sample }, window.location.origin); } catch (err) { console.warn('Apply sample failed', err); }
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
