import { InputFormater } from './input-formater';

export class CurrencyFormat extends InputFormater {

  /**
   * @inheritDoc
   */
  toCode(value: string): number {
    value = (value + '')
      .replace(/[^0-9\.\,]/g, '') // keep only numbers
      .replace(',', '.'); // replace comma by decimal point
    return +value;
  }

  /**
   * @inheritDoc
   */
  toUser(value: any): string {
    let clearedValue = (value ? '' + value : '')
      .replace(',', '.') // replace comma by decimal point
      .replace(/\s/g, ''); // remove spaces

    if (clearedValue) {

      if (isNaN(+clearedValue)) {
        clearedValue = '0';
      }

      const formattedNumber = parseFloat(clearedValue)
        .toFixed(2) // format to number
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '); // use space as a separator

      // replace decimal point by a comma
      return ('' + formattedNumber).replace('.', ',');

    }

    return '';

  }

}
