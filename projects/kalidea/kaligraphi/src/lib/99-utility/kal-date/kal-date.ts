import { coerceArray } from '@angular/cdk/coercion';
import { InjectionToken } from '@angular/core';
import { DateTime, Info, Interval, StringUnitLength, ToRelativeUnit, UnitLength } from 'luxon';
import { KalDateModule } from '../../99-utility/kal-date/kal-date.module';

/**
 * InjectionToken that can be used to specify the global date options.
 * example :
 * <pre>
 *     providers: [{
 *           provide: KAL_DATE_GLOBAL_OPTIONS,
 *           useValue: {
 *               parseFormats: ['dd/MM/yyyy', 'ddMMyyyy', 'yy-MM-dd'],
 *               displayFormat: 'dd/MM/yyyy'
 *           } as KalDateOptions
 *       }],
 * </pre>
 */

export interface KalDateOptions {
  parseFormats?: KalDateFormat;
  displayFormat?: string;
}

export const KAL_DATE_GLOBAL_OPTIONS =
  new InjectionToken<KalDateOptions>('KAL_DATE_GLOBAL_OPTIONS');

// factorize types of Object used internally
type D = DateTime;
// we should not use unit name without final 's'
// because it's not handle correctly in luxon in diff method for exemple.
export type KalDurationUnit = ToRelativeUnit;
/**
 * global type
 */
export type KalDateType = string | DateTime | Date | KalDate;

export type KalDateFormat = string | string[];

/**
 * Helper
 */
export function coerceKalDateProperty(rawDate: KalDateType, format?: KalDateFormat): KalDate {
  return KalDate.parseDate(rawDate, format);
}

export const kalDefaultDateFormat = 'dd/MM/yyyy';

export class KalDate {

  /**
   * Current "Type D" object.
   */
  private value: D;

  constructor(date?: KalDateType, format?: KalDateFormat) {
    if (arguments.length === 0 || date === null) {
      this.value = DateTime.local();
    } else {
      format = [
        ...coerceArray(format),
        ...coerceArray(KalDate.getOption('parseFormats', kalDefaultDateFormat))
      ].filter(f => !!f);
      this.value = KalDate.getDate(date, format);
    }
  }

  private static getOption<U extends keyof KalDateOptions, R>(key: U, fallback?: KalDateOptions[U]): KalDateOptions[U] {
    return KalDateModule.kalDateOptions?.[key] || fallback;
  }

  /**
   * Whether the KalDate is valid.
   */
  get valid(): boolean {
    return this.value?.isValid;
  }

  /**
   * Parse a raw date and returns a KalDate object.
   */
  static parseDate(rawDate: KalDateType, format?: KalDateFormat): KalDate {
    return new KalDate(rawDate, format);
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

  static now(): KalDate {
    return new KalDate();
  }

  static months(format: UnitLength = 'long'): string[] {
    return Info.months(format);
  }

  static days(format: StringUnitLength = 'long'): string[] {
    return Info.weekdays(format);
  }

  /**
   * Returns a "type D" object
   * @param rawDate Date as string
   * @param format Date format to provide if date is a `string`
   */
  private static getDate(rawDate: KalDateType, format: KalDateFormat = kalDefaultDateFormat): D {
    let date: DateTime;

    if (rawDate instanceof Date) {
      date = DateTime.fromJSDate(rawDate);
    } else if (rawDate + '' === rawDate) {
      if (!format) {
        date = DateTime.fromISO(rawDate);
      } else {
        date = this.parseRawDate(rawDate, format);
      }
    } else if (rawDate instanceof KalDate) {
      date = (rawDate as KalDate).getDate();
    } else if (rawDate instanceof DateTime) {
      // else this is a "type D" date
      date = rawDate;
    } else {
      date = DateTime.invalid(`'${rawDate}' is not a valid date`);
    }

    return date;
  }

  private static parseRawDate(rawDate: string, formatsList: KalDateFormat): D {

    if (rawDate.endsWith('Z')) {
      rawDate = rawDate.slice(0, -1) + '+00:00';
    }

    if (typeof formatsList === 'string' ) {
      formatsList = coerceArray(formatsList);
    }

    const matchingFormat = formatsList.find( f => DateTime.fromFormat(rawDate, f).isValid);

    return matchingFormat ? DateTime.fromFormat(rawDate, matchingFormat) : DateTime.invalid('unmatched format');

  }

  /**
   * Return JS Date format
   */
  toDate(): Date | null {
    return this.valid ? this.getDate().toJSDate() : null;
  }

  /**
   * Returns a string that contains the date formatted with the given format.
   */
  toFormat(format = KalDate.getOption('displayFormat', kalDefaultDateFormat)): string {
    const date = this.getDate();
    if (date && this.valid) {
      return date.toFormat(format);
    } else {
      return '';
    }
  }

  /**
   * Get day.
   */
  getDay(): number {
    return this.value.day;
  }

  /**
   * Get month.
   */
  getMonth(): number {
    return this.value.month;
  }

  /**
   * Get year.
   */
  getYear(): number {
    return this.value.year;
  }

  /**
   * add {amount} {unit} to this date
   */
  add(amount: number, unit: KalDurationUnit = 'days'): KalDate {
    return new KalDate(this.value.plus({[unit]: amount}));
  }

  /**
   * substract {amount} {unit} to this date
   */
  substract(amount: number, unit: KalDurationUnit = 'days'): KalDate {
    return new KalDate(this.value.minus({[unit]: amount}));
  }

  /**
   * calcul start of specified unit ( like startOf('week') for example )
   */
  startOf(unit: KalDurationUnit): KalDate {
    return new KalDate(this.getDate().startOf(unit));
  }

  /**
   * calcul start of specified unit ( like startOf('week') for example )
   */
  endOf(unit: KalDurationUnit): KalDate {
    return new KalDate(this.getDate().endOf(unit));
  }

  /**
   * Returns DayJS representation of KalDate.
   */
  getDate(): D {
    return this.value;
  }

  /**
   * Returns a boolean indicating whether the current date is the same as the supplied date.
   */
  isSame(date: KalDateType, unit: KalDurationUnit = 'days'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.value.hasSame(comparisonDate, unit);
  }

  /**
   * Returns a boolean indicating whether the current date is before the supplied date.
   */
  isBefore(date: KalDateType, unit: KalDurationUnit = 'days'): boolean {
    // TODO: create decorator to manage this redundant code
    const comparisonDate = KalDate.getDate(date);
    // we can have floating value like 0.5
    // that's why we compare with more than 1
    return this.diff(comparisonDate, unit) < 0;
  }

  /**
   * Returns a boolean indicating whether the current date is before the supplied date.
   */
  isSameOrBefore(date: KalDateType, unit: KalDurationUnit = 'days'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.isSame(comparisonDate, unit) || this.isBefore(comparisonDate, unit);
  }

  /**
   * Returns a boolean indicating whether the current date is after the supplied date.
   */
  isAfter(date: KalDateType, unit: KalDurationUnit = 'days'): boolean {
    const comparisonDate = KalDate.getDate(date);
    // we can have floating value like 0.5
    // that's why we compare with more than 1
    return this.diff(comparisonDate, unit) > 0;
  }

  /**
   * Returns a boolean indicating whether the current date is after the supplied date.
   */
  isSameOrAfter(date: KalDateType, unit: KalDurationUnit = 'days'): boolean {
    const comparisonDate = KalDate.getDate(date);
    return this.isSame(comparisonDate, unit) || this.isAfter(comparisonDate, unit);
  }

  /**
   * return true if current date is today
   */
  isToday(): boolean {
    return this.isSame(DateTime.local());
  }

  /**
   * Whether the current date is between the `start` and `end` dates.
   */
  isBetween(start: KalDateType,
            end: KalDateType): boolean {
    const startDate = coerceKalDateProperty(start).getDate();
    const endDate = coerceKalDateProperty(end).getDate();

    const interval: Interval = Interval.fromDateTimes(startDate, endDate);

    return interval.contains(this.getDate());
  }

  /**
   * set current date for this object
   */
  set(unit: KalDurationUnit, value: number): KalDate {
    this.value = this.value.set({[unit]: value});
    return this;
  }

  /**
   * convert this date to string
   */
  toString(): string {
    return this.toFormat();
  }

  toJSON(): string {
    return this.getDate().toJSON();
  }

  diff(compare: D, unit: KalDurationUnit = 'days') {
    return this.value.diff(compare, [unit])[unit];
  }

}
