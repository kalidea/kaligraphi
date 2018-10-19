import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {

  /**
   * control that contains the checkbox value
   */
  control = new FormControl(false);

  constructor() { }

  /**
   * Return checkbox value
   */
  get value(): boolean {
    return this.control.value;
  }

  ngOnInit() {
  }

}
