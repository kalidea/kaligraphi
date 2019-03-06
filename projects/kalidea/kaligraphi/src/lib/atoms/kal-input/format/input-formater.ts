/**
 * parent class of input formatter
 */

export abstract class InputFormater {
  constructor(protected locale: string) {}

  /**
   * called when need convert user input to code
   */
  abstract toCode(input: string): any;

  /**
   * called when need convert code to user format
   */
  abstract toUser(value: any): string;
}
