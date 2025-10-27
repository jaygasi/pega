// @ts-nocheck
import * as React from 'react';

interface PDFViewerDiagnosticsProps {
  value: string;
  height: string;
}

export const PDFViewerDiagnostics: React.FC<PDFViewerDiagnosticsProps> = ({ value, height }) => {
  const getValuePreview = (val: string) => {
    if (!val) return 'No value';
    if (val.length > 100) {
      return `${val.substring(0, 100)}...`;
    }
    return val;
  };

  return (
    <div style={{
      background: '#f0f0f0',
      border: '1px solid #ccc',
      padding: '8px',
      marginBottom: '8px',
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <strong>PDFViewer Diagnostics:</strong><br />
      Value: {getValuePreview(value)}<br />
      Height: {height}<br />
      Value Length: {value?.length || 0}<br />
      Is Base64: {value?.startsWith('data:') || /^([A-Za-z0-9+/=])+$/.test(value) ? 'Yes' : 'No'}<br />
      Is URL: {value?.startsWith('http') ? 'Yes' : 'No'}<br />
      Is Blob: {value?.startsWith('blob:') ? 'Yes' : 'No'}
    </div>
  );
};