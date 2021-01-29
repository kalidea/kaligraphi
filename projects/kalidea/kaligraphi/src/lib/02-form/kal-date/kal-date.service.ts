import { coerceArray } from '@angular/cdk/coercion';
import { Inject, Injectable, Optional } from '@angular/core';
import {
  coerceKalDateProperty,
  KAL_DATE_GLOBAL_OPTIONS,
  KalDate,
  KalDateFormat,
  KalDateType
} from 'src/kaligraphi/lib/02-form/kal-date/kal-date';
import { KalDateOptions } from 'src/kaligraphi/lib/02-form/kal-datepicker/kal-datepicker.component';

@Injectable({
  providedIn: 'root'
})
export class KalDateService {

  constructor(@Optional() @Inject(KAL_DATE_GLOBAL_OPTIONS) private kalDateOptions: KalDateOptions) {
  }

  coerce(date: KalDateType, customFormats?: KalDateFormat): KalDate {
    const format = [...coerceArray(customFormats), ...coerceArray(this.kalDateOptions?.parseFormats)].filter(f => !!f);
    return coerceKalDateProperty(date, format);
  }

  /**
   * @deprecated use coerce instead
   */
  parse(rawDate: string, customFormats?: KalDateFormat): KalDate {
    return this.coerce(rawDate, customFormats);
  }

  format(date: KalDate, format = this.kalDateOptions?.displayFormat): string {
    return date.toFormat(format);
  }
}
