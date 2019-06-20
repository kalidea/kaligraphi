import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalCheckboxComponent } from '../kal-checkbox/kal-checkbox.component';
import { FormElementComponent } from '../../utils/forms/form-element.component';
import { KalFormFieldLabelDirective } from './kal-form-field-label.directive';

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
}

/** InjectionToken that can be used to specify the global form field errors. */
export const KAL_FORM_FIELDS_GLOBAL_OPTIONS =
  new InjectionToken<KalFormFieldOptions>('KAL_FORM_FIELDS_GLOBAL_OPTIONS');


@Component({
  selector: 'kal-form-field',
  templateUrl: './kal-form-field.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalFormFieldComponent implements AfterContentInit {

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

  @ContentChild(forwardRef(() => FormElementComponent))
  formElement: FormElementComponent;

  @ContentChild(KalFormFieldLabelDirective)
  labelTemplate;

  @AutoUnsubscribe()
  private subscriptionsList: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef,
              @Optional() @Inject(KAL_FORM_FIELDS_GLOBAL_OPTIONS) private formFieldOptions: KalFormFieldOptions) {
    this.formFieldOptions = formFieldOptions || {};
  }

  get showError() {
    return !!this.formFieldOptions.showError;
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
    this.required = this.formElement.required;
    this.for = this.formElement.id;
    this.checkErrorAndDirtyness();
    this.cdr.markForCheck();
  }

  private checkErrorAndDirtyness() {
    this.hasError = (!!this.formFieldOptions.showErrorAtDisplay || this.formElement.dirty) && this.formElement.hasError;
  }

  ngAfterContentInit(): void {
    if (this.formElement) {

      this.configureFormField();

      // watch input change
      this.subscriptionsList.push(
        merge(
          this.formElement.inputChanges,
          this.formElement.valueChanges,
          this.formElement.statusChange
        )
          .pipe(
            startWith(true)
          )
          .subscribe(() => {
            this.configureFormField();
          })
      );

    }
  }
}
