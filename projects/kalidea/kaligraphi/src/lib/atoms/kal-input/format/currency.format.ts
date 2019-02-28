import { NumberFormat } from './number.format';

export class CurrencyFormat extends NumberFormat {

  protected maximumFractionDigits = 2;
  protected minimumFractionDigits = 2;

}
