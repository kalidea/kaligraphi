import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  control = new FormControl(true);

  /**
   * The disabled state of the checkbox
   */
  disabled = false;

  /**
   * Value retrieved by checkbox output
   */
  private value = true;

  constructor() {
  }

  /**
   * Return checkbox value by using control
   */
  get valueByControl(): boolean {
    return this.control.value;
  }

  /**
   * Return checkbox value by using output
   */
  get valueByOutput(): boolean {
    return this.value;
  }

  /**
   * Set the checkbox value
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Toggle the disabled state of the checkbox by using control
   */
  toggleDisableStateByControl() {
    if (this.control.disabled) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }

  toggleDisableStateByInput() {
    this.disabled = !this.disabled;
  }

  ngOnInit() {
  }

}
