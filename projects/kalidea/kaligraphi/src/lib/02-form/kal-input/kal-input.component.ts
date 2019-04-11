import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { FormHooks } from '@angular/forms/src/model';
import { of, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { InputFormater } from './format/input-formater';
import { KalFormaterService } from './kal-formater.service';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { Coerce } from '../../utils/decorators/coerce';


@Component({
  selector: 'kal-input',
  templateUrl: './kal-input.component.html',
  styleUrls: ['./kal-input.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalInputComponent)
})
export class KalInputComponent extends FormElementComponent<string> implements OnChanges, OnDestroy, AfterContentInit {

  /**
   * form control for this component
   */
  control: FormControl;

  @Input() autocomplete: string;

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

  @Input()
  @Coerce('boolean')
  clearable = false;

  @AutoUnsubscribe()
  private controlValueChangedSubscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private controlStatusChangedSubscription = Subscription.EMPTY;

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

  /**
   * get formater for this type
   */
  get formater(): InputFormater {
    return this.formaters.get(this.type);
  }

  private get superControl() {
    if (this.ngControl && this.ngControl.control) {
      return this.ngControl.control;
    }
    return null;
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

  private updateStatus() {
    if (this.superControl.disabled !== this.control.disabled) {
      this.superControl.enabled ? this.control.enable() : this.control.disable();
      this.setDisabledState(this.superControl.enabled === true);
    }
  }

  ngOnDestroy(): void {
    this.cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.cdr.markForCheck();
  }

  ngAfterContentInit(): void {

    // ngControl for formControl does not contain `control` on ngOnInit
    this.ngControl = this.injector.get(NgControl, null);

    // grab updateOn property from control
    if (this.superControl) {
      this.updateOnEvent = this.superControl.updateOn;
    }

    this.control = new FormControl(this.value, {updateOn: this.updateOnEvent});

    // update disabled state
    if (this.superControl) {
      this.controlStatusChangedSubscription = this.superControl.statusChanges
        .pipe(startWith(1))
        .subscribe(() => this.updateStatus());
    }

    this.controlValueChangedSubscription = this.control.valueChanges.subscribe(value => {
      // notify parent for validation
      this.notifyUpdate(value);
    });

  }
}