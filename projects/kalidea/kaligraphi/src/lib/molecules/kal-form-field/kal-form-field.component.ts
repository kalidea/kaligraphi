import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild, forwardRef,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe, FormElementComponent } from '../../utils/index';

@Component({
  selector: 'kal-form-field',
  templateUrl: './kal-form-field.component.html',
  styleUrls: ['./kal-form-field.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalFormFieldComponent implements AfterContentInit, OnDestroy {

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

  @ContentChild(forwardRef( () => FormElementComponent))
  formElement: FormElementComponent;

  @AutoUnsubscribe()
  private statusChange: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    if (this.formElement) {
      this.label = this.formElement.label;
      this.required = this.formElement.required;
      this.for = this.formElement.id;
      this.hasError = this.formElement.hasError;

      this.statusChange = this.formElement.statusChange.subscribe(data => {
        this.hasError = this.formElement.hasError;
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
  }

}
