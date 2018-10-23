import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KalRadioChange } from '../../../../projects/kalidea/kaligraphi/src/lib/atoms/kal-radio/kal-radio.component';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit {

  value = 'test';

  control = new FormControl(this.value);

  nameRadioButtonWithControl = 'radioButtonWithControl';

  nameRadioButtonWithEvent = 'radioButtonWithEvent';

  disabled = false;

  id: string;

  constructor() { }

  changeRadioValueWithControl(value: string) {
    this.control.patchValue(value);
  }

  changeRadioValueWithEvent(value: string) {
    this.value = value;
  }

  displayValue($event: KalRadioChange) {
    this.id = $event.source.id;
    this.value = $event.value;
  }

  disableGroupByControl() {
    this.control.disable();
  }

  disableGroupByInput() {
    this.disabled = !this.disabled;
  }

  ngOnInit() {
  }

}
