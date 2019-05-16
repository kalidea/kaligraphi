import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalCheckboxComponent } from '../kal-checkbox/kal-checkbox.component';
import { FormElementComponent } from '../../utils/forms/form-element.component';
import { KalFormFieldLabelDirective } from './kal-form-field-label.directive';

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
  private statusChange: Subscription;

  @AutoUnsubscribe()
  private inputChange: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
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
    this.hasError = this.formElement.dirty && this.formElement.hasError;
  }

  ngAfterContentInit(): void {
    if (this.formElement) {

      this.configureFormField();

      // watch input change
      this.inputChange = this.formElement.inputChange
        .subscribe(() => this.configureFormField());

      this.statusChange = this.formElement.statusChange.subscribe(data => {
        this.checkErrorAndDirtyness();
        this.cdr.markForCheck();
      });
    }
  }

}
