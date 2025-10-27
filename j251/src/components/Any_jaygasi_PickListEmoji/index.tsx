import { useState, useEffect, useRef } from 'react';
import { Select, Option, withConfiguration, EmailDisplay, PhoneDisplay, URLDisplay } from '@pega/cosmos-react-core';

import type { PConnFieldProps } from '../shared/PConnProps';
import '../shared/create-nonce';

// includes in bundle
import handleEvent from "./event-utils";
import { suggestionsHandler } from '../shared/suggestions-handler';

import StyledAnyJaygasiPickListEmojiWrapper, {
  StyledDisplayModeWrapper,
  StyledDisplayModeLabel,
  StyledDisplayModeValue,
  StyledDisplayModeValueLarge,
  StyledDisplayModeHelperText
} from './styles';


// Interface for emoji value mapping
interface EmojiMapping {
  value: string;
  emoji: string;
}

// Interface for emoji configuration
interface EmojiConfig {
  value_emojis: EmojiMapping[];
}

// Type for the new simplified emoji config format
type EmojiConfigArray = EmojiMapping[];

// Helper function to push placeholder option
const pushPlaceholderOption = (placeholder: string, listSourceItems: Array<any>, items: Array<any>, pConnect: any) => {
  // If we have a placeholder, push that option in the list of items
  if (placeholder) {
    items.push(
      <Option key={placeholder} value=''>
        {pConnect.getLocalizedValue(placeholder)}
      </Option>
    );
  } else if (!listSourceItems) {
    // If we don't have a placeholder and our list source is empty, push a blank row option in the list of items
    // @ts-ignore
    items.push(<Option key='' value='' />);
  }
};

// Helper function to find matching emoji for a given value
const getEmojiForValue = (value: string, emojiConfig: string | undefined): string | null => {
  if (!emojiConfig || !value) {
    return null;
  }

  try {
    let parsedConfig;
    
    // Handle case where emojiConfig might already be an object
    if (typeof emojiConfig === 'object') {
      parsedConfig = emojiConfig;
    } else {
      parsedConfig = JSON.parse(emojiConfig);
    }
    
    // Check if it's the new format (direct array)
    if (Array.isArray(parsedConfig)) {
      const config: EmojiConfigArray = parsedConfig;
      const matchingValue = config.find(
        (item) => item.value.toLowerCase() === value.toLowerCase()
      );
      return matchingValue ? matchingValue.emoji : null;
    }
    
    // Check if it's the old format (object with value_emojis)
    if (parsedConfig.value_emojis && Array.isArray(parsedConfig.value_emojis)) {
      const config: EmojiConfig = parsedConfig;
      const matchingValue = config.value_emojis.find(
        (item) => item.value.toLowerCase() === value.toLowerCase()
      );
      return matchingValue ? matchingValue.emoji : null;
    }
    
    console.warn('Invalid emoji configuration format:', parsedConfig);
    return null;
  } catch (error) {
    console.warn('Invalid emoji configuration JSON:', error);
    return null;
  }
};

// Helper function to build items and get selected label
const buildItemsAndSelectedLabel = (options: {
  listSourceItems: any[];
  isDatapage: boolean;
  pConnect: any;
  localePath: string;
  localeClass: string;
  localeContext: string;
  localeName: string;
  value: any;
  placeholder: string;
}) => {
  const { listSourceItems, isDatapage, pConnect, localePath, localeClass, localeContext, localeName, value, placeholder } = options;
  const items: Array<any> = [];
  let selectedLabel = '';

  pushPlaceholderOption(placeholder, listSourceItems, items, pConnect);

  for (const item of listSourceItems || []) {
    const displayText = isDatapage
      // @ts-ignore - deprecated signature
      ? pConnect.getLocalizedValue(
          item.text,
          localePath,
          pConnect.getLocaleRuleNameFromKeys(localeClass, localeContext, localeName)
        )
      // @ts-ignore - deprecated signature
      : pConnect.getLocalizedValue(
          item.value,
          localePath,
          pConnect.getLocaleRuleNameFromKeys(localeClass, localeContext, localeName)
        );
    if (
      value !== undefined &&
      value !== null &&
      item.key !== undefined &&
      item.key !== null &&
      value.toString() === item.key.toString()
    ) {
      selectedLabel = displayText;
    }
    
    // Get emoji for the display text (no longer used in dropdown)
    // const emoji = getEmojiForValue(displayText, emojiConfig);
    
    items.push(
      // @ts-ignore - Option children type is string but accepts JSX
      <Option key={item.key} value={item.key}>
        <span>{displayText}</span>
      </Option>
    );
  }

  return { items, selectedLabel };
};

// Helper function to render display mode
const renderDisplayMode = (options: {
  selectedLabel: string;
  value: any;
  emojiConfig: string | undefined;
  placeholder: string;
  displayMode: string;
  label: string;
  helperText: string;
}) => {
  const { selectedLabel, value, emojiConfig, placeholder, displayMode, label, helperText } = options;
  
  const displayValue = selectedLabel || (value ? value.toString() : placeholder);
  const emoji = getEmojiForValue(displayValue, emojiConfig);
  
  if (displayMode === 'LABELS_LEFT') {
    return (
      <StyledDisplayModeWrapper>
        <StyledDisplayModeLabel>{label}</StyledDisplayModeLabel>
        <StyledDisplayModeValue>
          <span>{displayValue}</span> {emoji && <span className="display-emoji">{emoji}</span>}
        </StyledDisplayModeValue>
      </StyledDisplayModeWrapper>
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return (
      <StyledDisplayModeWrapper>
        <StyledDisplayModeLabel>{label}</StyledDisplayModeLabel>
        <StyledDisplayModeValueLarge>
          <span>{displayValue}</span> {emoji && <span className="display-emoji">{emoji}</span>}
        </StyledDisplayModeValueLarge>
        {helperText && <StyledDisplayModeHelperText>{helperText}</StyledDisplayModeHelperText>}
      </StyledDisplayModeWrapper>
    );
  }

  return (
    <StyledDisplayModeWrapper>
      <StyledDisplayModeValue>
        <span>{displayValue}</span> {emoji && <span className="display-emoji">{emoji}</span>}
      </StyledDisplayModeValue>
    </StyledDisplayModeWrapper>
  );
};

// interface for props
interface AnyJaygasiPickListEmojiProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  defaultValue: number;
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
  datasource:any;
  listType: string;
  fieldMetadata: any;
  onRecordChange: Function;
  emojiConfig?: string; // JSON string containing emoji configuration
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


export const textFormatter = (formatter: string,value: any) => {
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


export const setDefaultValue = (dropdownOptions: Array<any>, pConnect: any, propName: string) => {
  // calculate the default option and set it to dropdown
  const option = dropdownOptions?.[0] || {};
  const defaultValue = option.key ? option.props.value : '';
  pConnect.setValue(propName, defaultValue, defaultValue);
};


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function AnyJaygasiPickListEmoji(props: Readonly<AnyJaygasiPickListEmojiProps>) {
  const {
    getPConnect,
    value,
    label,
    hideLabel = false,
    placeholder,
    datasource = {},
    listType,
    validatemessage,
    testId,
    helperText,
    additionalProps = {},
    displayMode,
    onRecordChange,
    fieldMetadata = {},
    hasSuggestions = false,
    emojiConfig
  } = props;
  
  // Debug: Log the emojiConfig value
  console.log('PickListEmoji emojiConfig:', emojiConfig);
  
  const pConnect = getPConnect();
  const actions = pConnect.getActionsApi();
  const stateProps = pConnect.getStateProps() as StateProps;
  const propName: string = stateProps.value;
  const className = pConnect.getCaseInfo().getClassName();
  const refName = propName?.slice(propName.lastIndexOf('.') + 1);

  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);

  const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
      isMountRef.current = false;
    }, []);
    return isMountRef.current;
  };

  const isMount = useIsMount();

  const metaData = Array.isArray(fieldMetadata)
    ? fieldMetadata.find((field) => field?.classID === className)
    : fieldMetadata;
  let displayName = metaData?.datasource?.propertyForDisplayText;
  displayName = displayName?.slice(displayName.lastIndexOf('.') + 1);
  const localeContext = metaData?.datasource?.tableType === 'DataPage' ? 'datapage' : 'associated';
  const localeClass = localeContext === 'datapage' ? '@baseclass' : className;
  const localeName = localeContext === 'datapage' ? metaData?.datasource?.name : refName;
  const localePath = localeContext === 'datapage' ? displayName : '';

  const configProps = pConnect.getConfigProps();
  const isDatapage = listType === 'datapage';
  let listSourceItems = isDatapage ? configProps.listOutput : datasource;

  if (isDatapage && typeof datasource === 'object' && !Array.isArray(listSourceItems)) {
    listSourceItems = datasource.source ? datasource.source : [];
  }

  useEffect(() => {
    if (validatemessage) {
      setStatus('error');
    }
    if (hasSuggestions) {
      setStatus('pending');
    } else if (status !== 'success') {
      setStatus(validatemessage ? 'error' : undefined);
    }
  }, [validatemessage, hasSuggestions, status]);

  const { items, selectedLabel } = buildItemsAndSelectedLabel({
    listSourceItems,
    isDatapage,
    pConnect,
    localePath,
    localeClass,
    localeContext,
    localeName,
    value,
    placeholder: placeholder as string
  });

  const isDisplayModeEnabled =
    displayMode === 'LABELS_LEFT' || displayMode === 'STACKED_LARGE_VAL' || displayMode === 'DISPLAY_ONLY';
  let firstOptionKey = '';
  let firstOptionValue = '';
  if (!placeholder && listSourceItems?.length > 0) {
    // First option isn't going to change as long as placeholder is present. Incase placeholder is not there
    // check for new option
    firstOptionKey = listSourceItems[0].key;
    firstOptionValue = listSourceItems[0].text || listSourceItems[0].value;
  }
  useEffect(() => {
    // placeholder - placeholder option configured to be shown with dropdown, empty string if not configured
    // value - value of the dropdown if set to something prior (either by pre-activity or default value etc.), empty string if nothing is set
    // selectedLabel - is value(the one above) if it is one of the option in the dropdown datasource, empty string if not
    // below code does this -
    // set dropdown value to first option if placeholder is NOT present and ((value is empty) or (value is not empty and selectedLabel is empty))
    // set dropdown value to empty if placeholder is present and value is not empty and selectedLabel is empty
    // Broken down first option(key, value) to be as dependency instead of entire items array which creates new reference on every render
    // First option is kept as dependency as setDefaultValue sets only first value from options
    if (!isDisplayModeEnabled && ((!placeholder && !value) || (!isMount && value && !selectedLabel))) {
      setDefaultValue(items, pConnect, propName);
    }
  }, [firstOptionKey, firstOptionValue, placeholder, selectedLabel, value, propName, isDisplayModeEnabled, isMount, pConnect]);

  if (isDisplayModeEnabled) {
    return renderDisplayMode({
      selectedLabel,
      value,
      emojiConfig,
      placeholder: placeholder as string,
      displayMode,
      label,
      helperText
    });
  }

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConnect, setStatus);
  };


  // Get the emoji for current value (for external display)
  const selectedEmoji = getEmojiForValue(selectedLabel || (value ? value.toString() : ''), emojiConfig);

  return (
    <StyledAnyJaygasiPickListEmojiWrapper>
      <div className="picklist-with-emoji">
        <Select
          {...additionalProps}
          label={label}
          labelHidden={hideLabel}
          info={validatemessage || helperText}
          status={status}
          data-testid={testId}
          // @ts-ignore
          key={getPConnect().getRawMetadata().config.value}
          value={value}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          onChange={(event) => {
            handleEvent(actions, 'changeNblur', propName, event.target.value);
            if (hasSuggestions) {
              pConnect.ignoreSuggestion('');
              setStatus(undefined);
            }
            if (onRecordChange) {
              onRecordChange(event);
            }
          }}
          onBlur={(event: any) => {
            pConnect.getValidationApi().validate(event.target.value);
          }}
          onResolveSuggestion={onResolveSuggestionHandler}
        >
          {items}
        </Select>
        {selectedEmoji && <span className="external-emoji">{selectedEmoji}</span>}
      </div>
    </StyledAnyJaygasiPickListEmojiWrapper>
  );
}



export default withConfiguration(AnyJaygasiPickListEmoji);
