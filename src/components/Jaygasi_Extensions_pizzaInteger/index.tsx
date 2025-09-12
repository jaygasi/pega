import { useState, useEffect, useRef } from 'react';
import { NumberInput, NumberDisplay, Slider, FieldValueList, CurrencyDisplay, Text, withConfiguration } from '@pega/cosmos-react-core';


import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

// includes in bundle
import handleEvent from "./event-utils";
import { suggestionsHandler } from './suggestions-handler';

import StyledJaygasiExtensionsPizzaIntegerWrapper from './styles';


// interface for props
interface JaygasiExtensionsPizzaIntegerProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  displayAs?: string;
  defaultValue: number;
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  formatter: string;
  decimalPrecision: string;
  allowDecimals: boolean;
  currencyISOCode: string;
  alwaysShowISOCode: boolean;
  additionalProps: any;
  showGroupSeparators: boolean;
  currencyDisplay: 'symbol' | 'code' | 'name' | undefined;
  negative: 'minus-sign' | 'parentheses' | undefined;
  notation: 'standard' | 'compact' | undefined;
  currencyDecimalPrecision: string;
  showInput: boolean;
  min: number;
  max: number;
  step: number;
  showTicks: boolean;
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaInteger(props: JaygasiExtensionsPizzaIntegerProps) {
  const {
    getPConnect,
    value,
    defaultValue,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    testId,
    displayMode,
    displayAs,
    showInput = true,
    min = 0,
    max = 100,
    step = 1,
    showTicks = true,
    additionalProps = {},
    variant = 'inline',
    formatter = 'defaultInteger',
    negative = 'minus-sign',
    notation = 'standard',
    isTableFormatter = false,
    hasSuggestions = false
  } = props;
  let { showGroupSeparators = false  } = props;
  let { currencyDisplay = 'symbol' } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;
  const [integerValue, setIntegerValue] = useState(value?.toString());
  const sliderDefaultValue = !defaultValue && defaultValue !== 0 ? max : defaultValue;

  const hasValueChange = useRef(false);


  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );



  const [status, setStatus] = useState(hasSuggestions ? 'pending' : '');
  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    }
    if (hasSuggestions) {
      setStatus('pending');
    } else if (!hasSuggestions && status !== 'success') {
      // @ts-ignore
      setStatus(validatemessage !== '' ? 'error' : undefined);
    }
  }, [validatemessage, hasSuggestions, status]);

  useEffect(() => {
    setIntegerValue(value?.toString());
  }, [value]);

  useEffect(() => {
    if (displayAs === 'slider' && value === '') {
      handleEvent(actions, 'change', propName, sliderDefaultValue);
    }
  }, [actions, displayAs, propName, sliderDefaultValue, value]);

  const { decimalPrecision, currencyDecimalPrecision = 'auto', currencyISOCode = 'USD' } = props;
  let noOfDecimals : number | undefined = parseInt(decimalPrecision, 10);
  if (Number.isNaN(noOfDecimals)) noOfDecimals = undefined;
  let noOfFractionDigits = currencyDecimalPrecision === 'auto' ? undefined : parseInt(currencyDecimalPrecision, 10);
  let unit;

  if (['LABELS_LEFT', 'STACKED_LARGE_VAL', 'DISPLAY_ONLY'].includes(displayMode as string)) {
    switch (formatter) {
      case 'Decimal': {
        break;
      }
      case 'Percentage': {
        showGroupSeparators = false;
        unit = '%';
        break;
      }
      case 'Decimal-Auto': {
        noOfDecimals = Number.isInteger(integerValue) ? 0 : 2;
        break;
      }
      default: {
        noOfDecimals = 0;
        break;
      }
    }

    if (isTableFormatter && displayMode === 'LABELS_LEFT') {
      showGroupSeparators = true;
      noOfFractionDigits = undefined;
      if (formatter === 'Currency-Code') {
        currencyDisplay = 'code';
      }
    }


    const displayComp =
      formatter === 'Currency' || formatter === 'Currency-Code' ? (
        <CurrencyDisplay
          value={integerValue}
          currencyISOCode={currencyISOCode}
          formattingOptions={{
            groupSeparators: showGroupSeparators,
            fractionDigits: noOfFractionDigits,
            currency: currencyDisplay,
            negative,
            notation: negative === 'parentheses' ? 'standard' : notation
          }}
        />
      ) : (
        <NumberDisplay
          value={integerValue}
          formattingOptions={{
            fractionDigits: noOfDecimals,
            groupSeparators: showGroupSeparators,
            notation
          }}
          unit={unit}
        />
      );


    switch (displayMode) {
      case 'DISPLAY_ONLY': {
        return (<StyledJaygasiExtensionsPizzaIntegerWrapper> {displayComp} </StyledJaygasiExtensionsPizzaIntegerWrapper>);
      }
      case 'LABELS_LEFT': {
        return (
          <StyledJaygasiExtensionsPizzaIntegerWrapper>
          <FieldValueList
            variant={hideLabel ? 'stacked' : variant}
            data-testid={testId}
            fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
          />
          </StyledJaygasiExtensionsPizzaIntegerWrapper>
        );
      }
      case 'STACKED_LARGE_VAL': {
        return (
          <StyledJaygasiExtensionsPizzaIntegerWrapper>
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
          </StyledJaygasiExtensionsPizzaIntegerWrapper>
        );
      }
      // no default
    }
  }

  function onChangeHandler(enteredValue: any) {
    if (hasSuggestions) {
      setStatus('');
    }
    setIntegerValue(enteredValue);
    // const parsedValue = integerValue !== '' ? Number(integerValue) : '';
    if (value !== (enteredValue !== '' ? Number(enteredValue) : '')) {
      handleEvent(actions, 'change', propName, enteredValue !== '' ? Number(enteredValue) : '');
      hasValueChange.current = true;
    }
    // In case of stepper variation there is no blur event as component is never focussed unless forced. Need to update redux on change.
    if (displayAs === 'stepper') {
      handleEvent(actions, 'changeNblur', propName, enteredValue !== '' ? Number(enteredValue) : '');
    }
  }

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConn, setStatus);
  };

  return displayAs === 'slider' ? (
    <StyledJaygasiExtensionsPizzaIntegerWrapper>
    <Slider
      {...additionalProps}
      label={label}
      labelHidden={hideLabel}
      info={validatemessage || helperText}
      value={!integerValue ? sliderDefaultValue : Number(integerValue)}
      status={status}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      data-testid={testId}
      showProgress
      preview={!showInput}
      showInput={showInput}
      min={min}
      max={max}
      step={step}
      ticks={showTicks && { [min]: `${min}`, [max]: `${max}` }}
      onChange={(selectedValue) => {
        onChangeHandler(selectedValue.toString());
        handleEvent(actions, 'changeNblur', propName, selectedValue);
      }}
    />
    </StyledJaygasiExtensionsPizzaIntegerWrapper>
  ) : (
    <StyledJaygasiExtensionsPizzaIntegerWrapper>
    <NumberInput
      {...additionalProps}
      label={label}
      labelHidden={hideLabel}
      info={validatemessage || helperText}
      value={integerValue}
      status={status}
      placeholder={displayAs === 'input' ? placeholder : ''}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      data-testid={testId}
      numberOfDecimals={0}
      showGroupSeparators={showGroupSeparators}
      variant={displayAs === 'stepper' ? displayAs : ''}
      onChange={(enteredValue) => {
        onChangeHandler(enteredValue);
      }}
      onBlur={() => {
        if (!readOnly && (hasValueChange.current || !value)) {
          handleEvent(actions, 'blur', propName, integerValue !== '' ? Number(integerValue) : '');
          if (hasSuggestions) {
            pConn.ignoreSuggestion('');
          }
          hasValueChange.current = false;
        }
      }}
      onResolveSuggestion={onResolveSuggestionHandler}
    />
    </StyledJaygasiExtensionsPizzaIntegerWrapper>
  );
}


export default withConfiguration(JaygasiExtensionsPizzaInteger);
