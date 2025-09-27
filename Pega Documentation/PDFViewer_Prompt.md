I am building a custom PDF viewer component for a Pega 24.2 Constellation application (not UI-Kit). The component will integrate with Abbyy OCR output, which provides three key pieces of data: parsed text from a PDF, its coordinates in the document (e.g., page index, left/top/width/height as percentages), and a confidence score for accuracy. This data will be stored on the Pega clipboard at runtime (e.g., in properties like .PDFReference for the PDF URL, .HighlightData as a page list for coordinates and scores, and .ParsedText for extracted values).
Goals and Requirements:

Create a DX Widget component that renders the PDF and overlays interactive highlights (e.g., semi-transparent squares) based on the coordinates.
Display the component side-by-side with out-of-the-box Pega fields (e.g., text inputs showing parsed text) in a view—fields on the left, PDF on the right.
Enable bidirectional interactivity without action sets (since Constellation uses views and React components, not dynamic layouts or sections):

Clicking a highlight in the PDF should update a corresponding Pega field (e.g., populate .SelectedField with the parsed text or ID).
Changing a Pega field (e.g., via dropdown filter) should dynamically update the PDF highlights (e.g., filter or recolor based on confidence score).


Use PConnect for data binding, state updates, and communication between the custom component and Pega's client-side store.
Incorporate confidence scores visually (e.g., color highlights green for high confidence, red for low).
Handle practical aspects: PDF loading from URL or binary, zooming/pagination, performance for large PDFs, error handling (e.g., invalid coordinates), and accessibility.

Questions:

Is this feasible in Pega 24.2 Constellation? What are potential challenges and workarounds?
What React libraries do you recommend for PDF rendering and coordinate-based highlighting (e.g., react-pdf, @react-pdf-viewer/core)? Provide pros/cons and integration tips.
How to manage interactivity declaratively (e.g., using PConnect.getActionsApi().updateFieldValue() for state changes)?
Provide a step-by-step guide to implementation, including: project setup, component scaffolding, data model in Pega, code snippets for index.tsx and Storybook testing, publishing/deployment, and advanced best practices (e.g., memoization, theming with Pega tokens).

Please structure your response as a comprehensive Markdown document with sections for architecture, setup, implementation, interactivity, deployment, and best practices. Include verifiable sources as external website links (no downloads, GitHub issues, forums, Reddit, YouTube, Twitter, StackOverflow, Wikipedia, blogs, news, social media, or other AI sites).