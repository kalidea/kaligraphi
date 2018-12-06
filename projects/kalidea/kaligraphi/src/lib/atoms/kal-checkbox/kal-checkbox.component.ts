import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs';
import { buildProviders, FormElementComponent } from '../../utils/index';
import { KalFormFieldComponent } from '../../molecules/kal-form-field/kal-form-field.component';

@Component({
  selector: 'kal-checkbox',
  templateUrl: './kal-checkbox.component.html',
  styleUrls: ['./kal-checkbox.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalCheckboxComponent)
})
export class KalCheckboxComponent extends FormElementComponent<boolean> implements OnInit, OnChanges, OnDestroy {

  /**
   * The form control that contains the checkbox value
   */
  control: FormControl;

  /**
   * Subscription of the valueChanges control
   */
  controlSubscription: Subscription;

  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    this.control.patchValue(value, {emitEvent: false});
  }

  /**
   * @inheritDoc
   */
  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.control.disable({emitEvent: false});
    } else {
      this.control.enable({emitEvent: false});
    }
  }

  ngOnInit() {
    this.control = new FormControl(
      {
        value: this.value ? coerceBooleanProperty(this.value) : false,
        disabled: this.disabled
      }
    );

    this.controlSubscription = this.control.valueChanges.subscribe(checked => {

      // notify parent when the form control value changes
      super.notifyUpdate(checked);

      // emit the form control value
      this.valueChange.emit(checked);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled && !changes.disabled.isFirstChange()) {
      if (changes.disabled.currentValue) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

}
