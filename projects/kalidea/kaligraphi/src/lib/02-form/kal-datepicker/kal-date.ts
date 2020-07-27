import dayjs, { Dayjs, OpUnitType, UnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { formatDate } from './kal-date-converter';

export type KalDateType = string | Dayjs | Date | KalDate;

/**
 * Configure DayJS
 */
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

/**
 * Helper
 */
export function coerceKalDateProperty(rawDate: KalDateType): KalDate {
  return KalDate.parseDate(rawDate);
}

export class KalDate {

  /**
   * Current DayJS class object.
   */
  private value: Dayjs;

  constructor(date?: KalDateType, format = 'dd/MM/yyyy') {
    if (arguments.length === 0 || date === null) {
      this.value = dayjs();
    } else {
      this.value = KalDate.getDate(date, format);
    }
  }

  /**
   * Whether the KalDate is valid.
   */
  get valid(): boolean {
    return this.value && this.value.isValid();
  }

  /**
   * Parse a raw date and returns a KalDate object.
   */
  static parseDate(rawDate: KalDateType): KalDate {
    return new KalDate(rawDate);
  }

  /**
   * get current GMT offset as string
   * E.G.: +02:00
   */
  static getLocalGMTOffset(): string {
    const timeZoneOffset = (new Date().getTimezoneOffset() / -60);
    const sign = Math.sign(timeZoneOffset) < 0 ? '-' : '+';
    const value = Math.abs(timeZoneOffset) + '';
    return sign + (value.length < 2 ? '0' + value : value) + ':00';
  }

  /**
   * Returns a DayJS object
   * @param format Date format to provide if date is a `string`
   */
  private static getDate(rawDate: KalDateType, format = 'dd/MM/yyyy'): Dayjs {
    let date: Dayjs;

    if (rawDate instanceof Date) {
      date = dayjs(rawDate);
    } else if (rawDate + '' === rawDate) {
      if (!format) {
        throw new Error('You should provide a date format');
      }


      date = this.parseRawDate(rawDate, format);
    } else if (rawDate instanceof KalDate) {
      date = (rawDate as KalDate).getDate();
    } else {
      // else this is a DayJS date
      date = rawDate as Dayjs;
    }

    return date;
  }

  private static parseRawDate(rawDate: string, format: string): Dayjs {
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

    // @ts-ignore
    if (dayjs(rawDateWithoutTimeZone, dayJsParseFormatWithoutTimeZone).format(dayJsParseFormatWithoutTimeZone) !== rawDateWithoutTimeZone) {
      return dayjs(new Date(NaN));
    } else {
      return dayjs(rawDateWithoutTimeZone + timeZone, dayJsParseFormat);
    }
  }

  /**
   * Return JS Date format
   */
  toDate(): Date | null {
    return this.valid ? this.getDate().toDate() : null;
  }

  /**
   * Returns a string that contains the date formatted with the given format.
   */
  toFormat(format = 'dd/MM/yyyy'): string {
    const date = this.getDate();

    if (date && date.isValid()) {
      return date.format(formatDate(format));
    } else {
      return '';
    }
  }

  /**
   * Get day.
   */
  getDay(): number {
    return this.value.date();
  }

  /**
   * Get month.
   */
  getMonth(): number {
    return this.value.month();
  }

  /**
   * Get year.
   */
  getYear(): number {
    return this.value.year();
  }

  /**
   * add {amount} {unit} to this date
   */
  add(amount: number, unit: OpUnitType): KalDate {
    this.value = this.value.add(amount, unit);
    return this;
  }

  /**
   * Returns DayJS representation of KalDate.
   */
  getDate(): Dayjs {
    return this.value;
  }

  /**
   * Returns a boolean indicating whether the current date is the same as the supplied date.
   */
  isSame(date: KalDateType, unit: OpUnitType = 'day'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.value.isSame(comparisonDate, unit);
  }

  /**
   * Returns a boolean indicating whether the current date is before the supplied date.
   */
  isBefore(date: KalDateType, unit: OpUnitType = 'day'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.value.isBefore(comparisonDate, unit);
  }

  /**
   * Returns a boolean indicating whether the current date is before the supplied date.
   */
  isSameOrBefore(date: KalDateType, unit: OpUnitType = 'day'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.value.isSameOrBefore(comparisonDate, unit);
  }

  /**
   * Returns a boolean indicating whether the current date is after the supplied date.
   */
  isAfter(date: KalDateType, unit: OpUnitType = 'day'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.value.isAfter(comparisonDate, unit);
  }

  /**
   * Returns a boolean indicating whether the current date is after the supplied date.
   */
  isSameOrAfter(date: KalDateType, unit: OpUnitType = 'day'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.value.isSameOrAfter(comparisonDate, unit);
  }

  /**
   * return true if current date is today
   */
  isToday(): boolean {
    return this.isSame(dayjs());
  }

  /**
   * Whether the current date is between the `start` and `end` dates.
   * @see https://github.com/iamkun/dayjs/blob/dev/docs/en/Plugin.md#isbetween
   */
  isBetween(start: KalDateType,
            end: KalDateType,
            exclusions = {start: false, end: false}): boolean {
    const startDate = coerceKalDateProperty(start).getDate();
    const endDate = coerceKalDateProperty(end).getDate();

    const exclusionsString = (exclusions.start ? '(' : '[') + (exclusions.end ? ')' : ']');

    return this.value.isBetween(startDate, endDate, null, exclusionsString);
  }

  /**
   * set current date for this object
   */
  set(unit: UnitType, value: number): KalDate {
    this.value = this.value.set(unit, value);
    return this;
  }

  /**
   * convert this date to string
   */
  toString(): string {
    return this.toFormat();
  }

  toJSON(): string {
    return this.toString();
  }

}
