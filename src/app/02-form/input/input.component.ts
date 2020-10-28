import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  disabled = false;

  defaultValue = '0';

  icon = '';

  content = '';

  controlChange = new FormControl('', {updateOn: 'change'});

  controlBlur = new FormControl('', {updateOn: 'blur'});

  lastIconClicked;

  constructor() {
  }

  iconClicked($event) {
    console.log($event);
    this.lastIconClicked = $event;
  }

  updateDisable($event) {
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
