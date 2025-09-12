import { useState, useEffect, useRef } from 'react';
import {
  PhoneInput as CosmosPhone,
  getPhoneNumberParts,
  PhoneDisplay,
  FieldValueList,
  Text,
  EmailDisplay,
  URLDisplay,
  withConfiguration
} from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

// includes in bundle
import handleEvent from "./event-utils";
import { suggestionsHandler } from './suggestions-handler';

import StyledJaygasiExtensionsPizzaPhoneWrapper from './styles';

// interface for props
interface JaygasiExtensionsPizzaPhoneProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  displayAsStatus?: boolean;
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  formatter: string;
  datasource: any;
  showCountryCode: boolean;
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
  let displayComponent:any = null;
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
function JaygasiExtensionsPizzaPhone(props: JaygasiExtensionsPizzaPhoneProps) {
  const {
    getPConnect,
    value,
    showCountryCode = true,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    datasource = [],
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

  let callingCodesList: Array<any>  = [];
  if (datasource?.source?.length > 0) {
    datasource.source.forEach((element: { value: any; }) => {
      callingCodesList.push(element.value);
    });
  } else {
    callingCodesList = ['+1']; // if no datasource is present we default to show only US country code
  }

  // BUG-547602: Temporary type coercion for 8.5 until DXAPIs are enhanced to pass original pxViewMetadata JSON, respecting boolean primitives
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

  // function to exclude country code from phone number
  function getPhoneNumberAlone(phoneNumber: string) {
    const phoneNumberParts = getPhoneNumberParts(phoneNumber, callingCodesList);
    return phoneNumberParts && phoneNumberParts[1];
  }

  function handleChangeBlur(enteredValue: string, eventType: any) {
    if (!getPhoneNumberAlone(enteredValue)) {
      enteredValue = '';
    }
    handleEvent(actions, eventType, propName, enteredValue);
  }

  let displayComp: any = null;
  if (displayMode) {
    displayComp = <PhoneDisplay value={value} variant='link' />;
  }

  if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
    if (isTableFormatter && formatExists(formatter)) {
      displayComp = textFormatter(formatter, value);
    }
    return displayMode === 'DISPLAY_ONLY' ? (
      <StyledJaygasiExtensionsPizzaPhoneWrapper>
      {displayComp}
      </StyledJaygasiExtensionsPizzaPhoneWrapper>
    ) : (
      <StyledJaygasiExtensionsPizzaPhoneWrapper>
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
      />
      </StyledJaygasiExtensionsPizzaPhoneWrapper>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return (
      <StyledJaygasiExtensionsPizzaPhoneWrapper>
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
      </StyledJaygasiExtensionsPizzaPhoneWrapper>
    );
  }

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConn, setStatus);
  };

  return (
    <StyledJaygasiExtensionsPizzaPhoneWrapper>
    <CosmosPhone
      {...additionalProps}
      label={label}
      info={validatemessage || helperText}
      value={inputValue}
      labelHidden={hideLabel}
      status={status}
      showCountryCode={showCountryCode}
      callingCodesList={callingCodesList}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      data-testid={testId}
      onChange={(enteredValue: any) => {
        if (hasSuggestions) {
          setStatus('');
        }
        setInputValue(enteredValue);
        if (value !== enteredValue) {
          handleEvent(actions, 'change', propName, enteredValue);
        }
        hasValueChange.current = true;
      }}
      onBlur={(enteredValue: any) => {
        if (!value || hasValueChange.current) {
          handleChangeBlur(enteredValue, 'blur');
          if (hasSuggestions) {
            pConn.ignoreSuggestion('');
          }
          hasValueChange.current = false;
        }
      }}
      onResolveSuggestion={onResolveSuggestionHandler}
    />
    </StyledJaygasiExtensionsPizzaPhoneWrapper>
  );
}

export default withConfiguration(JaygasiExtensionsPizzaPhone);
