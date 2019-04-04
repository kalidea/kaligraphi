import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { Coerce } from '../../utils/decorators/coerce';

@Component({
  selector: 'kal-checkbox',
  templateUrl: './kal-checkbox.component.html',
  styleUrls: ['./kal-checkbox.sass'],
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

  private _value = false;

  private _disabled = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  get value() {
    return this._value;
  }

  @Input()
  @Coerce('boolean')
  set value(value: boolean) {
    this._value = value;
    if (this.control) {
      this.control.patchValue(this._value, {emitEvent: false});
    }

    this.cdr.markForCheck();
  }

  @Input()
  @Coerce('boolean')
  get disabled() {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    if (this.control) {
      this.setDisabledState(this._disabled);
    }
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    this.control.patchValue(value, {emitEvent: false});
    super.writeValue(value);
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
        value: this.value,
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
