# Pega Constellation React Development Environment

This project provides a complete development environment for building React components that can be used in Pega Constellation 24.2 applications.

## Prerequisites

- Node.js 20.16.0 or higher
- npm 10.8.1 or higher
- Pega Infinity 24.2.0+ server with Constellation-enabled application
- VS Code (recommended)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will start the React development server at `http://localhost:3000`.

### 3. Start Storybook (Optional)

```bash
npm run storybook
```

This will start Storybook at `http://localhost:6006` for component development and testing.

## Project Structure

```
src/
├── components/
│   ├── custom/                 # Custom Pega DX components
│   │   └── SampleCustomButton/ # Example custom button component
│   └── override-sdk/           # Override existing SDK components
├── types/
│   └── pega.ts                # Pega-specific TypeScript definitions
├── utils/
│   └── pegaHelpers.ts         # Utility functions for Pega integration
├── App.tsx                    # Main application component
└── index.tsx                  # Application entry point
```

## Creating Custom Components

### 1. Component Structure

Each custom component should follow this structure:

```
src/components/custom/YourComponent/
├── YourComponent.tsx          # Main component file
├── YourComponent.css          # Component styles
├── config.json               # Pega component configuration
├── index.ts                  # Export file
└── YourComponent.stories.tsx  # Storybook stories (optional)
```

### 2. Component Configuration

The `config.json` file defines how your component appears in Pega App Studio:

```json
{
  "name": "YourComponent",
  "type": "widget",
  "label": "Your Component",
  "description": "Description of your component",
  "organization": "YourOrg",
  "library": "YourLibrary",
  "properties": [
    {
      "name": "propertyName",
      "label": "Property Label",
      "type": "string",
      "required": true,
      "defaultValue": "default"
    }
  ]
}
```

### 3. Component Implementation

Use the provided TypeScript interfaces and utility functions:

```tsx
import React from 'react';
import { PegaComponentProps } from '../../types/pega';
import { getPConnect, getPropertyValue } from '../../utils/pegaHelpers';

interface YourComponentProps extends PegaComponentProps {
  // Your custom props
}

export const YourComponent: React.FC<YourComponentProps> = (props) => {
  const pConnect = getPConnect(props);
  
  // Component implementation
  return <div>Your component JSX</div>;
};
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## VS Code Configuration

This project includes VS Code configuration for:

- **Settings**: Optimized for React and TypeScript development
- **Extensions**: Recommended extensions for Pega development
- **Tasks**: Pre-configured tasks for common operations
- **Launch**: Debug configurations for React and Storybook

### Recommended Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Auto Rename Tag
- Path Intellisense

## Pega Integration

### Component Types

- **Widget**: Interactive components (buttons, inputs, etc.)
- **Field**: Data entry components
- **Template**: Layout components
- **Region**: Container components

### Key Concepts

1. **PConnect**: The bridge between your component and Pega's data layer
2. **Component Configuration**: Defines properties and behavior in App Studio
3. **Property Binding**: Connect component props to Pega data properties
4. **Action Handling**: Execute Pega actions from your components

### Best Practices

1. **Import Management**: Update import statements when overriding composite components
2. **Type Safety**: Use TypeScript interfaces for better development experience
3. **Error Handling**: Implement proper error handling for Pega API calls
4. **Accessibility**: Follow accessibility guidelines for better user experience
5. **Testing**: Use Storybook for component testing and documentation

## Publishing Components

To publish components to your Pega Platform:

1. Configure your Pega server connection in `sdk-config.json`
2. Run the publish command: `npm run publishComponent`
3. Use the component in App Studio

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all import paths are correct and relative
2. **PConnect Undefined**: Check that component is properly integrated with Pega
3. **Configuration Issues**: Validate `config.json` syntax and property definitions
4. **Build Errors**: Check TypeScript types and ESLint rules

### Getting Help

- [Pega Constellation SDKs Documentation](https://docs.pega.com/bundle/constellation-sdk/)
- [React SDK GitHub Repository](https://github.com/pegasystems/react-sdk)
- [Pega Community](https://community.pega.com/)

## License

This project is licensed under the Apache 2.0 License.

