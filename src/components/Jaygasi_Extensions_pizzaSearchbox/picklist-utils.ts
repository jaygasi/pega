// import { object } from 'prop-types';
// @ts-nocheck

export const flattenParameters = (parameters = {}) => {
  const flatParams = {};
  let requireFlattening = true;
  Object.keys(parameters).forEach((key) => {
    if (typeof parameters[key] !== 'object') {
      requireFlattening = false;
    } else {
      requireFlattening = true;
      const { name, value } = parameters[key];
      flatParams[name] = value;
    }
  });
  if (!requireFlattening) {
    return parameters;
  }
  return flatParams;
};

export const buildColumnForDisplayValue = (dataObj) => {
  if (dataObj.columns) {
    dataObj.columns = dataObj.columns.map((column) => {
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

export const extractFieldMetadata = (datasourceMetadata) => {
  const datasource = datasourceMetadata.datasource.name;
  const parameters = flattenParameters(datasourceMetadata.datasource.parameters);
  let displayProp = datasourceMetadata.datasource.propertyForDisplayText.startsWith('@P')
    ? datasourceMetadata.datasource.propertyForDisplayText.substring(3)
    : datasourceMetadata.datasource.propertyForDisplayText;
  const valueProp = datasourceMetadata.datasource.propertyForValue.startsWith('@P')
    ? datasourceMetadata.datasource.propertyForValue.substring(3)
    : datasourceMetadata.datasource.propertyForValue;
  if (displayProp === '') {
    displayProp = valueProp;
  }
  const columns = [
    {
      key: 'true',
      setProperty: 'Associated property',
      value: valueProp
    },
    {
      display: 'true',
      primary: 'true',
      useForSearch: true,
      value: displayProp
    }
  ];
  return { datasource, parameters, columns };
};

export const preProcessColumns = (columns) => {
  return columns.map((col) => {
    const tempColObj = { ...col };
    tempColObj.value = col.value && col.value.startsWith('.') ? col.value.substring(1) : col.value;
    return tempColObj;
  });
};

export const getDisplayFieldsMetaData = (columns) => {
  const displayColumns = columns.filter((col) => col.display === 'true' || col.secondary === 'true');
  const metaDataObj = { key: '', primary: '', secondary: [], hidden: [] };
  const keyCol = columns.filter((col) => col.key === 'true');
  metaDataObj.key = keyCol.length > 0 ? keyCol[0].value : 'auto';
  for (let index = 0; index < displayColumns.length; index += 1) {
    if (displayColumns[index].primary === 'true') {
      metaDataObj.primary = displayColumns[index].value;
    } else {
      if (displayColumns[index].display === 'false') {
        metaDataObj.hidden.push(displayColumns[index].value);
      }
      metaDataObj.secondary.push(displayColumns[index].value);
    }
  }
  return metaDataObj;
};
