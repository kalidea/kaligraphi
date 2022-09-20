import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {

  themes = [];

  type = 'text';

  placeholder = '';

  clearable = false;

  readonly = false;

  disabled = false;

  defaultValue = '0';

  icon = '';

  content = '';

  controlChange = new UntypedFormControl('', {updateOn: 'change'});

  controlBlur = new UntypedFormControl('', {updateOn: 'blur'});

  lastIconClicked;

  constructor() {
  }

  iconClicked($event): void {
    console.log($event);
    this.lastIconClicked = $event;
  }

  updateDisable($event): void {
    if (this.disabled) {
      this.controlChange.enable();
      this.controlBlur.enable();
    } else {
      this.controlChange.disable();
      this.controlBlur.disable();
    }
    this.disabled = $event;
  }
}
