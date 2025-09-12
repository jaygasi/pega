import { useState, useEffect, useRef } from 'react';
import {
  NumberInput,
  NumberDisplay,
  CurrencyDisplay,
  FieldValueList,
  Text,
  withConfiguration
} from '@pega/cosmos-react-core';


import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

// includes in bundle
import handleEvent from './event-utils';
import { suggestionsHandler } from './suggestions-handler';

import StyledJaygasiExtensionsPizzaPercentageWrapper from './styles';

// interface for props
interface JaygasiExtensionsPizzaPercentageProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  displayAsStatus?: boolean;
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  formatter: string;
  decimalPrecision: string;
  allowDecimals: boolean;
  currencyISOCode: string;
  alwaysShowISOCode: boolean;
  isoCodeSelection: string;
  additionalProps: any;
  showGroupSeparators: boolean;
  currencyDisplay: 'symbol' | 'code' | 'name' | undefined;
  negative: 'minus-sign' | 'parentheses' | undefined;
  notation: 'standard' | 'compact' | undefined;
  currencyDecimalPrecision: string;
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaPercentage(props: JaygasiExtensionsPizzaPercentageProps) {
  const {
    getPConnect,
    value,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    testId,
    decimalPrecision,
    additionalProps = {},
    displayMode,
    variant = 'inline',
    formatter,
    isTableFormatter = false,
    hasSuggestions = false
  } = props;
  let { showGroupSeparators = false } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;
  const [percentageValue, setPercentageValue] = useState(value?.toString());

  const hasValueChange = useRef(false);

  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );

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

  let numberOfDecimals : number | undefined = parseInt(decimalPrecision, 10);
  if (Number.isNaN(numberOfDecimals)) {
    numberOfDecimals = decimalPrecision === '' ? undefined : 2;
  }

  useEffect(() => {
    setPercentageValue(value?.toString());
  }, [value]);

  if (displayMode === 'LABELS_LEFT' || displayMode === 'DISPLAY_ONLY') {
    let unit = 'percent';
    let displayComp:any = null;

    if (isTableFormatter) {
      switch (formatter) {
        case 'Integer': {
          numberOfDecimals = 0;
          showGroupSeparators = true;
          unit = '';
          break;
        }
        case 'Decimal': {
          showGroupSeparators = true;
          unit = '';
          break;
        }
        case 'Decimal-Auto': {
          numberOfDecimals = Number.isInteger(percentageValue) ? 0 : 2;
          showGroupSeparators = true;
          unit = '';
          break;
        }
        default: {
          showGroupSeparators = false;
          break;
        }
      }
    }


    displayComp = (
      <NumberDisplay
        value={percentageValue}
        formattingOptions={{
          fractionDigits: numberOfDecimals,
          groupSeparators: showGroupSeparators
        }}
        unit={unit}
      />
    );
    if (isTableFormatter && (formatter === 'Currency' || formatter === 'Currency-Code')) {
      const { currencyISOCode = 'USD' } = props;
      let showIsoCode = true;
      if (formatter === 'Currency') {
        showIsoCode = false;
      }
      displayComp = (
        <CurrencyDisplay
          value={percentageValue}
          currencyISOCode={currencyISOCode}
          formattingOptions={{
            groupSeparators: showGroupSeparators,
            currency: showIsoCode ? 'code' : 'symbol'
          }}
        />
      );
    }


    return displayMode === 'DISPLAY_ONLY' ? (
      <StyledJaygasiExtensionsPizzaPercentageWrapper>
      {displayComp}
      </StyledJaygasiExtensionsPizzaPercentageWrapper>
    ) : (
      <StyledJaygasiExtensionsPizzaPercentageWrapper>
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
      />
      </StyledJaygasiExtensionsPizzaPercentageWrapper>
    );
  }


  if (displayMode === 'STACKED_LARGE_VAL') {
    const displayComp = (
      <NumberDisplay
        value={percentageValue}
        formattingOptions={{
          fractionDigits: numberOfDecimals,
          groupSeparators: showGroupSeparators
        }}
        unit='percent'
      />
    );


    return (
      <StyledJaygasiExtensionsPizzaPercentageWrapper>
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
      </StyledJaygasiExtensionsPizzaPercentageWrapper>
    );
  }

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConn, setStatus);
  };

  return (
    <StyledJaygasiExtensionsPizzaPercentageWrapper>
    <NumberInput
      {...additionalProps}
      label={label}
      labelHidden={hideLabel}
      info={validatemessage || helperText}
      value={percentageValue}
      status={status}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      numberOfDecimals={numberOfDecimals}
      showGroupSeparators={showGroupSeparators}
      unit='percent'
      data-testid={testId}
      onChange={(enteredValue) => {
        if (hasSuggestions) {
          setStatus(undefined);
        }
        setPercentageValue(enteredValue);
        if (value !== enteredValue) {
          handleEvent(actions, 'change', propName, enteredValue);
          hasValueChange.current = true;
        }
      }}
      onBlur={() => {
        const parsedValue = percentageValue !== '' ? Number(percentageValue) : '';
        if (!value || hasValueChange.current) {
          handleEvent(actions, 'blur', propName, parsedValue);
          if (hasSuggestions) {
            pConn.ignoreSuggestion("");
          }
          hasValueChange.current = false;
        }
      }}
      onResolveSuggestion={onResolveSuggestionHandler}
    />
    </StyledJaygasiExtensionsPizzaPercentageWrapper>
  );
}

export default withConfiguration(JaygasiExtensionsPizzaPercentage);
