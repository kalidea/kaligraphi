import { EventEmitter, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

import { FormControlAccessComponent } from './form-control-access.component';
import { uniqid } from '../helpers/uniq';

export class FormElementComponent<T = string> extends FormControlAccessComponent<T> {

  /**
   * label for this form element
   */
  @Input() label: string;

  /**
   * Name for this form element
   */
  @Input() name: string;

  /**
   * placeholder for this form element
   */
  @Input() placeholder;

  /**
   * id for this form element
   */
  @Input() id = uniqid('form-');

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

}
