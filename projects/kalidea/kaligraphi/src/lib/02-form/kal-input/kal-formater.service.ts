import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { InputFormater } from './format/input-formater';
import { NumberFormat } from './format/number.format';
import { CurrencyFormat } from './format/currency.format';
import { PhoneFormat } from './format/phone.format';
import { StringFormat } from './format/string.format';

@Injectable({
  providedIn: 'root'
})
export class KalFormaterService {

  /**
   * list of formaters
   */
  private formatersList: { [key: string]: InputFormater } = {};

  constructor(@Inject(LOCALE_ID) locale: string) {
    this.formatersList = {
      number: new NumberFormat(locale),
      currency: new CurrencyFormat(locale),
      phone: new PhoneFormat(locale),
      text: new StringFormat(locale),
      password: new StringFormat(locale)
    };
  }

  get(formaterKey: string = 'text') {
    return this.formatersList[formaterKey] || this.formatersList['text'];
  }
}
