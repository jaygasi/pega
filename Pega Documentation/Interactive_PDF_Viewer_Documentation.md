# Building an Interactive, Coordinate-Aware PDF Viewer as a Pega 24.2 Constellation DX Component

This document provides a comprehensive guide to developing an interactive PDF viewer as a custom Digital Experience (DX) component for the Pega 24.2 Constellation platform. It outlines the architectural principles, technical implementation, and best practices for creating a robust, maintainable, and performant component that renders PDFs with coordinate-based highlights and facilitates bidirectional communication with standard Pega fields using a declarative, state-driven approach.

## Architectural Blueprint: Integrating React and Pega Constellation

The Pega Constellation framework marks a significant shift from traditional server-side rendering to a client-centric Single Page Application (SPA) architecture built on ReactJS. This transition redefines data management, component interaction, and UI construction, moving away from traditional Pega action sets to achieve dynamic, real-time interactivity at the component level. For an interactive PDF viewer, this necessitates adopting client-side principles for state management, data flow, and component communication.

### Strategic Considerations for Custom Development

Creating a custom DX component is straightforward with Pega’s tools but has long-term governance and maintenance implications. Constellation prioritizes configuration over customization to ensure faster development, consistent user experiences, and seamless platform upgrades. Custom components should be a last resort, validated by an organization’s Center of Excellence (COE) to confirm that out-of-the-box components cannot meet the business need. Developers must maintain custom components to ensure compatibility with future Pega Infinity releases, avoiding technical debt and preserving Constellation’s benefits.

### The Role of the DX Component

A Constellation DX component acts as an adapter, connecting the Pega Constellation orchestration engine to a React component or third-party library. It operates within a defined boundary, receiving context, data, and APIs via the `PConnect` object. This enforces a clean separation of concerns, aligning with the Model-View-Controller (MVC) pattern:

- **Model**: Pega platform handles business logic, data persistence, and case processing.
- **Controller**: Constellation engine orchestrates data flow and UI metadata.
- **View**: DX component and React library render the UI and handle interactions.

This separation ensures the component’s logic remains decoupled from Pega’s backend, enhancing reusability and maintainability.

## State Management Strategy

Effective state management distinguishes between **Pega-managed state** and **local component state**:

- **Pega-Managed State**: The single source of truth for business process data (e.g., PDF source URL, highlight coordinates). It is passed from the server to the client during view load, managed in a client-side Redux store, and accessed via `PCore` and `PConnect` APIs.
- **Local Component State**: Ephemeral, UI-specific data (e.g., zoom level, active page number) managed with React hooks (`useState`, `useReducer`). This state is not visible to Pega or other components.

For the PDF viewer, Pega-managed state includes the `.PDFReference` property (PDF URL) and `.HighlightData` page list (highlight coordinates). Local state manages UI elements like zoom or loading indicators. This distinction optimizes performance by minimizing unnecessary communication with Pega’s state layer.

### Understanding the Clipboard in Constellation

Unlike the traditional server-side clipboard, Constellation’s stateless architecture constructs the clipboard per request and discards it afterward. The DX component accesses a client-side representation of case data via `PConnect.getValue()`, not a live server call, aligning with the SPA model and improving performance.

## Action Set-less Communication Pattern

Constellation replaces imperative action sets with a declarative, state-driven model. Components communicate by updating shared Pega-managed state, triggering automatic re-renders of dependent components via React. For example, clicking a highlight in the PDF viewer updates a Pega property using `PConnect`, causing a bound text input to re-render with the new value. This decoupled, scalable pattern is central to the PDF viewer’s interactivity with standard Pega fields.

## Environment and Project Initialization for Pega 24.2

A correctly configured development environment is critical for building DX components compatible with Pega Infinity 24.2.

### Prerequisites

- **Node.js**: Version 20.x (JavaScript runtime for build scripts).
- **npm**: Version 10.x (dependency management, installed with Node.js).
- **Git**: Version 2.30 or later (for package dependencies and source control).

Use a version manager like `nvm` to manage Node.js versions across projects.

### Project Initialization

The Constellation DX Component Builder CLI scaffolds a React project:

1. Create a project directory:
   ```bash
   mkdir MyPegaDXComponents
   cd MyPegaDXComponents
   ```
2. Run the initialization command:
   ```bash
   npx @pega/custom-dx-components@~24.2 init
   ```
3. Complete prompts:
   - **Project name**: e.g., `PDFViewerProject`.
   - **Organization name**: e.g., `MyOrg` (forms part of the component’s unique key).
   - **Description**: Purpose of the project.
   - **Author**: Developer or team name.

This creates a project directory (`PDFViewerProject`) with a pre-configured React environment.

### Project Structure

Key files include:

- **`package.json`**: Manages dependencies (e.g., `@pega/cosmos-react-core`) and scripts (`create`, `startStorybook`, `publish`). Do not alter `@pega/` package versions.
- **`tasks.config.json`**: Configures server URL and OAuth 2.0 credentials for publishing.
- **`src/components/`**: Directory for custom DX components.

## Scaffolding the Component and Integrating the PDF Viewer

### Choosing the Component Type

Constellation supports three DX component types:
- **Field**: For single-property controls (e.g., custom text input).
- **Layout Template**: For structural layouts.
- **Widget**: For self-contained, complex features.

The PDF viewer, with its complex document rendering and interactivity, is best implemented as a **Widget**.

### Creating the Component

Run the create script:
```bash
npm run create
```
Provide:
- **Type**: Widget.
- **Subtype**: e.g., `PDFViewer`.
- **Component name**: e.g., `DocumentViewer` (CamelCase).
- **Component label**: e.g., `Interactive Document Viewer`.
- **Component version**: e.g., `0.0.1`.
- **Library name**: e.g., `IntelligentCapture`.

This generates a directory: `src/components/MyOrg_IntelligentCapture_DocumentViewer/` with files like `index.tsx`, `config.json`, and `demo.stories.tsx`.

### Selecting and Integrating a PDF Viewer Library

The `@react-pdf-viewer/core` library is chosen for its robust plugin architecture, particularly the `highlightPlugin` for coordinate-based highlights. It is performant, MIT-licensed, and depends on `pdfjs-dist`.

#### Installation

```bash
npm install @react-pdf-viewer/core@3.12.0 @react-pdf-viewer/default-layout@3.12.0 @react-pdf-viewer/highlight@3.12.0 pdfjs-dist@3.4.120
```

#### Configure PDF.js Worker

The `pdf.worker.min.js` file (from `node_modules/pdfjs-dist/build/`) must be accessible at runtime. Copy it to `src/components/MyOrg_IntelligentCapture_DocumentViewer/public/` for local testing.

#### Initial Component Rendering

Update `index.tsx` to render the PDF viewer with a test URL:

<xaiArtifact artifact_id="da1a42dc-3cfe-4390-a1ac-60c722d67a03" artifact_version_id="b95d1df3-9fc5-45d2-941f-a6f920a4f923" title="index.tsx" contentType="text/typescript">
import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { PConnFieldProps } from '@pega/react-sdk-components/lib/types/PConnProps';

interface DocumentViewerProps extends PConnFieldProps {
  // Additional props from config.json
}

export default function DocumentViewer(props: DocumentViewerProps) {
  const { getPConnect } = props;
  const pConnect = getPConnect();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const workerUrl = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
  const testPdfUrl = 'https://arxiv.org/pdf/1708.08021.pdf';

  return (
    <div style={{ height: '750px', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
      <Worker workerUrl={workerUrl}>
        <Viewer fileUrl={testPdfUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}