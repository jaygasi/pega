/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sonarjs/cognitive-complexity */
import { useEffect, useRef, useState, useMemo, type MutableRefObject, type SetStateAction } from 'react';
import { ComboBox, menuHelpers, debounce, throttle, Button, Icon, withConfiguration, type MenuGroupProps, type MenuItemProps } from '@pega/cosmos-react-core';
import get from 'lodash.get';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';

// includes in bundle
import handleEvent from "./event-utils";
import { suggestionsHandler } from './suggestions-handler';

import { formatExists, textFormatter } from './textformat-utils';
import { flattenParameters } from './picklist-utils';
import { isSelfReferencedProperty, getDescriptorsFieldName } from './repeat-utils';
import { getFieldNameFromEmbeddedFieldName } from './embed-utils';

import { usePaginate, useDeepMemo, useIsMount, updatePropertiesForNewRecord } from './utils';

import StyledJaygasiExtensionsPizzaSearchboxWrapper from './styles';

// interface for props
interface JaygasiExtensionsPizzaSearchboxProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  formatter: string;
  maxResultsDisplay: string;
  matchPosition: string;
  listType: string;
  parameters: any;
  columns: Array<any>;
  cacheLifeSpan: string;
  createNewRecord: any;
  onRecordChange: any;
  datasourceMetadata: any;
  datasource: Array<any>;
  deferDatasource: boolean;
  additionalProps: any;
  referenceType: string;
  primaryField: string;
  selected: boolean;
  actualValue: any;
  descriptors: any;
  dataRelationshipContext: any;
  contextClass: string;
  isSearchableOnKey: boolean;
}

interface JaygasiExtensionsPizzaSearchboxPropsSubSet {
  selected: any;
  actualValue: any;
  isTableFormatter?: boolean;
  formatter: string;
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}


export const preProcessColumns = (columns: Array<any>) => {
  return columns.map(col => {
    const tempColObj = { ...col };
    tempColObj.value = col.value && col.value.startsWith('.') ? col.value.substring(1) : col.value;
    return tempColObj;
  });
};

export const getDisplayFieldsMetaData = (columns: Array<any>) => {
  const visibleAndSecondaryColumns = columns.filter(
    col => col.display === 'true' || col.secondary === 'true'
  );
  const metaDataObj = { key: '', primary: '', secondary: [], hidden: [] };
  const keyCol = columns.filter(col => col.key === 'true');
  metaDataObj.key = keyCol.length > 0 ? keyCol[0].value : 'auto';
  for (let index = 0; index < visibleAndSecondaryColumns.length; index += 1) {
    if (visibleAndSecondaryColumns[index].primary === 'true') {
      metaDataObj.primary = visibleAndSecondaryColumns[index].value;
    } else {
      if (visibleAndSecondaryColumns[index].display === 'false') {
        metaDataObj.hidden.push(visibleAndSecondaryColumns[index].value as never);
      }
      metaDataObj.secondary.push(visibleAndSecondaryColumns[index].value as never);
    }
  }
  return metaDataObj;
};

export const buildColumnForDisplayValue = (dataObj: any) => {
  if (dataObj.columns) {
    dataObj.columns = dataObj.columns.map((column: any) => {
      const tempColObj = { ...column };
      if (tempColObj.key === 'true') {
        tempColObj.useForSearch = true;
      } else {
        tempColObj.useForSearch = false;
      }
      return tempColObj;
    });
  }
};

export const doSearch = (
  searchText: string,
  displayFieldMeta: { key: any; primary: any; secondary: any; hidden: any },
  dataApiObj: { fetchData?: any; columns?: any; isQueryable?: any; matchPosition?: any },
  setItems: {
    (value: SetStateAction<Array<never>>): void;
    (value: SetStateAction<Array<never>>): void;
    (value: SetStateAction<Array<never>>): void;
    (arg0: Array<MenuItemProps | MenuGroupProps>): void;
  },
  setLoading: {
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  hasMoreResults: MutableRefObject<boolean>,
  extraProps = {}
) => {
  if (dataApiObj && Object.keys(dataApiObj).length > 0 && dataApiObj.fetchData) {
    let columnsWithSetProperty: string | Array<any> = [];
    if (dataApiObj.columns) {
      columnsWithSetProperty = dataApiObj.columns
        .filter(
          (col: { setProperty: string }) =>
            col.setProperty && col.setProperty !== 'Associated property'
        )
        .map((col: { value: any }) => {
          return col.value;
        });
    }
    let listObjData = {};
    dataApiObj
      .fetchData(searchText)
      .then((response: { data: Array<never> }) => {
        listObjData = response.data || [];
        // @ts-ignore
        const searchedItems = listObjData.map((entry: { [x: string]: any }) => {
          const secondaryArr: Array<any> = [];
          const secondaryFieldValues: Array<any> = [];
          displayFieldMeta.secondary.forEach((col: string) => {
            if (!displayFieldMeta.hidden.includes(col)) secondaryArr.push(entry[col]);
            if (columnsWithSetProperty.includes(col)) {
              if (dataApiObj.isQueryable) {
                secondaryFieldValues.push(entry[col]);
              } else {
                secondaryFieldValues.push(get(entry, getFieldNameFromEmbeddedFieldName(col)));
              }
            }
          });
          return {
            id: entry[displayFieldMeta.key],
            primary: entry[displayFieldMeta.primary],
            secondary: secondaryArr,
            secondaryFieldValues
          };
        });
        hasMoreResults.current = true;
        const {
          fetchDisplayValue,
          displayItem,
          value,
          AC_TYPE,
          setSelected,
          setFilterValue,
          paginateHelperApis
        } = extraProps as any;
        if (dataApiObj.isQueryable === false) {
          const progressivePaginatedRecords = paginateHelperApis.getInitialPaginatedRecords(
            searchedItems,
            dataApiObj.matchPosition
          );
          const updatedItems = menuHelpers.selectItem(searchedItems, value, AC_TYPE);
          const selectedItem = menuHelpers.getSelected(updatedItems)[0];
          let listIndex = -1;
          const findSelectedItem = progressivePaginatedRecords.find(
            (record: { id: string }, index: number) => {
              if (record.id === selectedItem?.id) {
                listIndex = index;
                return true;
              }
              return false;
            }
          );
          if (!findSelectedItem && selectedItem) {
            progressivePaginatedRecords.unshift(selectedItem);
          } else if (selectedItem) {
            progressivePaginatedRecords.splice(listIndex, 1);
            progressivePaginatedRecords.unshift(selectedItem);
          }

          if (fetchDisplayValue) {
            setItems(progressivePaginatedRecords);
            setSelected(selectedItem);
          } else {
            setItems(progressivePaginatedRecords);
            setSelected(displayItem);
          }
        } else if (dataApiObj.isQueryable) {
          if (value && value !== '') {
            const updatedItems = menuHelpers.selectItem(searchedItems, value, AC_TYPE);
            const selectedItem = menuHelpers.getSelected(updatedItems)[0];
            if (!selectedItem) {
              let searchedItem: any = [];
              if (fetchDisplayValue) {
                dataApiObj.matchPosition = 'equals';
                buildColumnForDisplayValue(dataApiObj);
                dataApiObj.fetchData(value).then((displayResponse: { data: Array<never> }) => {
                  const displayResponseData = displayResponse.data || [];

                  searchedItem = displayResponseData.map((entry: { [x: string]: any }) => {
                    const secondaryArr: Array<any> = [];
                    const secondaryFieldValues: Array<any> = [];
                    displayFieldMeta.secondary.forEach((col: string) => {
                      if (!displayFieldMeta.hidden.includes(col)) {
                        secondaryArr.push(entry[col]);
                      }
                      if (columnsWithSetProperty.includes(col)) {
                        if (dataApiObj.isQueryable) {
                          secondaryFieldValues.push(entry[col]);
                        } else {
                          secondaryFieldValues.push(
                            get(entry, getFieldNameFromEmbeddedFieldName(col))
                          );
                        }
                      }
                    });
                    return {
                      id: entry[displayFieldMeta.key],
                      primary: entry[displayFieldMeta.primary],
                      secondary: secondaryArr,
                      secondaryFieldValues
                    };
                  });
                  setItems(
                    menuHelpers.selectItem([...searchedItem, ...searchedItems], value, AC_TYPE)
                  );
                  setSelected(searchedItem[0]);
                  setFilterValue('');
                });
              } else if (displayItem) {
                searchedItem = [displayItem];
                setItems(
                  menuHelpers.selectItem([...searchedItem, ...searchedItems], value, AC_TYPE)
                );
                setSelected(searchedItem[0]);
                setFilterValue('');
              }
            } else {
              setItems(searchedItems);
              setSelected(selectedItem);
              setFilterValue('');
            }
          } else {
            setItems(searchedItems);
            if (value === '') {
              setSelected(null);
            }
          }
        } else {
          setItems(searchedItems);
        }
      })
      .catch(() => {
        listObjData = [];
      })
      .finally(() => {
        setLoading(false);
      });
  }
};

export const setValuesToPropertyList = (
  selectedItem: any,
  assocProp: any,
  item: any,
  columns: Array<any>,
  actions: any
) => {
  const setPropertyList = columns
    .filter(col => col.setProperty)
    .map(col => {
      return {
        source: col.value,
        target: col.setProperty,
        key: col.key,
        primary: col.value,
        secondary: col.secondary
      };
    });
  let valueToSet: any = null;
  if (setPropertyList.length > 0) {
    let secIndex = 0;
    setPropertyList.forEach(prop => {
      if (prop.key === 'true' && item) {
        valueToSet = item?.id ?? '';
      } else if (prop.primary === 'true' || !item) {
        valueToSet = selectedItem?.primary ?? '';
      }
      if (prop.target === 'Associated property') {
        handleEvent(actions, 'changeNblur', assocProp, valueToSet);
      } else {
        actions.updateFieldValue(
          `.${prop.target.startsWith('.') ? prop.target.substring(1) : prop.target}`,
          item?.secondaryFieldValues[secIndex]
        );
        actions.triggerFieldChange(
          `.${prop.target.startsWith('.') ? prop.target.substring(1) : prop.target}`,
          item?.secondaryFieldValues[secIndex],
          true
        );

        secIndex += 1;
      }
    });
  }
  return valueToSet;
};

export const setValueToAssocProp = (
  assocProp: any,
  selectedItem: any,
  listType: string,
  listSource: Array<any>,
  actions: any,
  columns: Array<any>
) => {
  let searchedEntry: any = null;
  let retValue: any;
  if (listSource && listSource.length > 0 && listSource[0]) {
    searchedEntry = listSource.filter(
      item =>
        item.id &&
        selectedItem?.id &&
        item.id.length === selectedItem?.id.length &&
        item.id.toString().toLowerCase() === selectedItem?.id.toString().toLowerCase()
    );
  }
  if (listType === 'associated') {
    if (searchedEntry && searchedEntry.length > 0 && searchedEntry[0].id) {
      retValue = searchedEntry[0].id;
      handleEvent(actions, 'changeNblur', assocProp, searchedEntry[0].id);
    } else {
      retValue = selectedItem?.id ?? '';
      handleEvent(actions, 'changeNblur', assocProp, selectedItem?.id);
    }
  } else if (listType === 'datapage') {
    retValue = setValuesToPropertyList(
      selectedItem,
      assocProp,
      searchedEntry?.[0],
      columns,
      actions
    );
  }
  return retValue;
};

const DisplayComponent = (props: JaygasiExtensionsPizzaSearchboxPropsSubSet) => {
  const { selected, actualValue, isTableFormatter, formatter } = props;

  const displayCompValue = selected ? selected.primary : actualValue;
  const formattedValue =
    isTableFormatter && formatExists(formatter)
      ? textFormatter(formatter, displayCompValue)
      : displayCompValue;

  return formattedValue || <span aria-hidden='true'>&ndash;&ndash;</span>;
};


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaSearchbox(props: JaygasiExtensionsPizzaSearchboxProps) {
  const {
    getPConnect,
    value,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    testId,
    matchPosition = 'contains',
    maxResultsDisplay,
    cacheLifeSpan,
    displayMode,
    onRecordChange,
    createNewRecord,
    datasourceMetadata,
    deferDatasource,
    additionalProps = {},
    referenceType,
    primaryField,
    isTableFormatter = false,
    descriptors,
    dataRelationshipContext,
    hasSuggestions = false,
    contextClass
  } = props;
  const { formatter } = props;
  let { listType, datasource = [], parameters = {}, columns = [] } = props;

  // enable searhing based on the key
  const { isSearchableOnKey } = props;

  const [items, setItems] = useState(() => []);
  let selectItem: ((id: string, ev?: any) => void) | ((arg0: never) => void);

  // convert associated to datapage listtype and transform props
  // Process deferDatasource when datapage name is present. WHhen tableType is promptList / localList
  // no need to make any datapage call
  if (deferDatasource && datasourceMetadata?.datasource?.name) {
    listType = 'datapage';
    datasource = datasourceMetadata.datasource.name;
    parameters = flattenParameters(datasourceMetadata.datasource.parameters);
    let displayProp = datasourceMetadata.datasource.propertyForDisplayText.startsWith('@P')
      ? datasourceMetadata.datasource.propertyForDisplayText.substring(3)
      : datasourceMetadata.datasource.propertyForDisplayText;
    const valueProp = datasourceMetadata.datasource.propertyForValue.startsWith('@P')
      ? datasourceMetadata.datasource.propertyForValue.substring(3)
      : datasourceMetadata.datasource.propertyForValue;
    if (displayProp === '') {
      displayProp = valueProp;
    }
    let hasKey = false;
    let hasAPrimaryColumn = false;
    columns?.forEach(column => {
      if (!hasKey && column.key === 'true') {
        hasKey = true;
      }
      if (!hasAPrimaryColumn && column.primary === 'true') {
        hasAPrimaryColumn = true;
      }
    });
    if (!hasKey) {
      columns = [
        ...columns,
        {
          key: 'true',
          setProperty: 'Associated property',
          value: valueProp
        }
      ];
    }
    if (!hasAPrimaryColumn) {
      columns = [
        ...columns,
        {
          display: 'true',
          primary: 'true',
          useForSearch: true,
          value: displayProp
        }
      ];
    }

    // to make the Autosearch Searchable on the key value
    if (isSearchableOnKey) {
      const existingColObj = columns.filter(col => col.value === valueProp);
      if (existingColObj) {
        columns.forEach(col => {
          if (col.value === valueProp) {
            col.useForSearch = true;
            col.display = 'true';
            col.secondary = 'true';
          }
        });
      } else {
        columns = [
          ...columns,
          {
            display: 'true',
            secondary: 'true',
            useForSearch: true,
            value: valueProp
          }
        ];
      }
    }
  }

  // BUG-547602: Temporary type coercion for 8.5 until DXAPIs are enhanced to pass original pxViewMetadata JSON, respecting boolean primitives
  let { readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    prop => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const AC_TYPE = 'single-select';
  const pConn = getPConnect();
  const contextName = getPConnect().getContextName();
  const actions = pConn.getActionsApi();
  const [dataApiObj, setDataApiObj] = useState(() => ({} as any));
  const [filterValue, setFilterValue] = useState('');
  const [loading, setLoading] = useState(listType !== 'associated');
  // const selected = useMemo(() => menuHelpers.getSelected(items)[0], [items]);
  const [selected, setSelected] = useState();
  const hasMoreResults = useRef(true);
  const inputValueRef = useRef('');
  const displayFieldMeta: any = useRef(null);
  const [actualValue, setActualValue] = useState();
  const [newRecordCreated, setNewRecordCreated] = useState();

  const searchHandlerThrottled = throttle(doSearch, 500);
  const searchHandlerDebounced = debounce(doSearch, 500);
  const paginateHelperApis = usePaginate();
  const isMount = useIsMount();
  const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);
  const memoizedParameters = useDeepMemo(() => {
    return parameters;
  }, [parameters]);

  const updatedColumns = useMemo(() => {
    const isSecondaryColumnAvailable = columns.some(col => col.secondary === 'true');
    if (referenceType === 'Case' && !isSecondaryColumnAvailable) {
      const valueProp = columns.filter(col => col.key === 'true')[0].value;
      const existingColObj = columns.filter(col => col.value === valueProp);
      if (existingColObj) {
        columns.forEach(col => {
          if (col.value === valueProp) {
            col.display = 'true';
            col.secondary = 'true';
            col.useForSearch = 'true';
          }
        });
      } else {
        columns = [
          ...columns,
          {
            value: valueProp.startsWith('.') ? valueProp.substring(1) : valueProp,
            display: 'true',
            secondary: 'true',
            useForSearch: 'true'
          }
        ];
      }
    }

    if (descriptors && (referenceType === 'Case' || referenceType === 'Data')) {
      const descriptorColumns = descriptors.map((item: string) => {
        if (isSelfReferencedProperty(item, dataRelationshipContext) && !item.includes('(')) {
          const name = getDescriptorsFieldName(item, contextClass);
          return {
            value: name,
            display: 'false',
            secondary: 'true',
            useForSearch: 'false',
            setProperty: `${item.substring(3)}`
          };
        }
        return item;
      });
      columns = descriptorColumns ? [...columns, ...descriptorColumns] : columns;
    }
    return columns;
  }, [listType]);

  const dataConfig = useDeepMemo(() => {
    return {
      dataSource: datasource,
      parameters: memoizedParameters,
      matchPosition,
      listType,
      columns: preProcessColumns(updatedColumns),
      cacheLifeSpan: cacheLifeSpan || 'form',
      deferDatasource,
      pageSize: '50',
      enablePagination: true
    };
  }, [datasource, memoizedParameters, matchPosition, listType, maxResultsDisplay]);

  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    }
    if (hasSuggestions) {
      setStatus('pending');
    } else if (!hasSuggestions && status !== 'success') {
      setStatus(validatemessage !== '' ? 'error' : undefined);
    }
  }, [validatemessage, hasSuggestions]);

  // Rearranging the columns to default columns defined as key to be used as secondary columns for Case references
  useEffect(() => {
    displayFieldMeta.current =
      listType !== 'associated'
        ? getDisplayFieldsMetaData(dataConfig.columns as Array<any>)
        : ({ key: '', primary: '', secondary: [], hidden: [] } as any);
  }, []);

  // Handling setting the combobox list for listType associated use case
  useEffect(() => {
    if (listType === 'associated') {
      const associatedItems = datasource.map((entry: { key: any; value: any }) => {
        return { id: entry.key, primary: entry.value };
      });
      const updatedItems = menuHelpers.selectItem(associatedItems, value?.toString(), AC_TYPE);
      const selectedItem = menuHelpers.getSelected(updatedItems)[0];
      const initialPaginatedRecords = paginateHelperApis.getInitialPaginatedRecords(
        associatedItems,
        dataConfig.matchPosition
      );
      const findSelectedItem = initialPaginatedRecords.find(
        (record: { id: string }) => record.id === selectedItem?.id
      );
      if (!findSelectedItem && selectedItem) {
        initialPaginatedRecords.push(selectedItem);
      }
      setItems(initialPaginatedRecords);
      setSelected(selectedItem as SetStateAction<any>);
      setActualValue(value);
      setFilterValue('');
      inputValueRef.current = '';
    }
  }, [listType, datasource, value]);

  useEffect(() => {
    if (!displayMode && listType === 'datapage') {
      let displayItem:
        | ((prevState: undefined) => undefined)
        | { id: any; primary: string; secondary: Array<any> }
        | { id: any; primary: string; secondary?: undefined }
        | null
        | undefined = null;
      if (referenceType === 'Case' || referenceType === 'Data') {
        displayItem =
          referenceType === 'Case'
            ? {
                id: value,
                primary: primaryField,
                secondary: [value]
              }
            : {
                id: value,
                primary: primaryField
              };
        setSelected(displayItem as any);
      }
      PCore.getDataApi()
        .init(dataConfig, contextName)
        .then((dataObj: any) => {
          setDataApiObj(dataObj);
          // To avoid calling doSearch if someone types/pastes value before the API call is made
          if (!filterValue)
            doSearch(
              '',
              getDisplayFieldsMetaData(dataConfig.columns),
              dataObj,
              setItems as any,
              setLoading,
              hasMoreResults,
              {
                fetchDisplayValue: false,
                value,
                displayItem,
                AC_TYPE,
                setSelected,
                setFilterValue,
                paginateHelperApis,
                pConn
              }
            );
        });
    }
  }, [value, primaryField, newRecordCreated]);

  useEffect(() => {
    // Checking if Case/Data ref is only called for re-render and not for mount
    const dataRefMount = isMount && (referenceType === 'Case' || referenceType === 'Data');
    if (!dataRefMount && !displayMode && listType === 'datapage') {
      PCore.getDataApi()
        .init(dataConfig, contextName)
        .then((dataObj: any) => {
          setDataApiObj(dataObj);
          // To avoid calling doSearch if someone types/pastes value before the API call is made
          if (!filterValue) {
            if (displayFieldMeta?.current?.key === displayFieldMeta?.current?.primary) {
              const displayItem = {
                id: value,
                primary: value,
                secondary: [],
                secondaryFieldValues: []
              };
              setSelected(displayItem as any);
              doSearch(
                '',
                getDisplayFieldsMetaData(dataConfig.columns),
                dataObj,
                setItems as any,
                setLoading,
                hasMoreResults,
                {
                  fetchDisplayValue: false,
                  value,
                  displayItem,
                  AC_TYPE,
                  setSelected,
                  setFilterValue,
                  paginateHelperApis,
                  pConn
                }
              );
            } else {
              doSearch(
                '',
                getDisplayFieldsMetaData(dataConfig.columns),
                dataObj,
                setItems as any,
                setLoading,
                hasMoreResults,
                {
                  fetchDisplayValue: true,
                  value,
                  AC_TYPE,
                  setSelected,
                  setFilterValue,
                  paginateHelperApis,
                  pConn
                }
              );
            }
          }
        });
    }
  }, [listType, dataConfig, contextName, value, memoizedParameters]);

  useEffect(() => {
    if (listType === 'datapage' && displayMode && displayMode?.length > 0 && value !== '') {
      let displayItem: any = null;
      if (referenceType === 'Case' || referenceType === 'Data') {
        displayItem =
          referenceType === 'Case'
            ? {
                id: value,
                primary: primaryField,
                secondary: [value]
              }
            : {
                id: value,
                primary: primaryField
              };
      }
      setSelected(displayItem as any);
      setActualValue(value);
    }
  }, [value, primaryField]);

  useEffect(() => {
    if (newRecordCreated) {
      selectItem(newRecordCreated);
      setNewRecordCreated(undefined);
    }
  }, [items.length]);

  useEffect(() => {
    if (
      listType === 'datapage' &&
      displayMode &&
      displayMode?.length > 0 &&
      value !== '' &&
      !(referenceType === 'Case' || referenceType === 'Data')
    ) {
      PCore.getDataApi()
        .init(dataConfig, contextName)
        .then((dataObj: any) => {
          setDataApiObj(dataObj);
          buildColumnForDisplayValue(dataObj);
          // SET matchPosition to EQUALS to return exact matching record
          dataObj.matchPosition = 'equals';
          dataObj
            .fetchData(value)
            .then((displayResponse: { data: Array<never> }) => {
              let columnsWithSetProperty: string | Array<any> = [];
              if (dataApiObj.columns) {
                columnsWithSetProperty = dataApiObj.columns
                  .filter(
                    (col: { setProperty: string }) =>
                      col.setProperty && col.setProperty !== 'Associated property'
                  )
                  .map((col: { value: any }) => {
                    return col.value;
                  });
              }
              const displayResponseData = displayResponse.data || [];

              const searchedItem = displayResponseData.map((entry: { [x: string]: any }) => {
                const secondaryArr: Array<any> = [];
                const secondaryFieldValues: Array<any> = [];
                displayFieldMeta.current.secondary.forEach((col: string) => {
                  if (!displayFieldMeta.hidden.includes(col)) secondaryArr.push(entry[col]);
                  if (columnsWithSetProperty.includes(col)) {
                    if (dataApiObj.isQueryable) {
                      secondaryFieldValues.push(entry[col]);
                    } else {
                      secondaryFieldValues.push(get(entry, getFieldNameFromEmbeddedFieldName(col)));
                    }
                  }
                });
                return {
                  id: entry[displayFieldMeta.current.key],
                  primary: entry[displayFieldMeta.current.primary],
                  secondary: secondaryArr,
                  secondaryFieldValues
                };
              });

              // @ts-ignore
              setSelected(searchedItem[0]);
              setActualValue(value);
              // RESET matchPosition
              dataObj.matchPosition = dataConfig.matchPosition;
            })
            .catch(() => {
              setActualValue(value);
              // RESET matchPosition
              dataObj.matchPosition = dataConfig.matchPosition;
            });
        });
    }
  }, [listType, dataConfig, contextName, value, memoizedParameters]);

  /* @ts-ignore */
  const clearSelections = () => {
    // @ts-ignore
    setItems(cur =>
      menuHelpers.mapTree(cur, item => {
        return {
          ...item,
          selected: false
        };
      })
    );
    setSelected(undefined);
    inputValueRef.current = '';
  };

  const onChangeHandler = (ev: { target: { value: any } }) => {
    if (hasSuggestions) {
      pConn.ignoreSuggestion('');
      setStatus(undefined);
    }

    dataApiObj.columns = dataConfig.columns;
    dataApiObj.matchPosition = dataConfig.matchPosition;
    const searchText = ev.target.value;
    inputValueRef.current = searchText;
    // If the user backspaces or deletes in full the input filterValue, Cosmos UX advises to deselect any items.
    if (!searchText) {
      clearSelections();
    }
    setFilterValue(searchText);
    if (listType === 'datapage' && dataApiObj.isQueryable) {
      hasMoreResults.current = true;
      if (searchText.length < 5) {
        searchHandlerThrottled(
          searchText,
          displayFieldMeta.current,
          dataApiObj,
          // @ts-ignore
          setItems,
          setLoading,
          hasMoreResults
        );
      } else {
        searchHandlerDebounced(
          searchText,
          displayFieldMeta.current,
          dataApiObj,
          // @ts-ignore
          setItems,
          setLoading,
          hasMoreResults
        );
      }
    } else if (
      listType === 'associated' ||
      (listType === 'datapage' && dataApiObj?.isQueryable === false)
    ) {
      paginateHelperApis.resetIndexes();
      const progressivePaginatedRecords = paginateHelperApis.fetchData(
        inputValueRef.current,
        false,
        dataApiObj.columns
      );
      setItems(progressivePaginatedRecords);
    }
  };

  const onBlurHandler = (ev: any) => {
    // @ts-ignore
    if (!ev?.id || ev?.id !== selected?.id) {
      const stateProps = pConn.getStateProps() as StateProps;
      const assocProp = stateProps.value;
      const propValue = setValueToAssocProp(
        assocProp,
        selected || null,
        listType,
        items,
        actions,
        dataConfig.columns
      );
      if (onRecordChange) {
        onRecordChange(ev, propValue);
      }
    }

    setFilterValue('');
    if (!selected && inputValueRef.current !== '') {
      if (listType === 'datapage' && dataApiObj.isQueryable) {
        hasMoreResults.current = true;
        searchHandlerThrottled(
          '',
          displayFieldMeta.current,
          dataApiObj,
          // @ts-ignore
          setItems,
          setLoading,
          hasMoreResults
        );
      } else if (
        listType === 'associated' ||
        (listType === 'datapage' && dataApiObj?.isQueryable === false)
      ) {
        paginateHelperApis.resetIndexes();
        const progressivePaginatedRecords = paginateHelperApis.fetchData('', false);
        setItems(progressivePaginatedRecords);
      }
    }
  };

  // const filtered = useMemo(() => {
  //   return filterValue && listType === "associated"
  //     ? filterAssociatedItems()
  //     : items;
  // }, [filterValue, items, listType]);

  selectItem = (id: string, ev: any = {}) => {
    const updatedItems = menuHelpers.selectItem(items, id, AC_TYPE);
    // @ts-ignore
    setItems(cur => menuHelpers.selectItem(cur, id, AC_TYPE));
    // @ts-ignore
    setSelected(menuHelpers.getSelected(updatedItems)[0]);
    // const { id: itemId } = menuHelpers.getSelected(updatedItems)[0];
    const assocProp = pConn.getStateProps().value;
    const propValue = setValueToAssocProp(
      assocProp,
      menuHelpers.getSelected(updatedItems)[0],
      listType,
      updatedItems,
      actions,
      dataConfig.columns
    );
    setFilterValue('');
    inputValueRef.current = '';
    if (onRecordChange) {
      ev.id = id;
      onRecordChange(ev, propValue);
    }
  };

  const removeDuplicates = (arrayOne: string | Array<any>, arrayTwo: Array<any>) => {
    arrayTwo = arrayTwo.filter((item: { id: any }) => {
      for (let i = 0, len = arrayOne.length; i < len; i += 1) {
        if (arrayOne[i].id === item.id) {
          return false;
        }
      }
      return true;
    });
    return arrayTwo;
  };

  const loadMore = () => {
    if (
      (listType === 'associated' ||
        (listType === 'datapage' && dataApiObj?.isQueryable === false)) &&
      paginateHelperApis.hasMoreResults(inputValueRef.current)
    ) {
      let progressivePaginatedRecords = paginateHelperApis.fetchData(inputValueRef.current, true);
      // @ts-ignore
      setItems(previousItems => {
        progressivePaginatedRecords = removeDuplicates(previousItems, progressivePaginatedRecords);
        return [...previousItems, ...progressivePaginatedRecords];
      });
    } else if (listType === 'datapage' && dataApiObj.isQueryable && hasMoreResults.current) {
      setLoading(true);
      dataApiObj
        .fetchPaginatedData(inputValueRef.current)
        .then((response: { pageSize: number; data: Array<never> }) => {
          setLoading(false);
          if (response.pageSize === 0 || response.pageSize < dataApiObj.pageSize) {
            hasMoreResults.current = false;
          }
          const listObjData = response.data || [];
          let columnsWithSetProperty: string | Array<any> = [];
          if (dataApiObj.columns) {
            columnsWithSetProperty = dataApiObj.columns
              .filter(
                (col: { setProperty: string }) =>
                  col.setProperty && col.setProperty !== 'Associated property'
              )
              .map((col: { value: any }) => {
                return col.value;
              });
          }

          const searchedItems = listObjData.map((entry: { [x: string]: any }) => {
            const secondaryArr: Array<any> = [];
            const secondaryFieldValues: Array<any> = [];
            displayFieldMeta.current.secondary.forEach((col: string) => {
              if (!displayFieldMeta.current.hidden.includes(col)) secondaryArr.push(entry[col]);
              if (columnsWithSetProperty.includes(col)) {
                if (dataApiObj.isQueryable) {
                  secondaryFieldValues.push(entry[col]);
                } else {
                  secondaryFieldValues.push(get(entry, getFieldNameFromEmbeddedFieldName(col)));
                }
              }
            });
            return {
              id: entry[displayFieldMeta.current.key],
              primary: entry[displayFieldMeta.current.primary],
              secondary: secondaryArr,
              secondaryFieldValues
            };
          });
          // @ts-ignore
          setItems(previousItems => [...previousItems, ...searchedItems]);
        })
        .catch(() => {
          setLoading(false);
          dataApiObj.pageSize -= 1;
        });
    }
  };

  const displayComponent = useMemo(() => {
    return <StyledJaygasiExtensionsPizzaSearchboxWrapper>
    <DisplayComponent {...{ selected, actualValue, isTableFormatter, formatter }} />
    </StyledJaygasiExtensionsPizzaSearchboxWrapper>;
  }, [selected, actualValue, isTableFormatter, formatter]);

  if (displayMode) {
    return displayComponent;
  }

  const onResolveSuggestionHandler = (accepted: boolean) => {
    suggestionsHandler(accepted, pConn, setStatus);
  };

  const createNewButtonHandler = () => {
    const { CREATE_STAGE_DONE } = PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS;
    createNewRecord().then(() => {
      PCore.getPubSubUtils().subscribe(
        CREATE_STAGE_DONE,
        (data: { caseId: string; caseType: string }) => {
          PCore.getDataApi().clearContextedCache(contextName);
          const newCaseId = data.caseId.split(' ').pop();
          if (data.caseType === contextClass && newRecordCreated !== newCaseId) {
            // @ts-ignore
            if (pConn.isMounted && dataConfig.pageSize > items.length) {
              // @ts-ignore
              setNewRecordCreated(newCaseId);
            } else {
              updatePropertiesForNewRecord(
                dataConfig,
                contextName,
                dataApiObj,
                setDataApiObj,
                displayFieldMeta,
                pConn,
                columns,
                actions,
                newCaseId
              );
            }

            PCore.getPubSubUtils().unsubscribe(CREATE_STAGE_DONE, contextClass);
          }
        },
        contextClass
      );
    });
  };


  return (
    <StyledJaygasiExtensionsPizzaSearchboxWrapper>
    <ComboBox
      {...additionalProps}
      testId={testId ?? label}
      info={validatemessage || helperText}
      status={status}
      value={filterValue}
      label={label}
      labelHidden={hideLabel}
      readOnly={readOnly}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      selected={{
        // @ts-ignore
        items: selected ? { text: selected.primary, id: selected.id } : undefined
      }}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      menu={{
        items: menuHelpers.mapTree(items, (item) => ({
          ...item,
          testId: item.id ?? undefined,
          // @ts-ignore
          selected: item.items ? undefined : !!item.selected || item.id === selected?.id
        })),
        onItemClick: selectItem,
        emptyText: pConn.getLocalizedValue('No items'),
        loading,
        loadMore,
        footer: createNewRecord ? (
          <Button
            label={PCore.getLocaleUtils().getLocaleValue('Create new', 'ComponentFields')}
            onClick={createNewButtonHandler}
            variant='link'
            // @ts-ignore
            compact='true'
          >
            <Icon name='plus' /> {PCore.getLocaleUtils().getLocaleValue('Create new', 'ComponentFields')}
          </Button>
        ) : undefined
      }}
      mode={AC_TYPE}
      onResolveSuggestion={onResolveSuggestionHandler}
    />
    </StyledJaygasiExtensionsPizzaSearchboxWrapper>
  );
}


export default withConfiguration(JaygasiExtensionsPizzaSearchbox);
