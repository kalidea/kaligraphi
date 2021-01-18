import { formatDate } from './kal-date-converter';
import { DateTime, Interval } from 'luxon';
/**
 * Helper
 */
export function coerceKalDateProperty(rawDate) {
    return KalDate.parseDate(rawDate);
}
export class KalDate {
    constructor(date, format = 'dd/MM/yyyy') {
        if (arguments.length === 0 || date === null) {
            this.value = DateTime.local();
        }
        else {
            this.value = KalDate.getDate(date, format);
        }
    }
    /**
     * Whether the KalDate is valid.
     */
    get valid() {
        return this.value && this.value.isValid;
    }
    /**
     * Parse a raw date and returns a KalDate object.
     */
    static parseDate(rawDate) {
        return new KalDate(rawDate);
    }
    /**
     * get current GMT offset as string
     * E.G.: +02:00
     */
    static getLocalGMTOffset() {
        const timeZoneOffset = (new Date().getTimezoneOffset() / -60);
        const sign = Math.sign(timeZoneOffset) < 0 ? '-' : '+';
        const value = Math.abs(timeZoneOffset) + '';
        return sign + (value.length < 2 ? '0' + value : value) + ':00';
    }
    /**
     * Returns a "type D" object
     * @param rawDate Date as string
     * @param format Date format to provide if date is a `string`
     */
    static getDate(rawDate, format = 'dd/MM/yyyy') {
        let date;
        if (rawDate instanceof Date) {
            date = DateTime.fromJSDate(rawDate);
        }
        else if (rawDate + '' === rawDate) {
            if (!format) {
                throw new Error('You should provide a date format');
            }
            date = this.parseRawDate(rawDate, format);
        }
        else if (rawDate instanceof KalDate) {
            date = rawDate.getDate();
        }
        else {
            // else this is a "type D" date
            date = rawDate;
        }
        return date;
    }
    static parseRawDate(rawDate, format) {
        const dayJsParseFormat = formatDate(format);
        // we should replace 'Z' timezone flag by +00:00
        if (rawDate.endsWith('Z')) {
            rawDate = rawDate.slice(0, -1) + '+00:00';
        }
        // remove timezone for comparaison
        const timeZoneRegexp = '(Z|(\\+|-)([0-9]{4}|([0-9]{2}:[0-9]{2})))$';
        const timeZoneOffset = KalDate.getLocalGMTOffset();
        const timeZoneMatch = rawDate.match(new RegExp(timeZoneRegexp));
        // timeZone is current timezone if not provided
        let timeZone = timeZoneMatch && timeZoneMatch.length > 0 ? timeZoneMatch[1] : timeZoneOffset;
        if (timeZone === '-00:00') {
            timeZone = '+00:00';
        }
        const rawDateWithoutTimeZone = rawDate.replace(new RegExp('^(.*)' + timeZoneRegexp), '$1');
        const dayJsParseFormatWithoutTimeZone = dayJsParseFormat.replace('Z', '');
        const formattedDateWithoutTimeZone = DateTime.fromFormat(rawDateWithoutTimeZone, dayJsParseFormatWithoutTimeZone)
            .toFormat(dayJsParseFormatWithoutTimeZone);
        if (formattedDateWithoutTimeZone !== rawDateWithoutTimeZone) {
            return DateTime.fromJSDate(new Date(NaN));
        }
        else {
            return DateTime.fromFormat(rawDateWithoutTimeZone + timeZone, dayJsParseFormat);
        }
    }
    /**
     * Return JS Date format
     */
    toDate() {
        return this.valid ? this.getDate().toJSDate() : null;
    }
    /**
     * Returns a string that contains the date formatted with the given format.
     */
    toFormat(format = 'dd/MM/yyyy') {
        const date = this.getDate();
        if (date && date.isValid) {
            return date.toFormat(format);
        }
        else {
            return '';
        }
    }
    /**
     * Get day.
     */
    getDay() {
        return this.value.day;
    }
    /**
     * Get month.
     */
    getMonth() {
        return this.value.month;
    }
    /**
     * Get year.
     */
    getYear() {
        return this.value.year;
    }
    /**
     * add {amount} {unit} to this date
     */
    add(amount, unit = 'days') {
        this.value = this.value.plus({ [unit]: amount });
        return this;
    }
    /**
     * substract {amount} {unit} to this date
     */
    substract(amount, unit = 'days') {
        this.value = this.value.minus({ [unit]: amount });
        return this;
    }
    /**
     * Returns DayJS representation of KalDate.
     */
    getDate() {
        return this.value;
    }
    /**
     * Returns a boolean indicating whether the current date is the same as the supplied date.
     */
    isSame(date, unit = 'days') {
        const comparisonDate = KalDate.getDate(date);
        return this.value.hasSame(comparisonDate, unit);
    }
    diff(compare, unit = 'days') {
        return this.value.diff(compare, [unit])[unit];
    }
    /**
     * Returns a boolean indicating whether the current date is before the supplied date.
     */
    isBefore(date, unit = 'days') {
        // TODO: create decorator to manage this redundent code
        const comparisonDate = KalDate.getDate(date);
        // we can have floating value like 0.5
        // that's why we compare with more than 1
        return this.diff(comparisonDate, unit) <= 1;
    }
    /**
     * Returns a boolean indicating whether the current date is before the supplied date.
     */
    isSameOrBefore(date, unit = 'days') {
        const comparisonDate = KalDate.getDate(date);
        return this.isSame(comparisonDate, unit) || this.isBefore(comparisonDate, unit);
    }
    /**
     * Returns a boolean indicating whether the current date is after the supplied date.
     */
    isAfter(date, unit = 'days') {
        const comparisonDate = KalDate.getDate(date);
        // we can have floating value like 0.5
        // that's why we compare with more than 1
        return this.diff(comparisonDate, unit) >= 1;
    }
    /**
     * Returns a boolean indicating whether the current date is after the supplied date.
     */
    isSameOrAfter(date, unit = 'days') {
        const comparisonDate = KalDate.getDate(date);
        return this.isSame(comparisonDate, unit) || this.isAfter(comparisonDate, unit);
    }
    /**
     * return true if current date is today
     */
    isToday() {
        return this.isSame(this.now());
    }
    now() {
        return DateTime.local();
    }
    /**
     * Whether the current date is between the `start` and `end` dates.
     */
    isBetween(start, end) {
        const startDate = coerceKalDateProperty(start).getDate();
        const endDate = coerceKalDateProperty(end).getDate();
        const interval = Interval.fromDateTimes(startDate, endDate);
        return interval.contains(this.getDate());
    }
    /**
     * set current date for this object
     */
    set(unit, value) {
        this.value = this.value.set({ [unit]: value });
        return this;
    }
    /**
     * convert this date to string
     */
    toString() {
        return this.toFormat();
    }
    toJSON() {
        return this.getDate().toJSON();
    }
}
