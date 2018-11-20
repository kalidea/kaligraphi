import { isString } from 'util';
import { isEmpty, values } from 'lodash';
import { DateObjectUnits, DateTime, Duration, DurationObject, Interval } from 'luxon';

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

  constructor(date?: KalDateType, format = 'dd/MM/yyyy') {
    if (arguments.length === 0 || date === null) {
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
  private static getDate(rawDate: KalDateType, format = 'dd/MM/yyyy'): DateTime {
    let date: DateTime;

    if (rawDate instanceof Date) {
      date = DateTime.fromJSDate(rawDate);
    } else if (isEmpty(rawDate)) {
      date = DateTime.invalid('empty date');
    } else if (isString(rawDate)) {
      if (!format) {
        throw new Error('You should provide a date format');
      }

      date = DateTime.fromFormat(rawDate as string, format);
    } else if (rawDate.constructor.name === 'KalDate') {
      date = (rawDate as KalDate).getDate();
    } else {
      // else this is a luxon date
      date = rawDate as DateTime;
    }

    return date;
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

  getMonth(): number {
    return this.value.month;
  }

  /**
   * get year of the current date
   */
  getYear(): number {
    return this.value.year;
  }

  /**
   * add {amount} {unit} to this date
   */
  add(duration: Duration | number | DurationObject) {
    this.value = this.value.plus(duration);
    return this;
  }

  getMonthAsString(): string {
    return this.value.monthLong;
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
            end: KalDateType) {
    start = coerceKalDateProperty(start).getDate();
    end = coerceKalDateProperty(end).getDate();
    return Interval.fromDateTimes(start, end).contains(this.value);
  }

  /**
   * set current date for this object
   */
  set(dateUnit: DateObjectUnits): KalDate {
    this.value = this.value.set(dateUnit);
    return this;
  }

  /**
   * convert this date to string
   */
  toString() {
    const date = this.getDate();

    if (date && date.isValid) {
      return date.toFormat('dd/MM/yyyy');
    } else {
      return '';
    }
  }

}
