import { isEmbeddedField, isPageListInPath, PAGE, PAGELIST, buildAggOrCalcId } from './repeat-utils';
export const AT_FILTEREDLIST = '@FILTERED_LIST';
export const AT_PROPERTY = '@P';
/**
 * [getFieldNameFromEmbeddedFieldName]
 * Description    -               converting embeddedField name starting with !P! or !PL! to normal field
 * @ignore
 * @param {string} propertyName   EmbeddedField name starting with !P! or !PL!
 * @returns {string}              returns converted string without !P! or !PL! and :
 *
 * @example <caption>Example for getFieldNameFromEmbeddedFieldName </caption>
 * getFieldNameFromEmbeddedFieldName('!P!Organisation:Name') return 'Organisation.Name'
 * getFieldNameFromEmbeddedFieldName('!PL!Employees:Name') return 'Employees.Name'
 */
export function getFieldNameFromEmbeddedFieldName(propertyName) {
    let value = propertyName;
    if (value.startsWith(PAGE) || value.startsWith(PAGELIST)) {
        value = value.substring(value.lastIndexOf('!') + 1);
        value = value.replace(/:/g, '.');
    }
    return value;
}
/**
 * [getEmbeddedFieldName]
 * Description    -               converting normal field name to embedded field starting with !P! or !PL!
 * @ignore
 * @param {string} propertyName   Field name
 * @param {string} classID        classID of datapage
 * @returns {string}              returns converted string with !P! or !PL! and :
 *
 * @example <caption>Example for getEmbeddedFieldName </caption>
 * For page property, getEmbeddedFieldName('Organisation.Name') return '!P!Organisation:Name'
 * For pageList property, getEmbeddedFieldName('Employees.Name') return '!PL!Employees:Name'
 */
export function getEmbeddedFieldName(propertyName, classID) {
    let value = propertyName;
    if (isPageListInPath(value, classID)) {
        value = `!PL!${value.replace(/\./g, ':')}`;
    }
    else {
        value = `!P!${value.replace(/\./g, ':')}`;
    }
    return value;
}
/**
 * [updateMetaEmbeddedFieldID]
 * Description    -           If the fieldID in meta starts with '!P!' or '!PL!' and contains ':' then replace them with .(dot)
 * @ignore
 * @param {Array} metaFields  Fields metadata Array. Contains metadata of all the fields.
 */
export function updateMetaEmbeddedFieldID(metaFields) {
    return metaFields.forEach((metaField) => {
        if (metaField.fieldID?.startsWith(PAGE) || metaField.fieldID?.startsWith(PAGELIST)) {
            metaField.fieldID = getFieldNameFromEmbeddedFieldName(metaField.fieldID);
        }
    });
}
/**
 * [getConfigEmbeddedFieldsMeta]
 * Description    -           Get the metadata for configured embedded fields
 * @ignore
 * @param {Set} configFields  Set of config fields
 * @param {string} classID    clasID of datapage
 * @returns {Array}           Metadata of configured embedded fields
 */
export function getConfigEmbeddedFieldsMeta(configFields, classID) {
    const configEmbeddedFieldsMeta = [];
    configFields.forEach((field) => {
        let value = field;
        if (isEmbeddedField(value)) {
            // conversion Page.PageList[].property => Page.PageList.property
            if (value.includes('[')) {
                value = value.substring(0, value.indexOf('[')) + value.substring(value.indexOf(']') + 1);
            }
            const meta = PCore.getMetadataUtils().getEmbeddedPropertyMetadata(value, classID);
            meta.fieldID = field;
            configEmbeddedFieldsMeta.push(meta);
        }
    });
    return configEmbeddedFieldsMeta;
}
/**
 * [mergeConfigEmbeddedFieldsMeta]
 * Description    -           Get the metadata for configured embedded fields
 * @ignore
 * @param {Array} configEmbeddedFieldsMeta  config fields metadata.
 * @param {Array} metaFields  Fields metadata Array. Contains metadata of all the fields
 */
export function mergeConfigEmbeddedFieldsMeta(configEmbeddedFieldsMeta, metaFields) {
    const mergedMetaFields = [...metaFields];
    configEmbeddedFieldsMeta.forEach((configFieldMeta) => {
        const fieldMeta = metaFields.find((metaField) => metaField.fieldID === configFieldMeta.fieldID);
        if (!fieldMeta)
            mergedMetaFields.push(configFieldMeta);
    });
    return mergedMetaFields;
}
/**
 * [preparePropertyValue]
 * Description    -        Preparing pageList value from FILTERED_LIST annotation to Property annotation
 * @ignore
 * @param {string} value   Pagelist value starts with FILTERED_LIST annotation
 * @returns {string}       returns converted string starting with Property annotation
 *
 * @example <caption>Example for preparePropertyValue </caption>
 * preparePropertyValue('@FILTERED_LIST .Employees[].Name') return '@P .Employees.Name'
 */
// FIXME #EmbeddedPropertyPatch
// TODO: Remove this utility when we have nested response for queryable pageList and supports @FILTERED_LIST annotation
export function preparePropertyValue(value) {
    if (value.startsWith(AT_FILTEREDLIST)) {
        value = value.substring(value.indexOf(' ') + 1);
        value = value.substring(0, value.indexOf('[')) + value.substring(value.indexOf(']') + 1);
        value = `${AT_PROPERTY} ${value}`;
    }
    return value;
}
/**
 * [updatePageListFieldsConfig]
 * Description    -        updating configured pageList property's type and value
 * @ignore
 * @param {Array} configFields  configured fields
 *
 * @example <caption>Modified config pageListField </caption>
 *
    {
      "type": "ScalarList",
      "config": {
        "value": "@FILTERED_LIST .Employees[].Name",
        "label": "@L Emp_Name",
        "componentType": "TextInput",
        "readOnly": true
      }
    }
    modified to
    {
      "type": "TextInput",
      "config": {
        "value": "@P .Employees.Name",
        "label": "@L Emp_Name",
        "componentType": "TextInput",
        "readOnly": true
      }
    }
 */
// FIXME #EmbeddedPropertyPatch
// TODO: Remove this utility when we have nested response for queryable pageList and supports scalarList component
export function updatePageListFieldsConfig(configFields) {
    return configFields.forEach((item) => {
        if (item.type === 'ScalarList') {
            if (!item.config.originalValue) {
                item.config.originalValue = item.config.value;
            }
            item.config.value = preparePropertyValue(item.config.value);
        }
    });
}
/**
 * Update the renderer type for the properties of type Page.
 */
export function updatePageFieldsConfig(configFields, parentClassID) {
    return configFields.forEach((item) => {
        const { type, config: { value } } = item;
        const propertyName = PCore.getAnnotationUtils().getPropertyName(value);
        if (isEmbeddedField(value) && !isPageListInPath(propertyName, parentClassID)) {
            item.config.componentType = type;
            item.type = 'PagePropertyRenderer';
        }
    });
}
export function updateChangeSetValueKeys(changeSetObj, getOriginalProperty) {
    const newChangeSetObject = {};
    for (const [key, value] of Object.entries(changeSetObj)) {
        let newKey = key;
        if (newKey.startsWith(PAGE)) {
            newKey = `.${getOriginalProperty(newKey)}`;
        }
        newChangeSetObject[newKey] = value;
    }
    return newChangeSetObject;
}
/**
 * [isPageListProperty]
 * Description    -        checking if propertyName is pageList or not
 * @ignore
 * @param {string} propertyName   PropertyName
 * @returns {boolean}  true if property is pageList else false
 *
 * @example <caption>Example for isPageListProperty </caption>
 * isPageListProperty('!PL!Employees.Name') return true
 * isPageListProperty('!P!Employees.Name') return false
 * isPageListProperty('Name') return false
 */
export function isPageListProperty(propertyName) {
    return propertyName.startsWith(PAGELIST);
}
/**
 * [preparePropertyMaps]
 * Description    -        preparing maps for property names and set it in dataApi context
 * @ignore
 * @param {Array} fields   fields array
 * @param {string} classID  classID of datapage
 * @param {string} context  dataApi context
 * @returns {boolean} true if pageListProperty is present
 */
export function preparePropertyMaps(fields, classID, context) {
    const { setPropertyMaps } = context;
    const maps = fields.reduce((acc, field) => {
        let { value } = field.config;
        if (value.startsWith('@')) {
            value = value.substring(value.indexOf(' ') + 1);
            if (value[0] === '.')
                value = value.substring(1);
        }
        let name = value;
        // Preparing name for embedded property
        if (isEmbeddedField(name)) {
            name = getEmbeddedFieldName(name, classID);
        }
        if (isPageListProperty(name) && !acc[2]) {
            acc[2] = true;
        }
        acc[0][value] = name;
        acc[1][name] = value;
        return acc;
    }, [{}, {}, false]);
    setPropertyMaps(maps[0], maps[1]);
    return maps[2];
}
/**
 * [getPageListFields]
 * Description    -        getting pageListFields names from the fields
 * @ignore
 * @param {Array} fields   fields array
 * @returns {Array} array of pageListFields name
 */
// FIXME #EmbeddedPropertyPatch
// TODO: Remove this utility when we have nested response for queryable pageList property
export function getPageListFields(fields) {
    const parentPaths = new Set();
    const pageListFields = [];
    fields.forEach((field) => {
        const { name } = field;
        if (isPageListProperty(name)) {
            const parentPath = name.substring(0, name.lastIndexOf(':'));
            if (!parentPaths.has(parentPath)) {
                parentPaths.add(parentPath);
                pageListFields.push(name);
            }
        }
    });
    return pageListFields;
}
export function mergePageListFieldAggregation(pageListName, select, existingAggregations, existingAggregationsName) {
    // Build a dummy genericAggregationId to check if any type of aggregation for that pagelist is included in existing aggregations.
    const genericAggregationId = buildAggOrCalcId(pageListName, '');
    if (existingAggregationsName.includes(genericAggregationId)) {
        return;
    }
    const countAggregationId = buildAggOrCalcId(pageListName, 'COUNT');
    select.push({ aggregation: countAggregationId });
    existingAggregations[countAggregationId] = { field: pageListName, summaryFunction: 'COUNT' };
}
export function mergePageListFieldsAggregation(fields, select, existingAggregations) {
    const parentPaths = new Set();
    const existingAggregationsName = Object.keys(existingAggregations).toString();
    const pageListFields = [];
    fields.forEach((field) => {
        const { name } = field;
        if (isPageListProperty(name)) {
            const parentPath = name.substring(0, name.lastIndexOf(':'));
            if (!parentPaths.has(parentPath)) {
                parentPaths.add(parentPath);
                pageListFields.push(name);
                mergePageListFieldAggregation(name, select, existingAggregations, existingAggregationsName);
            }
        }
    });
    return pageListFields;
}
/**
 * [hasPageListProperty]
 * Description    -        getting pageListFields names from the fields
 * @ignore
 * @param {Array} fieldDefs   fields array
 * @returns {object | undefined} value of first pageListProperty found
 */
export function hasPageListProperty(fieldDefs) {
    return fieldDefs?.find((field) => isPageListProperty(field.name));
}
