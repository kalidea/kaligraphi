import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {


  themes = [];

  selection;

  hasCheckbox = false;

  isMultiple = false;

  options: { value: number, disabled: boolean }[] = [];

  toggleOptionStateControl = new FormControl();

  constructor() {
  }

  buildOptions(count = 5) {
    this.options = [];
    for (let i = 0; i < count; i++) {
      this.options.push({disabled: false, value: i});
    }
  }

  toggleOptionByValue(value) {
    this.toggleOptionStateControl.patchValue(null);
    try {
      value = parseInt(value, 10);
      const option = this.options.find(o => o.value === value);
      if (option) {
        option.disabled = !option.disabled;
      }
    } catch (error) {
      console.log('can\'t parse int for', value, error);
    }
  }

  ngOnInit() {
    this.buildOptions();
  }
}
