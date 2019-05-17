import { EventEmitter, forwardRef, HostBinding, Injector, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AbstractControl, FormHooks } from '@angular/forms/src/model';
import { FormControl, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

import { FormControlAccessComponent } from './form-control-access.component';
import { uniqid } from '../helpers/uniq';
import { Coerce } from '../decorators/coerce';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';

export class FormElementComponent<T = string> extends FormControlAccessComponent<T> implements OnChanges, OnDestroy {

  /**
   * label for this form element
   */
  @Input() label: string;

  /**
   * Is the field required
   */
  @Coerce('boolean')
  @Input()
  required = false;

  /**
   * placeholder for this form element
   */
  @Input() placeholder: T;

  /**
   * id of this form element
   */
  @Input() id = uniqid('form-');

  /**
   * name of this form element
   */
  @Input() name = this.id;

  /**
   * value for this form element
   */
  @Input() value: T;

  /**
   * tab index for this element
   */
  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex: number;

  /**
   * readonly for this element
   */
  @Input()
  @Coerce('boolean')
  readonly: boolean;


  /**
   * event to trigger change
   */
  @Input()
  updateOnEvent: FormHooks;

  /**
   * list of message to display
   */
  @Input() errorsMessage: { [key: string]: string } = {};

  /**
   * output for value change
   */
  @Output() valueChanges: EventEmitter<T> = new EventEmitter<T>();

  /**
   * output for value change
   */
  @Output() inputChanges: EventEmitter<SimpleChanges> = new EventEmitter<SimpleChanges>();

  /**
   * ngControl of this form element
   */
  public ngControl: NgControl;

  /**
   * is this form element disabled
   */
  private isDisabled = false;

  /**
   * observable to track activity for this component
   */
  private activeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @AutoUnsubscribe()
  private controlStatusChangedSubscription = Subscription.EMPTY;

  constructor() {
    super();
  }

  /**
   * getter for observable of element state
   */
  get active$(): Observable<boolean> {
    return this.activeSubject$.asObservable();
  }

  /**
   * getter for element state
   */
  get active(): boolean {
    return this.activeSubject$.value;
  }

  /**
   * setter for element state
   */
  @Input()
  set active(value) {
    this.activeSubject$.next(coerceBooleanProperty(value));
  }

  /**
   * getter for disabled property
   */
  get disabled() {
    return this.isDisabled;
  }

  /**
   * setter for disabled property
   */
  @Input()
  @HostBinding('attr.disabled')
  set disabled(value) {
    this.isDisabled = coerceBooleanProperty(value);
  }

  /**
   * does this field as error
   */
  get hasError() {
    return this.errors !== null;
  }

  /**
   * get field errors
   */
  get errors() {
    if (this.ngControl) {
      return this.ngControl.errors;
    }
    return null;
  }

  /**
   * Reports whether the control is dirty, meaning that the user has changed
   * the value in the UI.
   */
  get dirty() {
    return this.ngControl ? this.ngControl.dirty : false;
  }

  /**
   * observe state change
   */
  get statusChange(): Observable<any> {
    if (this.ngControl) {
      return this.ngControl.statusChanges.pipe(distinctUntilChanged());
    } else {
      return new Observable();
    }
  }

  protected get superControl(): AbstractControl {
    if (this.ngControl && this.ngControl.control) {
      return this.ngControl.control;
    }
    return null;
  }

  /**
   * @inheritDoc
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  protected updateStatus(control) {
    if (this.superControl.disabled !== control.disabled) {
      this.superControl.enabled ? control.enable() : control.disable();
    }
  }

  /**
   * create control
   */
  protected createControlAndSubscriptions(injector: Injector, updateOnOverride?: FormHooks): FormControl {

    this.ngControl = injector.get(NgControl, null);

    let disabled = this.disabled;
    let updateOn: FormHooks = this.updateOnEvent;
    let value = this.value;

    if (!this.superControl) {
      return new FormControl({value, disabled}, {updateOn});
    }

    ({disabled, updateOn, value} = this.superControl);
    updateOn = updateOnOverride || updateOn; // override value
    const control = new FormControl({value, disabled}, {updateOn});

    // don't forget to implement super.ngOnDestroy on child element
    this.controlStatusChangedSubscription = this.superControl.statusChanges
      .pipe(startWith(1))
      .subscribe(() => this.updateStatus(control));

    return control;
  }

  /**
   * @inheritDoc
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.inputChanges.emit(changes);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.valueChanges.complete();
    this.inputChanges.complete();
  }

}


export function buildProviders(type) {
  return [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => type),
      multi: true
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => type),
      multi: true
    },
    {
      provide: FormElementComponent,
      useExisting: forwardRef(() => type),
    }
  ];
}
