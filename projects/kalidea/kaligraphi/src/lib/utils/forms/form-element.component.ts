import { EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { FormControlAccessComponent } from './form-control-access.component';
import { uniqid } from '../helpers/uniq';


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

export class FormElementComponent<T = string> extends FormControlAccessComponent<T> {

  /**
   * label for this form element
   */
  @Input() label: string;

  /**
   * Is the field required
   */
  @Input() required = false;

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
  @Input() tabIndex: number;

  /**
   * list of message to display
   */
  @Input() errorsMessage: { [key: string]: string } = {};

  /**
   * output for value change
   */
  @Output() valueChange: EventEmitter<T> = new EventEmitter<T>();

  /**
   * ngControl of this form element
   */
  public ngControl: NgControl;

  /**
   * is this form element readonly
   */
  private isReadonly: boolean;

  /**
   * is this form element disabled
   */
  private isDisabled: boolean;

  /**
   * observable to track activity for this component
   */
  private activeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
   * getter for readonly property
   */
  get readonly() {
    return this.isReadonly;
  }

  /**
   * setter for readonly property
   */
  @Input()
  set readonly(value) {
    this.isReadonly = coerceBooleanProperty(value);
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
   * observe state change
   */
  get statusChange(): Observable<any> {
    if (this.ngControl) {
      return this.ngControl.statusChanges.pipe(distinctUntilChanged());
    } else {
      return new Observable();
    }
  }

}
