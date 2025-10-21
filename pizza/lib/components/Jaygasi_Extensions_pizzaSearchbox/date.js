// @ts-nocheck
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import utc from 'dayjs/plugin/utc.js';
import tzone from 'dayjs/plugin/timezone.js';
import { formatDateTime, parseToDate } from '@pega/cosmos-react-core';
import formatConstants from './format-constants';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(tzone);
export const COSMOS_FORMAT_CONSTANTS = {
    SHORT: 'short',
    LONG: 'long'
};
export const COSMOS_VARIANT_CONSTANTS = {
    DATE_TIME: 'datetime',
    DATE: 'date',
    RELATIVE: 'relative',
    TIME: 'time'
};
export const DATE_TYPES = {
    DATE: 'date',
    DATE_TIME: 'datetime',
    TIME: 'time'
};
const constellationToCosmosFormatterMap = new Map([
    [
        DATE_TYPES.DATE,
        new Map([
            [
                formatConstants.DateTimeLong,
                { format: COSMOS_FORMAT_CONSTANTS.LONG, variant: COSMOS_VARIANT_CONSTANTS.DATE_TIME }
            ],
            [
                formatConstants.DateTimeShort,
                { format: COSMOS_FORMAT_CONSTANTS.SHORT, variant: COSMOS_VARIANT_CONSTANTS.DATE }
            ],
            [
                formatConstants.DateTimeSince,
                { format: COSMOS_FORMAT_CONSTANTS.SHORT, variant: COSMOS_VARIANT_CONSTANTS.RELATIVE }
            ],
            [formatConstants.DateDefault, { format: COSMOS_FORMAT_CONSTANTS.LONG, variant: COSMOS_VARIANT_CONSTANTS.DATE }]
        ])
    ],
    [
        DATE_TYPES.TIME,
        new Map([
            [formatConstants.TimeDefault, { format: COSMOS_FORMAT_CONSTANTS.SHORT, variant: COSMOS_VARIANT_CONSTANTS.TIME }],
            [formatConstants.TimeOnly, { format: COSMOS_FORMAT_CONSTANTS.LONG, variant: COSMOS_VARIANT_CONSTANTS.TIME }]
        ])
    ],
    [
        DATE_TYPES.DATE_TIME,
        new Map([
            [
                formatConstants.DateTimeDefault,
                { format: COSMOS_FORMAT_CONSTANTS.SHORT, variant: COSMOS_VARIANT_CONSTANTS.DATE_TIME }
            ],
            [
                formatConstants.DateTimeShort,
                { format: COSMOS_FORMAT_CONSTANTS.SHORT, variant: COSMOS_VARIANT_CONSTANTS.DATE }
            ],
            [
                formatConstants.DateTimeSince,
                { format: COSMOS_FORMAT_CONSTANTS.SHORT, variant: COSMOS_VARIANT_CONSTANTS.RELATIVE }
            ],
            [
                formatConstants.DateTimeLong,
                { format: COSMOS_FORMAT_CONSTANTS.LONG, variant: COSMOS_VARIANT_CONSTANTS.DATE_TIME }
            ],
            [formatConstants.TimeOnly, { format: COSMOS_FORMAT_CONSTANTS.SHORT, variant: COSMOS_VARIANT_CONSTANTS.TIME }]
        ])
    ]
]);
const types = ['fromNow', 'customFormat'];
// value should be in ISO 8601 format.
function DateFormatter(value, 
// eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
{ type = types[1], format = 'DD/MM/YYYY', timezone, fieldType } = {}) {
    if (!value)
        return value;
    switch (type) {
        case types[1]:
            if (timezone && !(fieldType === 'Date' || fieldType === 'Date only'))
                return dayjs(value).tz(timezone).format(format); // Date only value should be formatted without timezone
            return dayjs(value).format(format);
        case types[0]:
            return dayjs(value).from(dayjs());
        default:
            return value;
    }
}
// value should be in hh:mm:ss format (00:00:00 - 23:59:59).
// function TimeFormatter(value, options) {
//   if (!value) return value;
//   const { locale = 'en-US' } = options;
//   const timeOnlyRegex = /^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/;
//   if (value.length === 8 && timeOnlyRegex.test(value)) {
//     const { timeOptions = {} } = options;
//     const tempDate = new Date();
//     const hours = parseInt(value.substr(0, 2), 10);
//     const minutes = parseInt(value.substr(3, 2), 10);
//     const seconds = parseInt(value.substr(6, 2), 10);
//     tempDate.setHours(hours);
//     tempDate.setMinutes(minutes);
//     tempDate.setSeconds(seconds);
//     return tempDate.toLocaleTimeString(locale, timeOptions);
//   }
//   return DateFormatter(value, options);
// }
// function DateTimeShortFormatter(value, options) {
//   return DateFormatter(value, {
//     ...options,
//     type: 'customFormat',
//     format: 'MMM DD, YYYY'
//   });
// }
export function format(value, options) {
    if (!value)
        return null;
    const { type, locale, timezone, formatter, translate } = options;
    // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
    const { format, variant } = constellationToCosmosFormatterMap.get(type).get(formatter);
    return formatDateTime(parseToDate(value), {
        t: translate,
        locale,
        format,
        variant,
        timeZone: type === DATE_TYPES.DATE_TIME ? timezone : 'UTC'
    });
}
export default {
    'DateTime-Long': (value, options) => format(value, { ...options, formatter: 'DateTime-Long' }),
    'DateTime-Short': (value, options) => format(value, { ...options, formatter: 'DateTime-Short' }),
    'DateTime-Since': (value, options) => format(value, { ...options, formatter: 'DateTime-Since' }),
    'Time-Only': (value, options) => format(value, { ...options, formatter: 'Time-Only' }),
    convertToTimezone: (value, options) => {
        return value && options && options.timezone
            ? DateFormatter(value, {
                ...options,
                type: 'customFormat',
                format: 'YYYY-MM-DDTHH:mm:ss'
            })
            : value;
    },
    convertFromTimezone: (value, timezone) => value && timezone ? dayjs.tz(value, timezone).utc().format('YYYY-MM-DDTHH:mm:ss[Z]') : value,
    Date: (value, options) => DateFormatter(value, { type: 'customFormat', ...options }),
    'Date-Default': (value, options) => format(value, { ...options, formatter: 'Date-Default' }),
    'Date-Time-Default': (value, options) => format(value, { ...options, formatter: 'Date-Time-Default' }),
    'Time-Default': (value, options) => format(value, { ...options, formatter: 'Time-Default' })
};
