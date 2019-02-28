import { InputFormater } from './input-formater';

export class NumberFormat extends InputFormater {

  protected maximumFractionDigits = 4;
  protected minimumFractionDigits = 0;
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

    const options = {
      style: this.style,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumFractionDigits: this.minimumFractionDigits
    };
    value = (+value).toLocaleString(undefined, options);
    return value;
  }

}
