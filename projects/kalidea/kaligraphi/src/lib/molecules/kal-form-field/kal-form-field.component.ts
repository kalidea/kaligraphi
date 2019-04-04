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

import { AutoUnsubscribe, FormElementComponent } from '../../utils/index';
import { KalCheckboxComponent } from '../../atoms/kal-checkbox/kal-checkbox.component';

@Component({
  selector: 'kal-form-field',
  templateUrl: './kal-form-field.component.html',
  styleUrls: ['./kal-form-field.component.sass'],
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
