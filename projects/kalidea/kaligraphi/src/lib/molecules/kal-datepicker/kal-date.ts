import { isString } from 'util';
import { isEmpty, values } from 'lodash';
import { DateTime, Duration, DurationObject, Interval } from 'luxon';

export type KalDateType = string | DateTime | Date | KalDate;

/**
 * Helper
 */
export function coerceKalDateProperty(rawDate: KalDateType): KalDate {
  return KalDate.parseDate(rawDate);
}

export class KalDate {

  /**
   * local moment value for this object
   */
  private value: DateTime;

  constructor(date?: KalDateType, format?: string) {
    if (arguments.length === 0) {
      this.value = DateTime.local();
    } else {
      this.value = KalDate.getDate(date, format);
    }
  }

  /**
   * getter for validity of the current date
   */
  get valid() {
    return this.value && this.value.isValid;
  }

  /**
   * parse rawDate and return a KalDate Object
   */
  static parseDate(rawDate: KalDateType): KalDate {
    return new KalDate(rawDate);
  }

  /**
   * Returns a luxon `DateTime` object
   * @param format Date format to provide if date is a `string`
   */
  private static getDate(rawDate: KalDateType, format?: string): DateTime {

    if (rawDate instanceof Date) {
      return DateTime.fromJSDate(rawDate);
    } else if (isEmpty(rawDate)) {
      return DateTime.invalid('empty date');
    } else if (isString(rawDate)) {
      if (!format) {
        throw new Error('You should provide a date format');
      }

      return DateTime.fromFormat(rawDate as string, format);
    } else if (rawDate instanceof KalDate) {
      return rawDate.getDate();
    }

    // else this is a luxon date
    return rawDate as DateTime;
  }

  /**
   * return JS Date format
   */
  toDate() {
    return this.valid ? this.getDate().toJSDate() : null;
  }

  /**
   * get day of the month from the current date
   */
  getDay(): number {
    return this.value.day;
  }

  /**
   * add {amount} {unit} to this date
   */
  add(duration: Duration | number | DurationObject) {
    this.value = this.value.plus(duration);
    return this;
  }

  /**
   * get month ( zero based index )
   */
  getMonth(): number {
    return this.value.month;
  }

  getMonthAsString(): string {
    return this.value.monthLong;
  }

  /**
   * get year of the current date
   */
  getYear(): number {
    return this.value.year;
  }

  /**
   * return moment representation of this object
   */
  getDate(): DateTime {
    return this.value;
  }

  /**
   * return true if current date is same as provided dates
   */
  isSame(rawDate: KalDateType) {
    const date = KalDate.getDate(rawDate);
    return this.value.hasSame(date, 'days');
  }

  /**
   * return true if current date is before provided date
   */
  isBefore(rawDate: KalDateType) {
    const date: DateTime = KalDate.getDate(rawDate);
    return this.value < date;
  }

  /**
   * return true if current date is after provided date
   */
  isAfter(rawDate: KalDateType) {
    const date: DateTime = KalDate.getDate(rawDate);
    return this.value > date;
  }

  /**
   * return true if current date is today
   */
  isToday() {
    return this.value.hasSame(DateTime.local(), 'days');
  }

  /**
   * @see Moment.isBetween
   */
  isBetween(start: KalDateType,
            end: KalDateType,) {
    start = coerceKalDateProperty(start).getDate();
    end = coerceKalDateProperty(end).getDate();
    return Interval.fromDateTimes(start, end).contains(this.value);
  }

  /**
   * set current date for this object
   */
  setDate(date: KalDateType): KalDate {
    this.value = KalDate.getDate(date);
    return this;
  }

  /**
   */
  setYear(year: number): KalDate {
    this.value.set({year: year});
    return this;
  }

  /**
   * set current month
   */
  setMonth(month: number): KalDate {
    this.value.set({month: month});
    return this;
  }

  /**
   * convert this date to string
   */
  toString() {
    const date = this.getDate();

    if (date && date.isValid) {
      return date.toLocaleString(DateTime.DATE_SHORT);
    } else {
      return '';
    }
  }

}
