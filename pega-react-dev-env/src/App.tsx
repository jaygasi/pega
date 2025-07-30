import React from 'react';
import './App.css';
import { SampleCustomButton } from './components/custom/SampleCustomButton/SampleCustomButton';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Pega Constellation React Components</h1>
        <p>Development Environment for Building Custom DX Components</p>
      </header>
      
      <main className="component-showcase">
        <div className="component-demo">
          <h3>Sample Custom Button Component</h3>
          <p className="description">
            This is an example of a custom Pega DX component that can be used in Constellation applications.
          </p>
          <SampleCustomButton 
            label="Click Me!" 
            onClick={() => alert('Custom Pega component clicked!')}
            variant="primary"
          />
        </div>
        
        <div className="component-demo">
          <h3>Development Instructions</h3>
          <div className="instructions">
            <ol>
              <li>Create custom components in <code>src/components/custom/</code></li>
              <li>Override existing components in <code>src/components/override-sdk/</code></li>
              <li>Use Storybook for component development and testing</li>
              <li>Publish components to Pega Platform using the CLI</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

