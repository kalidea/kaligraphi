import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { Coerce } from '../../utils/decorators/coerce';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

@Component({
  selector: 'kal-checkbox',
  exportAs: 'kalCheckbox',
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
  @AutoUnsubscribe()
  controlSubscription: Subscription;

  // empty id attribute
  @HostBinding('attr.id')
  attributeId = null;

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  private _value = false;

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

  private _disabled = false;

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
      this.valueChanges.emit(checked);
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
  }

}
