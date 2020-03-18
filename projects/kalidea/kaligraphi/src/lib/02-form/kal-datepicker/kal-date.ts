import dayjs, { Dayjs, OpUnitType, UnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import { formatDate } from './kal-date-converter';

export type KalDateType = string | Dayjs | Date | KalDate;

/**
 * Configure DayJS
 */
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

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

      const dayJsParseFormat = formatDate(format);

      // if date is not valid, return invalid date (e.g : 31st February)
      if (dayjs(rawDate, dayJsParseFormat).format(dayJsParseFormat) !== rawDate) {
        date = dayjs(new Date(NaN));
      } else {
        date = dayjs(rawDate, dayJsParseFormat);
      }
    } else if (rawDate instanceof KalDate) {
      date = (rawDate as KalDate).getDate();
    } else {
      // else this is a DayJS date
      date = rawDate as Dayjs;
    }

    return date;
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
   * Returns a boolean indicating whether the current date is after the supplied date.
   */
  isAfter(date: KalDateType, unit: OpUnitType = 'day'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.value.isAfter(comparisonDate, unit);
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
