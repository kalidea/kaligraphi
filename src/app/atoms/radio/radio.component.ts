import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KalRadioChange } from '../../../../projects/kalidea/kaligraphi/src/lib/atoms/kal-radio/kal-radio-change';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit {

  /**
   * Value of radio button group
   */
  value = 'test';

  /**
   * The form control of the radio button group
   */
  control = new FormControl(this.value);

  /**
   * The name of radio button group by using control
   */
  nameRadioButtonWithControl = 'radioButtonWithControl';

  /**
   * The name of radio button group by using event
   */
  nameRadioButtonWithEvent = 'radioButtonWithEvent';

  /**
   * Is radio button group disabled
   */
  disabled = false;

  /**
   * Id of selected radio button
   */
  id: string;

  constructor() {
  }

  /**
   * Change radio button group value by using control
   */
  changeRadioValueWithControl(value: string) {
    this.control.patchValue(value);
  }

  /**
   * Change radio button group value by using input
   */
  changeRadioValueWithEvent(value: string) {
    this.value = value;
  }

  /**
   * Display the selected radio button id and its value
   */
  displayValue($event: KalRadioChange) {
    this.id = $event.source.id;
    this.value = $event.value;
  }

  /**
   * Disabled the radio button group that using control
   */
  disableGroupByControl() {
    if (!this.control.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  /**
   * Disabled the radio button group that using input
   */
  disableGroupByInput() {
    this.disabled = !this.disabled;
  }

  ngOnInit() {
  }

}
