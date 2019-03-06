import { InputFormater } from './input-formater';
import { formatNumber } from '@angular/common';

export class NumberFormat extends InputFormater {

  protected digitsInfo = '.0-4';

  protected style = 'decimal';

  /**
   * @inheritDoc
   */
  toCode(value: string): any {
    value = (value + '')
      .replace(/[^0-9\.\,]/g, '') // keep only numbers
      .replace(',', '.'); // replace comma by decimal point
    return value ? +value : '';
  }

  /**
   * @inheritDoc
   */
  toUser(value: any): string {
    value = (value + '')
      .replace(/[^0-9\.\,]/g, '') // keep only numbers
      .replace(',', '.'); // replace comma by decimal point

    return formatNumber(+value, this.locale, this.digitsInfo);
  }

}
