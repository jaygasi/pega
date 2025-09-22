/* eslint-disable sonarjs/no-collapsible-if */
/* eslint-disable func-names */
// @ts-nocheck
import { splitConditionTree } from '@pega/cosmos-react-condition-builder';
import cloneDeep from 'lodash/cloneDeep.js';
import DateTimeFormatter from './date';
import Constants from './component-constants';
import { getEmbeddedFieldName, mergePageListFieldAggregation } from './embed-utils';
import { confirmationModalLabels } from './repeat-constants';
export const SIMPLE_TABLE_MANUAL_READONLY = 'SimpleTableManualReadOnly';
export const PAGE = '!P!';
export const PAGELIST = '!PL!';
/** Date-functions supported by the Data-views API */
export const defaultDateFunctions = {
    // TODO: Enable HOURS
    DATE_TIME: [
        'YEARS',
        'QUARTERS',
        'MONTHS',
        'WEEKS',
        'DAYS',
        'HOURS',
        'MINUTES',
        'MONTHS_OF_YEAR',
        'DAYS_OF_MONTH',
        'DAYS_OF_WEEK',
        'HOURS_OF_DAY'
    ],
    DATE_ONLY: ['YEARS', 'QUARTERS', 'MONTHS', 'WEEKS', 'MONTHS_OF_YEAR', 'DAYS_OF_MONTH', 'DAYS_OF_WEEK']
};
export function getMappedKey(key) {
    const mappedKey = PCore.getEnvironmentInfo().getKeyMapping(key);
    if (!mappedKey) {
        return key;
    }
    return mappedKey;
}
export function launchLocalAction(getPConnect, rowContext, action, cb) {
    const pConnect = getPConnect && getPConnect();
    const actionsAPI = pConnect && pConnect.getActionsApi();
    const openLocalAction = actionsAPI && actionsAPI.openLocalAction.bind(actionsAPI);
    const assignmentID = rowContext[getMappedKey('pzInsKey')];
    let caseID;
    if (assignmentID.indexOf('!') === -1) {
        caseID = assignmentID;
    }
    else {
        // "ASSIGN-WORKLIST ON8TTL-C11NGALL-WORK LAT-3!ENTERINFO_FLOW_1" use case
        const [assignKey] = assignmentID.split('!');
        const [, className, workId] = assignKey.split(' ');
        // eslint-disable-next-line prefer-template
        caseID = className + ' ' + workId;
    }
    openLocalAction(action.ID, {
        caseID,
        type: 'express',
        containerName: 'modal',
        name: action.name,
        callbacks: {
            submit: (response) => {
                console.log('callback for modal submit');
                console.log(response);
                cb();
            },
            cancel: () => {
                cb();
            }
        },
        refreshConditions: action.refreshConditions
    });
}
export function launchBulkAction(getPConnect, selectedList, action, caseTypeID, cb) {
    const pConnect = getPConnect && getPConnect();
    const actionsAPI = pConnect && pConnect.getActionsApi();
    const openBulkAction = actionsAPI && actionsAPI.openBulkAction.bind(actionsAPI);
    const caseSummary = getPConnect().getCaseSummary();
    const { ID: bulkContextID, caseTypeID: bulkContextType } = caseSummary;
    openBulkAction(action.ID, {
        selectedList,
        type: 'express',
        containerName: 'modal',
        name: action.name,
        caseTypeID,
        bulkContextID,
        bulkContextType,
        callbacks: {
            submit: (response) => {
                console.log(response);
                console.log('callback for modal submit 1');
                if (typeof cb === 'function') {
                    cb();
                }
            },
            cancel: () => {
                console.log('callback for modal submit 2');
            }
        },
        showProgress: true,
        progressMessage: 'Updating data... please wait'
    });
}
function getFieldMapByName(fieldDefs) {
    return fieldDefs.reduce((acc, field) => {
        acc[field.name] = field;
        return acc;
    }, {});
}
const updateDateTimeField = (expr, fieldMap, dateOnlyFunctions, timezone) => {
    if (expr.condition) {
        // TODO: Get back to this after knowing if the server api considers timezone or not and how it works internally
        if (fieldMap[expr.condition.lhs.field].type === 'datetime' &&
            expr.condition.rhs?.value &&
            (!expr.condition.rhs?.dateFunction ||
                (expr.condition.rhs?.dateFunction && !dateOnlyFunctions.includes(expr.condition.rhs?.dateFunction)))) {
            if (expr.condition.rhs?.dateFunction === 'HOURS_OF_DAY') {
                expr.condition.rhs.value = Number(expr.condition.rhs.value).toString().padStart(2, '0');
            }
            else {
                expr.condition.rhs.value = new Date(DateTimeFormatter.convertFromTimezone(expr.condition.rhs.value, timezone)).toISOString();
            }
        }
    }
    else if (Array.isArray(expr)) {
        expr.forEach((e) => updateDateTimeField(e, fieldMap, dateOnlyFunctions, timezone));
    }
    else {
        Object.values(expr).forEach((e) => updateDateTimeField(e, fieldMap, dateOnlyFunctions, timezone));
    }
};
export function updateWithTimeZone(stateFromTable, meta) {
    const { externalFilters } = meta;
    const isExternalFiltersExist = externalFilters &&
        stateFromTable.externalState?.[externalFilters] &&
        Object.keys(stateFromTable.externalState?.[externalFilters]).length > 0;
    if (!(stateFromTable.filterExpression || isExternalFiltersExist)) {
        return stateFromTable;
    }
    stateFromTable = cloneDeep(stateFromTable);
    const fieldMap = getFieldMapByName(meta.fieldDefs);
    const environmentInfo = PCore.getEnvironmentInfo();
    const timezone = environmentInfo && environmentInfo.getTimeZone();
    const dateOnlyFunctions = [...defaultDateFunctions.DATE_ONLY, 'DAYS'];
    if (stateFromTable.filterExpression) {
        updateDateTimeField(stateFromTable.filterExpression, fieldMap, dateOnlyFunctions, timezone);
    }
    if (isExternalFiltersExist) {
        updateDateTimeField(stateFromTable.externalState[externalFilters], fieldMap, dateOnlyFunctions, timezone);
    }
    return stateFromTable;
}
export function isHybrid() {
    return typeof pega !== 'undefined' && typeof pega.desktop !== 'undefined';
}
export const isPageListInPath = (propertyName, currentClassID) => {
    if (!propertyName.includes('.')) {
        return false;
    }
    const [first, ...rest] = propertyName.split('.');
    const metadata = PCore.getMetadataUtils().getPropertyMetadata(first, currentClassID);
    if (metadata?.type === 'Page List') {
        return true;
    }
    return isPageListInPath(rest.join('.'), metadata?.pageClass);
};
export const isEmbeddedField = (field) => {
    if (field?.startsWith('@')) {
        field = field.substring(field.indexOf(' ') + 1);
        if (field[0] === '.')
            field = field.substring(1);
    }
    return field?.indexOf('.') > 0;
};
// Take a filterExpression created by ConditionBuilder, and convert to match table's group/sort syntax
export const getFieldListFromFilter = (filterExpression) => {
    const splitFilter = splitConditionTree(filterExpression);
    const arrFilter = Object.values(splitFilter.conditions);
    const filterReferences = [];
    // Add in any field references
    arrFilter.forEach((item) => {
        if (item.lhs?.field) {
            filterReferences.push({ columnId: item.lhs.field });
        }
        if (item.rhs?.field) {
            filterReferences.push({ columnId: item.rhs.field });
        }
    });
    return filterReferences;
};
// Todo : This check used to skip fetch data in grouping, remove it once its handled by table  --> in ServerApi.js
// and also used to make fetchAllData if groups are applied --> in DataApi.js
export function isGroupingAdded(state) {
    const { groups, groupFilters } = state;
    return groups && groups.length > 0 && !(groupFilters && groupFilters.length > 0);
}
/*
  It validates and returns the dataviewParameters.
*/
export function getDataViewParameters(parameters, runtimeParams) {
    if (!runtimeParams || !parameters)
        return {};
    return Object.keys(runtimeParams)
        .filter((key) => parameters.find((e) => e.name === key) && runtimeParams[key] !== '')
        .reduce((obj, key) => {
        return {
            ...obj,
            [key]: runtimeParams[key]
        };
    }, {});
}
export function generateKeyFromCompositeKeys(compositeKeys, rowData) {
    const key = compositeKeys.reduce((acc, k) => (rowData[k] ? `${acc}${rowData[k]}` : acc), '').trim();
    return `${key}`;
}
export function getLookUpDataPageInfo(classID) {
    const lookUpDatePage = PCore.getDataTypeUtils().getLookUpDataPage(classID);
    const lookUpDataPageInfo = PCore.getDataTypeUtils().getLookUpDataPageInfo(classID);
    return { lookUpDatePage, lookUpDataPageInfo };
}
export function isAlternateKeyStorageForLookUp(lookUpDataPageInfo) {
    return !!lookUpDataPageInfo?.isAlternateKeyStorage;
}
export const isSelfReferencedProperty = (param, referenceProp) => {
    const [, parentPropName] = param.split('.');
    const referencePropParent = referenceProp?.split('.').pop();
    return parentPropName === referencePropParent;
};
/*
  convert configured descriptors/parameters fieldNames
  for leaf level property - @P .Employee.Name -> Name
  for embedded porperty - @P .Employee.Address.City -> !P!Address:City
*/
export function getDescriptorsFieldName(property, pageClass) {
    if (property.startsWith('@')) {
        property = property.substring(property.indexOf(' ') + 1);
        if (property[0] === '.')
            property = property.substring(1);
    }
    property = property.substring(property.indexOf('.') + 1);
    if (isEmbeddedField(property)) {
        return getEmbeddedFieldName(property, pageClass);
    }
    return property;
}
// eslint-disable-next-line @typescript-eslint/default-param-last, sonarjs/cognitive-complexity
export function preparePatchQueryFields(fields, isDataObject = false, classID = '', getPConnect) {
    const queryFields = [];
    // Descriptors can be configured only for single selectionMode properties
    const configProps = getPConnect?.().getRawConfigProps();
    if (configProps?.descriptors?.length) {
        const { descriptors, dataRelationshipContext, pageClass } = getPConnect().getRawConfigProps();
        descriptors.forEach((value) => {
            if (isSelfReferencedProperty(value, dataRelationshipContext) && !value.includes('(')) {
                const name = getDescriptorsFieldName(value, pageClass);
                queryFields.push(name);
            }
        });
    }
    const { lookUpDatePage, lookUpDataPageInfo } = getLookUpDataPageInfo(classID);
    fields.forEach((field) => {
        const pzInsKey = getMappedKey('pzInsKey');
        const pyID = getMappedKey('pyID');
        const pxObjClass = getMappedKey('pxObjClass');
        const pxRefObjectClass = getMappedKey('pxRefObjectClass');
        const patchFields = [];
        const { meta: { config } = {} } = field;
        if (field.cellRenderer === 'WorkLink') {
            if (field.customObject && field.customObject.isAssignmentLink) {
                const associationName = field.name.includes(':') ? `${field.name.split(':')[0]}:` : '';
                patchFields.push(`${associationName}${pzInsKey}`);
                patchFields.push(`${associationName}${pxRefObjectClass}`);
            }
            else if (field.customObject && field.customObject.isAssociation) {
                const associationCategory = field.name.split(':')[0];
                patchFields.push(`${associationCategory}:${pyID}`);
                patchFields.push(`${associationCategory}:${pzInsKey}`);
                patchFields.push(`${associationCategory}:${pxObjClass}`);
            }
            else if (isDataObject) {
                const dataViewName = PCore.getDataTypeUtils().getSavableDataPage(classID);
                const dataPageKeys = PCore.getDataTypeUtils().getDataPageKeys(dataViewName);
                dataPageKeys?.forEach((item) => item.isAlternateKeyStorage ? patchFields.push(item.linkedField) : patchFields.push(item.keyName));
            }
            else {
                patchFields.push(pyID);
                patchFields.push(pzInsKey);
                patchFields.push(pxObjClass);
            }
            if (lookUpDatePage && isAlternateKeyStorageForLookUp(lookUpDataPageInfo)) {
                const { parameters } = lookUpDataPageInfo;
                Object.keys(parameters).forEach((param) => {
                    const paramValue = parameters[param];
                    if (PCore.getAnnotationUtils().isProperty(paramValue)) {
                        patchFields.push(PCore.getAnnotationUtils().getPropertyName(paramValue));
                    }
                });
            }
        }
        else if (field.cellRenderer === 'UserReference') {
            // TODO: Support Embedded UserReference(.Page.UserReference) with field.cellRenderer === 'PageReferenceRenderer' || 'ScalarList'. Please check BUG-784885 / US-539805
            if (field.customObject.associationID) {
                patchFields.push(`${field.customObject.associationID}:pyUserName`);
            }
        }
        else if (field.cellRenderer === 'URL') {
            if (config?.urlLabelSelection === Constants.PROPERTY_REFERENCE && config?.propUrlLabel !== '') {
                patchFields.push(PCore.getAnnotationUtils().getPropertyName(config.propUrlLabel));
            }
        }
        else if (field.cellRenderer === 'Currency-Code') {
            if (config?.isoCodeSelection === Constants.PROPERTY_REFERENCE && config?.currencyISOCode !== '') {
                patchFields.push(PCore.getAnnotationUtils().getPropertyName(config.currencyISOCode));
            }
        }
        patchFields.forEach((k) => {
            if (!queryFields.find((q) => q === k)) {
                queryFields.push(k);
            }
        });
    });
    return queryFields;
}
function getFilterExpression(key, value = null, comparator = 'IS_NULL') {
    return {
        comparator,
        lhs: {
            field: key
        },
        ...(value && { rhs: { value } })
    };
}
export function prepareFilters(keys = [], data = {}, logicOperator = '') {
    if (!(keys.length && Object.keys(data))) {
        return null;
    }
    let logicString = '';
    const filterConditions = {};
    keys.forEach((key, index) => {
        const value = data[key];
        let filterExpression = {};
        if (value) {
            filterExpression = getFilterExpression(key, value, 'EQ');
        }
        else {
            filterExpression = getFilterExpression(key);
        }
        filterConditions[`T${index + 1}`] = filterExpression;
        if (index + 1 !== keys.length) {
            logicString = `${logicString}T${index + 1} ${logicOperator} `;
        }
        else {
            logicString = `${logicString}T${index + 1}`;
        }
    });
    return { logic: logicString, filterConditions };
}
export function prepareAdditionalApiParams({ useExtendedTimeout, includeTotalCount } = {}) {
    const additionalApiParams = {};
    if (useExtendedTimeout) {
        additionalApiParams.useExtendedTimeout = useExtendedTimeout;
    }
    additionalApiParams.includeTotalCount = includeTotalCount;
    return additionalApiParams;
}
function getTableViewName({ personalization = {} } = {}) {
    const activePersonalization = personalization.active;
    return personalization.allPersonalizations?.[activePersonalization]?.name;
}
export function getLabelsForTimeoutModal(tableState) {
    const getLocaleValue = PCore.getLocaleUtils().getLocaleValue;
    let { heading, genericDescription, tableNameMessagePrefix, tableNameMessageSuffix, cancelButtonLabel, submitButtonLabel } = confirmationModalLabels.TIMEOUT;
    heading = getLocaleValue(heading, 'TableConfirmationModal');
    genericDescription = getLocaleValue(genericDescription, 'TableConfirmationModal');
    tableNameMessagePrefix = getLocaleValue(tableNameMessagePrefix, 'TableConfirmationModal');
    tableNameMessageSuffix = getLocaleValue(tableNameMessageSuffix, 'TableConfirmationModal');
    cancelButtonLabel = getLocaleValue(cancelButtonLabel, 'TableConfirmationModal');
    submitButtonLabel = getLocaleValue(submitButtonLabel, 'TableConfirmationModal');
    const tableViewName = getTableViewName(tableState);
    const description = tableViewName
        ? `${tableNameMessagePrefix} ${tableViewName} ${tableNameMessageSuffix}`
        : genericDescription;
    return {
        heading,
        description,
        submitButtonLabel,
        cancelButtonLabel
    };
}
function isAssociationField(field) {
    return field.includes(':') && !(field.startsWith(PAGE) || field.startsWith(PAGELIST));
}
/**
 * [isAssociationAlreadyAdded]
 * Description    -  A utility to be called when it is required to check only one field of an association should be considered.
 * @ignore
 * @param {string} field  field name
 * @param {Set} associationNames  a utility set of associations that will be used to add association parents names in case it is not considered before.
 * @returns {boolean} if association is already considered or not
 */
function isAssociationAlreadyAdded(field, associationNames) {
    const [associationName] = field.split(':');
    if (!associationNames.has(associationName)) {
        associationNames.add(associationName);
        return false;
    }
    return true;
}
export function getAssociationFieldsFromQuery(query) {
    const associationNames = new Set();
    return query?.select.filter(({ field }) => isAssociationField(field) && !isAssociationAlreadyAdded(field, associationNames));
}
// Other - Sort,group,filter fields
function getOtherRelevantFields(stateFromTable) {
    const otherRelevantFields = [];
    stateFromTable.sortingOrder?.forEach((sort) => {
        if (!otherRelevantFields.includes(sort.columnId)) {
            otherRelevantFields.push(sort.columnId);
        }
    });
    stateFromTable.groups?.forEach((group) => {
        if (!otherRelevantFields.includes(group.columnId)) {
            otherRelevantFields.push(group.columnId);
        }
    });
    if (stateFromTable.filterExpression) {
        const filterArray = getFieldListFromFilter(stateFromTable.filterExpression);
        filterArray.forEach((item) => {
            const id = item.columnId;
            if (!otherRelevantFields.includes(id)) {
                otherRelevantFields.push(id);
            }
        });
    }
    return otherRelevantFields;
}
export function mergeAssociationFieldsAggregations(meta, stateFromTable, select, existingAggregations) {
    const otherRelevantFields = meta.isAnalyticsTable ? getOtherRelevantFields(stateFromTable) : [];
    const existingAggregationNames = Object.keys(existingAggregations).toString();
    const associationNames = new Set();
    meta.fieldDefs.forEach(({ name }) => {
        if (isAssociationField(name) &&
            (meta.isAnalyticsTable
                ? !stateFromTable.hiddenColumns.includes(name) || otherRelevantFields.includes(name)
                : true) &&
            !isAssociationAlreadyAdded(name, associationNames)) {
            mergePageListFieldAggregation(name, select, existingAggregations, existingAggregationNames);
        }
    });
}
export function filterDuplicatesBy(id) {
    const uniqueSelectFields = new Set();
    return function (obj) {
        let check = false;
        if (obj[id] && !uniqueSelectFields.has(obj[id])) {
            uniqueSelectFields.add(obj[id]);
            check = true;
        }
        else if (!obj[id]) {
            check = true;
        }
        return check;
    };
}
export function isOpenViewInModal(additionalDetails) {
    return (additionalDetails.type === 'OPEN_VIEW' && additionalDetails.mode === 'MODAL' && additionalDetails.params.config.name);
}
/**
 *
 * @param {Object} promotedFiltersObject
 * @returns An array of conditions formed with the promoted filters
 *
 * example:
 * promotedFiltersObject = {a:2, b: 3};
 * return
 * [
    condition: {
      comp: 'EQ',
        lhs: {field: 'a'},
        rhs: {value: '2'}
      },
      condition: {
        comp: 'EQ',
        lhs: {field: 'b'},
        rhs: {value: '3'}
      }
    ]
*/
export function formatPromotedFiltersAsFilterConditions(promotedFiltersObject = {}) {
    return Object.entries(promotedFiltersObject).reduce((acc, [field, value]) => {
        if (value) {
            acc.push({
                condition: {
                    lhs: {
                        field
                    },
                    comparator: 'EQ',
                    rhs: {
                        value
                    }
                }
            });
        }
        return acc;
    }, []);
}
/**
 * @param {Object} state
 * @param {Object} meta
 * @returns Calculated indexes in multiple of pageSize(splitting the virtualizer indexes)
 * For pageSize: 25, startIndex: 0, endIndex: 40 => generate [0, 24], [25, 49]
 */
function calculateIndexes(state, meta) {
    const virtualizerIndexes = state.paginationOptions.rootVirtualiser;
    const pageSize = meta.pageSize;
    const fromPage = Math.floor(virtualizerIndexes.startIndex / pageSize);
    const toPage = Math.ceil((virtualizerIndexes.endIndex + 1) / pageSize); // adding +1 because if endIndex is 175 then toPage = 7 but the the last page ends at 174[... (125, 149), (150, 174)]
    const indexes = [];
    for (let i = fromPage; i < toPage; i += 1) {
        indexes.push({ startIndex: pageSize * i, endIndex: pageSize * (i + 1) - 1 });
    }
    return indexes;
}
/**
 * @param {Object} state
 * @param {Object} meta
 * @returns Copy of states with virtualizer indexes
 */
export function updatePaginationStatesForMultipleCalls(state, meta) {
    const indexes = calculateIndexes(state, meta);
    return indexes.map((index) => ({
        ...state,
        paginationOptions: {
            rootVirtualiser: {
                startIndex: index.startIndex,
                endIndex: index.endIndex
            }
        }
    }));
}
/**
 * @param {Object} state
 * @param {Object} meta
 * @param {Array} requests
 * @returns Resolves promise, compiles and slices the data
 */
export async function processRequests(state, meta, requests) {
    let data = [];
    let queryStats = [];
    let count;
    const virtualizerIndexes = state.paginationOptions.rootVirtualiser;
    await Promise.all(requests)
        .then((results) => results.forEach((result) => {
        if (result.status === 200 || Array.isArray(result.data)) {
            data = data.concat(result.data);
            queryStats = queryStats.concat(result.queryStats);
            if (result.count !== null && result.count !== undefined)
                count = result.count;
        }
        else {
            throw new Error('Failed: Error while fetching records');
        }
        return { data, queryStats, count };
    }))
        .catch((err) => {
        throw err;
    });
    if (meta.pageSize) {
        // For slicing data, startIndex needs to be calculated from the page fetched
        // eg: startIndex: 63, endIndex: 120, pageSize: 25, pages fetched - [50, 74], [75, 99], [100, 124]
        // Have to slice the data from arr of records [50, 124] -> [13, 70]
        const startIdx = virtualizerIndexes.startIndex % meta.pageSize; // 63 % 25 = 13
        const endIdx = virtualizerIndexes.endIndex - virtualizerIndexes.startIndex + startIdx; // (120 - 63) + 13
        data = data.slice(startIdx, endIdx + 1);
    }
    return { data, queryStats: queryStats[0], count };
}
export function getLeafValue(data, fieldName, fieldSeparator) {
    if (!data) {
        return null;
    }
    if (!fieldName.includes(fieldSeparator)) {
        return data[fieldName];
    }
    const [first, ...rest] = fieldName.split(fieldSeparator);
    return getLeafValue(data[first], rest.join(fieldSeparator));
}
// Builds a uniquely identifyable aggregation/calculation ID for sending to the server.
export const buildAggOrCalcId = (columnId, functionName) => {
    // Server does not support agg/calc ID's containing special chars, but Association ID's can contain - and _
    // AND the data_views API uses : to separate the assoc ID and the field ID
    // EmbeddedFields starts with !P! or !PL!, so ! should be removed as it is a special chars
    return `${columnId.replace(/[-_!:]/g, '')}${functionName}`;
};
//# sourceMappingURL=repeat-utils.js.map