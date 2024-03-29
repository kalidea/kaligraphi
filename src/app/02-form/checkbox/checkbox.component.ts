import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {

  themes = [];

  large = false;

  label = 'checkbox';

  /**
   * control that contains the checkbox value
   */
  control = new UntypedFormControl(true);

  /**
   * The disabled state of the checkbox
   */
  disabled = false;

  /**
   * Value retrieved by checkbox output
   */
  value = false;

  constructor() {
  }

  get reverse(): boolean {
    return this.themes.some(t => t === 'reverse');
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
  setValue(value): void {
    this.value = value;
  }

  /**
   * Toggle the disabled state of the checkbox by using control
   */
  toggleDisableStateByControl(): void {
    if (this.control.disabled) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }

  /**
   * Toggle disabled state of the checkbox with input
   */
  toggleDisableStateByInput(): void {
    this.disabled = !this.disabled;
  }

  ngOnInit(): void {
  }

}
