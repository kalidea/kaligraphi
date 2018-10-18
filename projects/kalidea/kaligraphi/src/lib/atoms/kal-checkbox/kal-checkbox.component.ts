import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { buildProviders, FormElementComponent } from '../../utils/index';

@Component({
  selector: 'kal-checkbox',
  templateUrl: './kal-checkbox.component.html',
  styleUrls: ['./kal-checkbox.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalCheckboxComponent)
})
export class KalCheckboxComponent extends FormElementComponent<boolean> implements OnInit {

  /**
   * The form control that contains the checkbox value
   */
  control: FormControl;

  /**
   * Triggered when the checkbox value has changed
   */
  @Output() toggled = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  writeValue(value) {
    this.control.patchValue(value, {emitEvent: false});
  }

  ngOnInit() {
    this.control = new FormControl(
      {
        value: this.value ? coerceBooleanProperty(this.value) : false,
        disabled: this.disabled
      }
    );

    this.control.valueChanges.subscribe(checked => {

      // notify parent when the form control value changes
      super.notifyUpdate(checked);

      // emit the form control value
      this.toggled.emit(checked);
    });
  }

}
