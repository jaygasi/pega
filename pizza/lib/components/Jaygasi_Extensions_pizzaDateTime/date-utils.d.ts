import dayjs from "dayjs";
/**
 * Return relative time in fromNow for the given datetime
 * @description Convert and return the given datetime in dayJSObject
 *
 * @param {string} text datetime
 * @returns {object} datetime as a dayjs object
 */
export declare const getDayJSObject: (text: string) => dayjs.Dayjs | Date;
/**
 * Return relative time in fromNow for the given datetime
 *
 * @param {string} time datetime
 * @returns {object} relative time from now
 */
export declare const getRelativeTime: (time: string) => string;
/**
 * Return year for the date passed
 *
 * @param {string} value from which Year needs to be taken out
 * @returns {number} year for the date passed
 */
export declare const getFullYear: (value: string) => number;
/**
 * Return maxDate for the date passed
 *
 * @param {number} nextYears next number of years
 * @param {number} currentYear current year
 * @param {number} yearFromValue year set on value in redux
 *
 * @returns {string} maxDate calculated based on inputs
 */
export declare const getMaxDate: (nextYears: number, currentYear: number, yearFromValue: number) => string;
/**
 * Return minDate for the date passed
 *
 * @param {number} previousYears previous number of years
 * @param {number} currentYear current year
 * @param {number} yearFromValue year set on value in redux
 *
 * @returns {string} minDate calculated based on inputs
 */
export declare const getMinDate: (previousYears: number, currentYear: number, yearFromValue: number) => string;
/**
 * Return clockFormat after parsing
 *
 * @param {number | string} clockFormat chosen by user
 *
 * @returns {number} clockFormat
 */
export declare const parseClockFormat: (clockFormat: number) => number;
/**
 * Return datetime value string off to seconds
 *
 * @param {string} datetime in ISO format
 * @param {boolean} withSeconds to specify if seconds is needed or not
 *
 * @returns {string} datetime after stripping of ms and seconds if selected to
 */
export declare const correctDateTimeToSeconds: (datetime: string, withSeconds: boolean) => string;
/**
 * Return time value string off to seconds
 *
 * @param {string} datetime in ISO format
 * @param {boolean} withSeconds to specify if seconds is needed or not
 *
 * @returns {string} just time after stripping of ms and seconds if selected to
 */
export declare const timeCorrectedToSeconds: (datetime: string, withSeconds: boolean) => string;
/**
 * This function handles the cosmos blur handler of DateTime components
 *
 * @param {string | undefined} errorState for the selected datetime value
 * @param {string} actualValue present in redux
 * @param {string} formattedValue retrieved by trimming ISO to just Date/Time, also applying timezone if DateTime
 * @param {object} actions object which has fire and blur callbacks
 * @param {string} propName name of the property bound
 * @param {object} pConn component's PConnect object which is useful to invoke validationApi
 *
 * @returns {void}
 */
export declare const datetimeFireChangeBlurEvents: (errorState: string | undefined, actualValue: string, formattedValue: string, actions: any, propName: string, pConn: any) => void;
/**
 * Return Date format for the locale passed
 *
 * @param {string} locale locale string
 * @param {object} options options for format string
 * @returns {string} dateformat for the locale
 * Example : getDateFormat("pl-PL") returns "DD.MM.YYYY"
 */
export declare const getDateFormat: (locale: string, options: any) => string;
/**
 * Return boolean for the locale passed to specify if locale uses 12 hour format
 *
 * @param {string} locale locale string
 * @returns {boolean} True or False for the locale
 * Example : getDateFormat("pl-PL") returns false
 */
export declare const is12HClockFormat: (locale: string) => boolean;
/**
 * Return Option object for Time formatting
 *
 * @param {boolean} withSeconds true or false depending on seconds to be included
 * @param {boolean} is12h 12 hour format
 * @returns {object} options object time formatting
 * Example : getTimeOptions(false, true) returns {hour: 'numeric',minute: 'numeric',hour12: true}
 */
export declare const getTimeOptions: (withSeconds: boolean, is12h?: boolean) => {
    hour12: boolean;
    second?: string | undefined;
    hour: string;
    minute: string;
};
/**
 * Return Option object for Datetime formatting
 *
 * @param {boolean} withSeconds true or false depending on seconds to be included
 * @param {boolean} is12h 12 hour format
 * @returns {object} options object datetime formatting
 * Example : getDateTimeOptions(false, true) returns {year: 'numeric',month: 'numeric',day: 'numeric',hour: 'numeric',minute: 'numeric',hour12: true}
 */
export declare const getDateTimeOptions: (withSeconds: boolean, is12h?: boolean) => {
    hour12: boolean;
    second?: string | undefined;
    hour: string;
    minute: string;
    year: string;
    month: string;
    day: string;
};
//# sourceMappingURL=date-utils.d.ts.map