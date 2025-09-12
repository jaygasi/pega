import { useEffect, useState } from 'react';
import { TimeInput, FieldValueList, DateTimeDisplay, Text, withConfiguration } from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';


// includes in bundle
import {
  parseClockFormat,

  timeCorrectedToSeconds,
  datetimeFireChangeBlurEvents
} from "./time-of-day";
import { suggestionsHandler } from './suggestions-handler';

import StyledJaygasiExtensionsPizzaTimeOfDayWrapper from './styles';
import type { DateTimeFormat, DateTimeVariant } from '@pega/cosmos-react-core/lib/components/DateTime/DateTime.types';
import type { ClockFormat } from '@pega/cosmos-react-core/lib/components/DateTime/Input/utils';

// interface for props
interface JaygasiExtensionsPizzaTimeOfDayProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  displayAsStatus?: boolean;
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  formatter?: string;
  withSeconds: boolean;
  pickerInterval: string;
  clockFormat: number | string;
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

interface ConfigProps {
  formatter?: string;
}


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaTimeOfDay (props: JaygasiExtensionsPizzaTimeOfDayProps)  {
  const {
    getPConnect,
    value,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    withSeconds = false,
    pickerInterval = '30',
    testId,
    additionalProps = {},
    displayMode,
    variant = 'inline',
    hasSuggestions = false
  } = props;
  let { formatter = 'defaultTime' } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;

  // BUG-547602: Temporary type coercion for 8.5 until DXAPIs are enhanced to pass original pxViewMetadata JSON, respecting boolean primitives
  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  let { clockFormat = 0 } = props;
  clockFormat = parseClockFormat(clockFormat);

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

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConn, setStatus);
  };

  function handleBlur(onBlurValue: any) {
    const { valueAsISOString: time, state: errorState } = onBlurValue;
    const trimmedTime = time ? timeCorrectedToSeconds(time, withSeconds) : time;
    datetimeFireChangeBlurEvents(errorState, value, trimmedTime, actions, propName, pConn);
    const isValueChanged = !(value === undefined && trimmedTime === '') && value !== trimmedTime;
    if (hasSuggestions && isValueChanged) {
      pConn.ignoreSuggestion('');
    }
  }

  function handleChange(onChangeValue: any) {
    const { valueAsISOString: time } = onChangeValue;
    const trimmedTime = time ? timeCorrectedToSeconds(time, withSeconds) : time;
    if (hasSuggestions && value !== trimmedTime) {
      setStatus('');
    }
    pConn.clearErrorMessages({
      category: "",
      property: propName,
      context: ""
    });
  }

  if (displayMode === 'LABELS_LEFT' || displayMode === 'STACKED_LARGE_VAL' || displayMode === 'DISPLAY_ONLY') {
    let variantValue = 'time';
    let formatValue = withSeconds ? 'long' : 'short';
    if (pConn && pConn.getConfigProps()) {
      const configProps = pConn.getConfigProps() as ConfigProps;
      const runtimeformatter = configProps?.formatter;
      if (formatter !== runtimeformatter) {
        formatter = runtimeformatter!;
      }
    }
    if (formatter === 'Time-Only') {
      variantValue = 'time';
      formatValue = 'long';
    }
    const displayComp = (
      <DateTimeDisplay
        variant={variantValue as DateTimeVariant}
        format={formatValue as DateTimeFormat}
        value={value}
        clockFormat={clockFormat as ClockFormat || undefined}
      />
    );
    switch (displayMode) {
      case 'DISPLAY_ONLY': {
        return ( <StyledJaygasiExtensionsPizzaTimeOfDayWrapper> {displayComp} </StyledJaygasiExtensionsPizzaTimeOfDayWrapper>);
      }
      case 'LABELS_LEFT': {
        return (
          <StyledJaygasiExtensionsPizzaTimeOfDayWrapper>
          <FieldValueList
            variant={hideLabel ? 'stacked' : variant}
            data-testid={testId}
            fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
          />
          </StyledJaygasiExtensionsPizzaTimeOfDayWrapper>
        );
      }
      case 'STACKED_LARGE_VAL': {
        return (
          <StyledJaygasiExtensionsPizzaTimeOfDayWrapper>
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
          </StyledJaygasiExtensionsPizzaTimeOfDayWrapper>
        );
      }
      // no default
    }
  }

  return (
    <StyledJaygasiExtensionsPizzaTimeOfDayWrapper>
    <TimeInput
      {...additionalProps}
      label={label}
      labelHidden={hideLabel}
      info={validatemessage || helperText}
      status={status}
      value={value || undefined}
      withSeconds={withSeconds}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      pickerInterval={pickerInterval}
      clockFormat={clockFormat || undefined}
      data-testid={testId}
       // @ts-ignore
      onFocus={actions.onFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      onResolveSuggestion={onResolveSuggestionHandler}
    />
    </StyledJaygasiExtensionsPizzaTimeOfDayWrapper>
  );
}



export default withConfiguration(JaygasiExtensionsPizzaTimeOfDay);
