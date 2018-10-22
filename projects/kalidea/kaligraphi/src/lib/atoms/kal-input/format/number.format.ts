import { InputFormater } from './input-formater';

export class NumberFormat extends InputFormater {

  /**
   * @inheritDoc
   */
  toCode(value: string): any {
    value = (value + '')
      .replace(/[^0-9\.\,]/g, '') // keep only numbers
      .replace(',', '.'); // replace comma by decimal point
    // return +value || 0;
    return value ? +value : '';
  }

  /**
   * @inheritDoc
   */
  toUser(value: any): string {
    value = (value + '')
      .replace(/[^0-9\.\,]/g, '') // keep only numbers
      .replace('.', ','); // replace comma by decimal point
    return value;
  }

}
