import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalCheckboxComponent } from '../kal-checkbox/kal-checkbox.component';
import { FormElementComponent } from '../../utils/forms/form-element.component';
import { KalFormFieldLabelDirective } from './kal-form-field-label.directive';
import { AbstractControl } from '@angular/forms';
import isNil from 'lodash-es/isNil';
import { Coerce } from '../../utils/decorators/coerce';

export interface KalFormFieldOptions {

  /**
   * declare errors Array
   * { "maxLength": "value {actualLength} exceed maximal {requiredLength}"}
   */
  errors?: { [key: string]: string };

  /**
   * show error
   */
  showError?: boolean;

  /**
   * show error when the form field is displayed
   */
  showErrorAtDisplay?: boolean;

  /**
   * which validator keys represent a required field ?
   * eg: ['required', 'notnull']
   */
  requiredValidatorKeys?: string[];

}

/** InjectionToken that can be used to specify the global form field errors. */
export const KAL_FORM_FIELDS_GLOBAL_OPTIONS =
  new InjectionToken<KalFormFieldOptions>('KAL_FORM_FIELDS_GLOBAL_OPTIONS');


@Component({
  selector: 'kal-form-field',
  exportAs: 'kalFormField',
  templateUrl: './kal-form-field.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalFormFieldComponent implements AfterContentInit, OnDestroy, AfterContentChecked {

  /**
   * Does the field has an error
   */
  hasError = false;

  /**
   * Label of the field
   */
  label: string;

  /**
   * Is the field required
   */
  required = false;

  /**
   * For attribute
   */
  for: string;

  /**
   * Legend of the field
   */
  @Input() legend: string;

  /**
   * show error message
   */
  @Coerce('boolean')
  @Input() displayErrors: boolean;

  @ContentChild(forwardRef(() => FormElementComponent), {static: false})
  formElement: FormElementComponent;

  @ContentChild(KalFormFieldLabelDirective, {static: true})
  labelTemplate;

  @AutoUnsubscribe()
  private subscriptionsList: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef,
              @Optional() @Inject(KAL_FORM_FIELDS_GLOBAL_OPTIONS) private formFieldOptions: KalFormFieldOptions) {
    this.formFieldOptions = formFieldOptions || {};
  }

  get showError() {
    return !!this.formFieldOptions.showError && isNil(this.displayErrors) || this.displayErrors === true;
  }

  get errors() {
    return this.formElement.errors;
  }

  getErrorMessage({key, value: parameters}: KeyValue<string, any>) {
    const messagesList = Object.assign({}, this.formFieldOptions.errors, this.formElement.errorsMessage);
    let message = messagesList[key] || '';

    if (parameters) {
      Object.keys(parameters).forEach(parameterName => {
        message = message.replace('{' + parameterName + '}', parameters[parameterName]);
      });
    }

    // replace {value} by actual value
    if (this.formElement.ngControl) {
      message = message.replace('{value}', this.formElement.ngControl.value);
    }

    return message;
  }

  private configureFormField() {
    if (!(this.formElement instanceof KalCheckboxComponent)) {
      this.label = this.formElement.label;
    }
    this.required = this.formElement.required || this.hasRequiredValidator();
    this.for = this.formElement.id;
    this.checkErrorAndDirtyness();
    this.cdr.markForCheck();
  }

  private hasRequiredValidator(): boolean {
    const control = this.formElement.superControl || this.formElement.control;
    if (control?.validator) {
      const validationResult = control.validator({} as AbstractControl);
      const requiredValidatorKeys = this.formFieldOptions.requiredValidatorKeys || ['required'];
      if (validationResult && requiredValidatorKeys.some(k => validationResult[k])) {
        return true;
      }
    }
    return false;
  }

  private checkErrorAndDirtyness() {
    // if no formElement, nothing to process
    if (!this.formElement) {
      return;
    }
    this.hasError = (!!this.formFieldOptions.showErrorAtDisplay || this.formElement.dirty)
      && this.formElement.hasError;
    this.cdr.markForCheck();
  }

  ngAfterContentChecked(): void {
    // we should check validity each time content is checked
    // fix for initial error display with async validators
    this.checkErrorAndDirtyness();
  }

  ngAfterContentInit(): void {
    if (this.formElement) {
      this.configureFormField();

      // watch input change
      const inputChanges = this.formElement.inputChanges
        .subscribe(() => this.configureFormField());

      const valueChanges = this.formElement.valueChanges
        .subscribe(() => this.cdr.markForCheck());

      const stateChanges = this.formElement.statusChanges
        .subscribe(() => this.checkErrorAndDirtyness());

      this.subscriptionsList.push(inputChanges, valueChanges, stateChanges);

    }
  }

  ngOnDestroy(): void {
    // required for AutoUnsubscribe
  }
}
