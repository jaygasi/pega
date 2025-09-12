import { useEffect, useRef } from 'react';
import equal from 'fast-deep-equal';
import get from 'lodash.get';

import { getFieldNameFromEmbeddedFieldName } from './embed-utils';

import { buildColumnForDisplayValue, setValuesToPropertyList } from './index';

export function usePaginate() {
  const paginatationProperties = useRef({
    startIndex: 0,
    endIndex: 50,
    matchPosition: '',
    totalRecords: []
  });

  useEffect(() => {
    // clean up on unmount
    return () => {
      // @ts-ignore
      paginatationProperties.current = null;
    };
  }, []);

  const getInitialPaginatedRecords = (totalRecords: any, matchPosition: string) => {
    const initialPaginatedRecords = totalRecords.slice(0, 50);
    paginatationProperties.current.startIndex = 0;
    paginatationProperties.current.endIndex = 50;
    paginatationProperties.current.matchPosition = matchPosition;
    paginatationProperties.current.totalRecords = totalRecords;
    return initialPaginatedRecords;
  };

  const positionMatches = (text: string, searchText: string) => {
    switch (paginatationProperties.current.matchPosition) {
      case 'start':
        return text.toLowerCase().startsWith(searchText.toLowerCase());
      case 'contains':
        return text.toLowerCase().includes(searchText.toLowerCase());
      default:
        return false;
    }
  };

  const fetchData = (searchText: string, onScroll: boolean, columns = []) => {
    let progressivePaginatedRecords;
    paginatationProperties.current.startIndex += 50;
    paginatationProperties.current.endIndex += 50;

    if (searchText === '' || searchText === undefined || searchText === null) {
      // paginate on entire resultset
      progressivePaginatedRecords = paginatationProperties.current.totalRecords.slice(
        paginatationProperties.current.startIndex,
        paginatationProperties.current.endIndex
      );
    } else if (onScroll) {
      // paginate on filtered resultset
      // @ts-ignore
      progressivePaginatedRecords = paginatationProperties.current.filteredRecords.slice(
        paginatationProperties.current.startIndex,
        paginatationProperties.current.endIndex
      );
    } else {
      // @ts-ignore
      const searchInSecondaryItem = columns.some(e => e.secondary && e.useForSearch);
      // Filter the items and paginate on filtered resultset
      const filteredRecords = paginatationProperties.current.totalRecords.filter(
        filteritem =>
          // @ts-ignore
          (filteritem.primary && positionMatches(filteritem.primary, searchText)) ||
          (searchInSecondaryItem &&
            // @ts-ignore
            filteritem.secondary &&
            // @ts-ignore
            filteritem.secondary.length > 0 &&
            // @ts-ignore
            filteritem.secondary.find(item => positionMatches(item, searchText)))
      );
      progressivePaginatedRecords = filteredRecords.slice(
        paginatationProperties.current.startIndex,
        paginatationProperties.current.endIndex
      );
      // @ts-ignore
      paginatationProperties.current.filteredRecords = filteredRecords;
    }
    return progressivePaginatedRecords;
  };

  const resetIndexes = () => {
    paginatationProperties.current.startIndex = -50;
    paginatationProperties.current.endIndex = 0;
  };

  const hasMoreResults = (searchText: string) => {
    if (searchText === '' || searchText === undefined || searchText === null) {
      return (
        paginatationProperties.current.startIndex + 50 <
        paginatationProperties.current.totalRecords.length
      );
    }
    return (
      // @ts-ignore
      paginatationProperties.current.startIndex + 50 <
      // @ts-ignore
      paginatationProperties.current.filteredRecords.length
    );
  };

  return {
    getInitialPaginatedRecords,
    fetchData,
    resetIndexes,
    hasMoreResults
  };
}

export function useDeepMemo(memoFn: any, key: any) {
  const ref = useRef();
  // @ts-ignore
  if (!ref.current || !equal(key, ref.current.key)) {
    // @ts-ignore
    ref.current = { key, value: memoFn() };
  }
  // @ts-ignore
  return ref.current.value;
}

export function useIsMount() {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
}

const transformSearchedItem = (
  displayResponseData: any,
  displayFieldMeta: any,
  columnsWithSetProperty: any,
  dataApiObj: any
) => {
  // @ts-ignore
  return displayResponseData.map(entry => {
    const secondaryArr: Array<any> = [];
    const secondaryFieldValues: Array<any> = [];
    // @ts-ignore
    displayFieldMeta.current.secondary.forEach(col => {
      if (!displayFieldMeta.hidden?.includes(col)) secondaryArr.push(entry[col]);
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
};

// @ts-ignore
export const updatePropertiesForNewRecord = (
  dataConfig: any,
  contextName: any,
  dataApiObj: any,
  setDataApiObj: any,
  displayFieldMeta: any,
  c11nEnv: any,
  columns: Array<any>,
  actions: any,
  newCaseId: string
) => {
  PCore.getDataApi()
    .init(dataConfig, contextName)
    .then(dataObj => {
      setDataApiObj(dataObj);
      buildColumnForDisplayValue(dataObj);
      // SET matchPosition to EQUALS to return exact matching record
      // @ts-ignore
      dataObj.matchPosition = 'equals';
      // @ts-ignore
      dataObj
        .fetchData(newCaseId)
        // @ts-ignore
        .then((displayResponse: any) => {
          let columnsWithSetProperty = [];
          if (dataApiObj.columns) {
            columnsWithSetProperty = dataApiObj.columns
              // @ts-ignore
              .filter(col => col.setProperty && col.setProperty !== 'Associated property')
              // @ts-ignore
              .map(col => col.value);
          }
          const displayResponseData = displayResponse.data || [];

          const searchedItem = transformSearchedItem(
            displayResponseData,
            displayFieldMeta,
            columnsWithSetProperty,
            dataApiObj
          );
          setValuesToPropertyList(
            searchedItem[0],
            c11nEnv.getStateProps().value,
            searchedItem[0],
            columns,
            actions
          );
        })
        .finally(() => {
          // RESET matchPosition
          // @ts-ignore
          dataObj.matchPosition = dataConfig.matchPosition;
        });
    });
};
