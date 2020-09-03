import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalFormFieldComponent } from './kal-form-field.component';
import { KalFormFieldLabelDirective } from './kal-form-field-label.directive';

export * from './kal-form-field.component';
export * from './kal-form-field-label.directive';

const exports = [
  KalFormFieldComponent,
  KalFormFieldLabelDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports,
  declarations: exports
})
export class KalFormFieldModule { }
