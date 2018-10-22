import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  id: string;

  constructor() { }

  changeRadioValueWithControl(value: string) {
    this.control.patchValue(value);
  }

  changeRadioValueWithEvent(value: string) {
    this.value = value;
  }

  displayValue($event) {
    this.id = $event.source.id;
    this.value = $event.value;
  }

  ngOnInit() {
  }

}
