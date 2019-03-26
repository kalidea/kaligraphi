import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { FormHooks } from '@angular/forms/src/model';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { of, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { InputFormater } from './format/input-formater';
import { KalFormaterService } from './kal-formater.service';

import { AutoUnsubscribe, buildProviders, FormElementComponent } from '../../utils/index';

@Component({
  selector: 'kal-input',
  templateUrl: './kal-input.component.html',
  styleUrls: ['./kal-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalInputComponent)
})
export class KalInputComponent extends FormElementComponent<string> implements OnDestroy, AfterContentInit {

  /**
   * form control for this component
   */
  control: FormControl;

  /**
   * should we format data on field on blur ?
   */
  @Input() formatOnBlur = true;

  /**
   * type of input  ( text, password, email, number, ... )
   */
  @Input() type = 'text';

  /**
   * chars limit
   */
  @Input() limit: number;

  /**
   * Custom icon to use for the input
   */
  @Input() icon: string;

  @Output() readonly iconClicked = new EventEmitter();

  /**
   * event to trigger change
   */
  @Input() updateOnEvent: FormHooks = 'change';

  @AutoUnsubscribe()
  private controlChangedSubscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private controlStatusChangedSubscription = Subscription.EMPTY;

  private isClearable = false;

  constructor(private cdr: ChangeDetectorRef,
              private injector: Injector,
              private formaters: KalFormaterService) {
    super();
  }

  get htmlInputType() {
    if (this.type === 'password') {
      return this.type;
    } else {
      return 'text';
    }
  }

  @Input()
  get clearable(): boolean {
    return this.isClearable;
  }

  set clearable(clearable: boolean) {
    this.isClearable = coerceBooleanProperty(clearable);
    this.cdr.markForCheck();
  }

  /**
   * get formater for this type
   */
  get formater(): InputFormater {
    return this.formaters.get(this.type);
  }

  clearField() {
    if (!this.disabled) {
      this.control.setValue('');
    }
  }

  customIconClicked() {
    this.iconClicked.emit();
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    this.value = value;

    if (this.control) {
      value = this.formater.toUser(value);

      this.value = value;
      this.control.setValue(value, {emitEvent: false});

      super.writeValue(value);

      this.cdr.detectChanges();
    }
  }

  /**
   * @inheritDoc
   * overload notifyupdate
   */
  notifyUpdate(value) {
    this.value = value;

    this.valueChange.emit(value);

    // notify parent
    super.notifyUpdate(this.formater.toCode(value));
    this.cdr.detectChanges();
  }

  validate(c: AbstractControl) {
    return of(c.errors);
  }

  formatValue() {
    if (this.formatOnBlur) {
      this.control.patchValue(this.formater.toUser(this.value), {emitEvent: false});
    }
  }

  private getSuperControl() {
    if (this.ngControl && this.ngControl.control) {
      return this.ngControl.control;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.cdr.detach();
  }

  ngAfterContentInit(): void {

    // ngControl for formControl does not contain `control` on ngOnInit
    this.ngControl = this.injector.get(NgControl, null);

    const superControl = this.getSuperControl();

    // grab updateOn property from control
    if (superControl) {
      this.updateOnEvent = superControl.updateOn;
    }

    this.control = new FormControl(this.value, {updateOn: this.updateOnEvent});

    // update disabled state
    if (superControl) {
      this.controlStatusChangedSubscription = superControl.statusChanges
        .pipe(startWith(1))
        .subscribe(() => {
          if (superControl.disabled !== this.control.disabled) {
            superControl.enabled ? this.control.enable() : this.control.disable();
            this.setDisabledState(superControl.enabled === true);
          }
        });

    }

    this.controlChangedSubscription = this.control.valueChanges.subscribe(value => {
      // notify parent for validation
      this.notifyUpdate(value);
    });
  }
}
