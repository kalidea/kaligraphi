import { InputFormater } from './input-formater';
import { formatPhoneNumber } from '../../../utils/helpers/phone';

export class PhoneFormat extends InputFormater {

  /**
   * @inheritDoc
   */
  toCode(value: string): any {
    value = (value + '')
      .replace(/[^0-9\.\,\+]/g, ''); // keep only numbers
    return value;
  }

  /**
   * @inheritDoc
   */
  toUser(value: any): string {
    return formatPhoneNumber(value);
  }

}
