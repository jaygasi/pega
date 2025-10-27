import type { StoryObj } from '@storybook/react-webpack5';
// Import via the JS wrapper to avoid editor JSX resolution diagnostics
// Import via TypeScript wrapper to avoid editor JSX resolution diagnostics
import PegaExtensionsPDFViewer from './index.stories-wrapper';

const meta = {
  title: 'Pega Extensions/PDFViewer',
  component: PegaExtensionsPDFViewer,
  parameters: {
    docs: {
      description: {
        component: 'A component for viewing PDF documents with proper scaling and toolbar options.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'PDF source URL or base64 data',
    },
    height: {
      control: 'text',
      description: 'Height of the viewer',
    },
    showToolbar: {
      control: 'boolean',
      description: 'Show PDF toolbar',
    },
    showDiagnostics: {
      control: 'boolean',
      description: 'Show diagnostic information',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsPDFViewer>;

export const Default: Story = {
  args: {
    value: 'data:application/pdf;base64,JVBERi0xLjAKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagozIDAgb2JqCjw8L1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQoSGVsbG8gV29ybGQpVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago2IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKPj4KZW5kb2JqCjcgMCBvYmoKPDwvVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EtT2JsaXF1ZQo+PgplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNTMgMDAwMDAgbiAKMDAwMDAwMDEwNyAwMDAwMCBuIAowMDAwMDAwMTY4IDAwMDAwIG4gCjAwMDAwMDAyMzIgMDAwMDAgbiAKMDAwMDAwMDI4NiAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOAovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDU5CiUlRU9GCg==',
    height: '600px',
    showToolbar: true,
    showDiagnostics: false,
  },
};

export const WithDiagnostics: Story = {
  args: {
    value: 'data:application/pdf;base64,JVBERi0xLjAKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagozIDAgb2JqCjw8L1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQoSGVsbG8gV29ybGQpVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago2IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKPj4KZW5kb2JqCjcgMCBvYmoKPDwvVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EtT2JsaXF1ZQo+PgplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNTMgMDAwMDAgbiAKMDAwMDAwMDEwNyAwMDAwMCBuIAowMDAwMDAwMTY4IDAwMDAwIG4gCjAwMDAwMDAyMzIgMDAwMDAgbiAKMDAwMDAwMDI4NiAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOAovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDU5CiUlRU9GCg==',
    height: '600px',
    showToolbar: true,
    showDiagnostics: true,
  },
};

export const NoToolbar: Story = {
  args: {
    value: 'data:application/pdf;base64,JVBERi0xLjAKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagozIDAgb2JqCjw8L1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQoSGVsbG8gV29ybGQpVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago2IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKPj4KZW5kb2JqCjcgMCBvYmoKPDwvVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EtT2JsaXF1ZQo+PgplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNTMgMDAwMDAgbiAKMDAwMDAwMDEwNyAwMDAwMCBuIAowMDAwMDAwMTY4IDAwMDAwIG4gCjAwMDAwMDAyMzIgMDAwMDAgbiAKMDAwMDAwMDI4NiAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOAovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDU5CiUlRU9GCg==',
    height: '600px',
    showToolbar: false,
    showDiagnostics: false,
  },
};