import { formatNumber } from '@angular/common';

import { InputFormater } from './input-formater';

export class NumberFormat extends InputFormater {

  protected digitsInfo = '.0-4';

  protected style = 'decimal';

  /**
   * @inheritDoc
   */
  toCode(value: string): any {
    if (this.isEmpty(value)) {
      return value;
    }
    value = (value + '')
      .replace(/[^0-9\.\,]/g, '') // keep only numbers
      .replace(',', '.'); // replace comma by decimal point
    return value ? +value : 0;
  }

  /**
   * @inheritDoc
   */
  toUser(value: any): string {
    if (this.isEmpty(value)) {
      return value;
    }
    value = (value + '')
      .replace(/[^0-9\.\,]/g, '') // keep only numbers
      .replace(',', '.'); // replace comma by decimal point

    return formatNumber(+value, this.locale, this.digitsInfo);
  }

}
