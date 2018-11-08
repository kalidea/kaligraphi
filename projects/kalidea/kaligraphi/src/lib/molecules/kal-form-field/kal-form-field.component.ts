import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';

import { FormElementComponent } from '../../utils';

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

  @Input() control: AbstractControl;

  @ContentChild(FormElementComponent) formElement: FormElementComponent;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.hasError = false;
    this.label = this.formElement.label;
    this.required = this.formElement.required;
    this.for = this.formElement.id;
    this.hasError = this.formElement.hasError;


    this.formElement.statusChange.subscribe(data => {
      console.log(data);
      this.hasError = this.formElement.hasError;
      this.cdr.markForCheck();
    });
  }

}
