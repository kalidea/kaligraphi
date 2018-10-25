import { InputFormater } from './input-formater';

export class StringFormat extends InputFormater {

  /**
   * @inheritDoc
   */
  toCode(value: string): any {
    return value;
  }

  /**
   * @inheritDoc
   */
  toUser(value: any): string {
    return value;
  }

}
