import { useEffect, useState } from 'react';
import {
  Input,
  FieldValueList,
  Text,
  withConfiguration
} from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

import StyledAnyExtTextInputEmojiWrapper from './styles';

// Interface for emoji status mapping
interface EmojiMapping {
  status: string;
  emoji: string;
}

// Interface for emoji configuration
interface EmojiConfig {
  status_emojis: EmojiMapping[];
}

// interface for props
interface AnyExtTextInputEmojiProps extends PConnFieldProps {
  // If any, enter additional props that only exist on this component here
  isTableFormatter?: boolean;
  variant?: any;
  emojiConfig?: string; // JSON string containing emoji configuration
  additionalProps?: any; // Additional props to pass to Input component
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

// Helper function to find matching emoji for a given value
const getEmojiForValue = (value: string, emojiConfig: string | undefined): string | null => {
  if (!emojiConfig || !value) {
    return null;
  }

  try {
    const config: EmojiConfig = JSON.parse(emojiConfig);
    const matchingStatus = config.status_emojis?.find(
      (item) => item.status.toLowerCase() === value.toLowerCase()
    );
    return matchingStatus ? matchingStatus.emoji : null;
  } catch (error) {
    console.warn('Invalid emoji configuration JSON:', error);
    return null;
  }
};

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function AnyExtTextInputEmoji(props: Readonly<AnyExtTextInputEmojiProps>) {
  const { 
    getPConnect, 
    value, 
    placeholder, 
    disabled = false, 
    displayMode, 
    readOnly = false, 
    required = false, 
    label, 
    hideLabel = false, 
    testId, 
    variant = 'inline',
    emojiConfig,
    helperText,
    validatemessage,
    additionalProps
  } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;

  // State management for enhanced input handling
  const [inputValue, setInputValue] = useState(value || '');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Sync internal state with external value changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Get the emoji for current value
  const emoji = getEmojiForValue(value, emojiConfig);

  const handleOnChange = (event: any) => {
    const { value: updatedValue } = event.target;
    setInputValue(updatedValue);
    setHasInteracted(true);
    actions.updateFieldValue(propName, updatedValue);
  };

  const handleBlur = () => {
    if (hasInteracted) {
      actions.triggerFieldChange(propName, inputValue);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      actions.triggerFieldChange(propName, inputValue);
    }
  };

  // Render the display component with emoji
  const renderDisplayWithEmoji = (displayValue: any) => {
    return (
      <div className="display-with-emoji">
        <span>{displayValue}</span>
        {emoji && <span className="status-emoji">{emoji}</span>}
      </div>
    );
  };

  if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
    let displayComp = value || <span aria-hidden='true'>&ndash;&ndash;</span>;
    displayComp = renderDisplayWithEmoji(displayComp);
    
    return displayMode === 'DISPLAY_ONLY' ? (
      <StyledAnyExtTextInputEmojiWrapper data-display-mode="DISPLAY_ONLY"> 
        {displayComp} 
      </StyledAnyExtTextInputEmojiWrapper>
    ) : (
      <StyledAnyExtTextInputEmojiWrapper data-display-mode="LABELS_LEFT">
        <FieldValueList
          variant={hideLabel ? 'stacked' : variant}
          data-testid={testId}
          fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
        />
      </StyledAnyExtTextInputEmojiWrapper>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    const isValDefined = typeof value !== 'undefined' && value !== '';
    const val = isValDefined ? (
      renderDisplayWithEmoji(
        <Text variant='h1' as='span'>
          {value}
        </Text>
      )
    ) : (
      ''
    );
    return (
      <StyledAnyExtTextInputEmojiWrapper data-display-mode="STACKED_LARGE_VAL">
        <FieldValueList
          variant='stacked'
          data-testid={testId}
          fields={[{ id: '2', name: hideLabel ? '' : label, value: val }]}
        />
      </StyledAnyExtTextInputEmojiWrapper>
    );
  }

  // For editable mode, render input with emoji - Match TextInputSearch structure
  return (
    <StyledAnyExtTextInputEmojiWrapper data-display-mode="EDIT">
      <Input
        type='text'
        value={inputValue}
        label={label}
        labelHidden={hideLabel}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        onChange={handleOnChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        testId={testId}
        className="input-with-emoji"
        validatemessage={validatemessage}
        helperText={helperText}
        {...additionalProps}
      />
      {emoji && <span className="status-emoji">{emoji}</span>}
    </StyledAnyExtTextInputEmojiWrapper>
  );
};

export default withConfiguration(AnyExtTextInputEmoji);