import { NumberFormat } from './number.format';
import round from 'lodash-es/round';

export class CurrencyFormat extends NumberFormat {

  protected decimals = 2;
  protected digitsInfo = `.${this.decimals}-${this.decimals}`;

  toCode(value: string): any {
    // format as number
    value = super.toCode(value);

    // round
    value = round(value, this.decimals);

    return value;
  }
}
