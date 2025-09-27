Requirements Document: Interactive PDF ViewerVersion: 3.0Date: September 26, 2025Author: Gemini AIStatus: Revised1. Introduction1.1. PurposeThis document specifies the core functional requirements for an Interactive PDF Viewer component. The component's primary purpose is to display a PDF document and overlay highlights on it based on a provided list of coordinates.2. Core Functional RequirementsIDRequirementDescriptionFR--001PDF Document SourceThe component must be able to render a PDF document from two types of sources provided by a Pega property: 1. A standard URL. 2. A base64 encoded string.FR-002Interaction-Driven HighlightingWhen a user clicks or selects an item from the Page List sourced via the configured property (see FR-004), the component must automatically: 1. Navigate to the correct page within the PDF document. 2. Display an overlay/highlight at the specific coordinates associated with that selected item.FR-003Standard PDF Viewer ControlsThe component must provide users with basic UI controls for navigating the PDF, including zoom in/out, and page navigation (next page, previous page, go to specific page number).FR-004Configurable Data Source for HighlightsThe component must include a configuration setting (e.g., a text input field in the Pega view configuration) allowing a developer to specify the top-level Page property that contains the pxResults Page List (e.g., myPage). The component will then dynamically read the highlight data from [user-specified-page].pxResults.3. Data Structure for HighlightingThe component must be able to receive and process a Page List property named pxResults. This list will be located within a parent Page property, whose name is defined in the component's configuration (as per FR-004). The structure for this data is as follows:The parent pxResults list contains objects for each page that has highlights.Each page object has a pageindex (starting from 0) and a nested pxResults list containing the coordinates for each highlight on that page.The coordinate values (left, top_coordinate, width, height) are fractional numbers representing their position relative to the page dimensions.3.1. Example PayloadThis example assumes the user has configured the component to look for the data source on a page named myPage.{
  "myPage": {
    "pxResults": [
      {
        "pageindex": 0,
        "pxResults": [
          {
            "left": 0.1,
            "top_coordinate": 0.1,
            "width": 0.2,
            "height": 0.05,
            "id": "test-1"
          },
          {
            "left": 0.5,
            "top_coordinate": 0.6,
            "width": 0.15,
            "height": 0.05,
            "id": "test-2"
          }
        ]
      },
      {
        "pageindex": 1,
        "pxResults": [
          {
            "left": 0.25,
            "top_coordinate": 0.3,
            "width": 0.1,
            "height": 0.1,
            "id": "test-3"
          }
        ]
      }
    ]
  }
}
