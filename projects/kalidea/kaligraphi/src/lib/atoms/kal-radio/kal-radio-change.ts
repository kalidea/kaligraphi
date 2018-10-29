import { KalRadioComponent } from './kal-radio/kal-radio.component';

/**
 * The object that sent when a radio button is clicked
 */
export class KalRadioChange {
  constructor(public source: KalRadioComponent, public value: string) {
  }
}
