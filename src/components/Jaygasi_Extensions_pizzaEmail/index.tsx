import { useState, useEffect, useRef } from 'react';
import { Input, EmailDisplay, FieldValueList, Text, URLDisplay, PhoneDisplay, withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

// includes in bundle
import { suggestionsHandler } from './suggestions-handler';
import handleEvent from "./event-utils";

import StyledJaygasiExtensionsPizzaEmailWrapper from './styles';

// interface for props
interface JaygasiExtensionsPizzaEmailProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  helperText: string;
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  formatter: string;
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

export const formatExists = (formatterVal: string) => {
    const formatterValues = [
      "TextInput",
      "WorkStatus",
      "RichText",
      "Email",
      "Phone",
      "URL",
      "Operator"
    ];
    let isformatter = false;
    if (formatterValues.includes(formatterVal)) {
      isformatter = true;
    }
    return isformatter;
  };


export const textFormatter = (formatter: string, value: any) => {
  let displayComponent: any = null;
  switch(formatter){
    case "TextInput" : {
      displayComponent = value;
      break;
    }
    case "Email" : {
      displayComponent = (<EmailDisplay value={value} displayText={value} variant="link" />);
      break;
    }
    case "Phone" : {
      displayComponent = (<PhoneDisplay value={value} variant="link" />);
      break;
    }
    case "URL" : {
      displayComponent = (<URLDisplay target="_blank" value={value} displayText={value} variant="link" />);
      break;
    }
    // no default
  }
  return displayComponent;
};



// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaEmail(props: JaygasiExtensionsPizzaEmailProps) {
 const {
    getPConnect,
    value,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    testId,
    displayMode,
    additionalProps = {},
    variant = 'inline',
    isTableFormatter = false,
    hasSuggestions = false
  } = props;
  const { formatter } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;

  const hasValueChange = useRef(false);


  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => setInputValue(value), [value]);

  const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);

  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    }
    if (hasSuggestions) {
      setStatus('pending');
    } else if (!hasSuggestions && status !== 'success') {
      setStatus(validatemessage !== '' ? 'error' : undefined);
    }
  }, [validatemessage, hasSuggestions, status]);

  let displayComp: any = null;
  if (displayMode) {
    displayComp = <EmailDisplay value={value} displayText={inputValue} variant='link' />;
  }

  if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
    if (isTableFormatter && formatExists(formatter)) {
      displayComp = textFormatter(formatter, value);
    }
    return displayMode === 'DISPLAY_ONLY' ? (
      <StyledJaygasiExtensionsPizzaEmailWrapper>
      {displayComp}
      </StyledJaygasiExtensionsPizzaEmailWrapper>
    ) : (
      <StyledJaygasiExtensionsPizzaEmailWrapper>
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
      />
      </StyledJaygasiExtensionsPizzaEmailWrapper>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return (
      <StyledJaygasiExtensionsPizzaEmailWrapper>
      <FieldValueList
        variant='stacked'
        data-testid={testId}
        fields={[
          {
            id: '2',
            name: hideLabel ? '' : label,
            value: (
              <Text variant='h1' as='span'>
                {displayComp}
              </Text>
            )
          }
        ]}
      />
      </StyledJaygasiExtensionsPizzaEmailWrapper>
    );
  }

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConn, setStatus);
  };

  return (
    <StyledJaygasiExtensionsPizzaEmailWrapper>
    <Input
      {...additionalProps}
      type='email'
      label={label}
      labelHidden={hideLabel}
      info={validatemessage || helperText}
      value={inputValue}
      status={status}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      data-testid={testId}
      onChange={(event: any) => {
        if (hasSuggestions) {
          setStatus(undefined);
        }
        setInputValue(event.target.value);
        if (value !== event.target.value) {
          handleEvent(actions, 'change', propName, event.target.value);
          hasValueChange.current = true;
        }
      }}
      onBlur={(event: any) => {
        if (!value || hasValueChange.current) {
          handleEvent(actions, 'blur', propName, event.target.value);
          if (hasSuggestions) {
            pConn.ignoreSuggestion('');
          }
          hasValueChange.current = false;
        }
      }}
      // @ts-ignore
      onFocus={actions.onFocus}
      onResolveSuggestion={onResolveSuggestionHandler}
    />
    </StyledJaygasiExtensionsPizzaEmailWrapper>
  );
}

export default withConfiguration(JaygasiExtensionsPizzaEmail);
