import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalFormFieldComponent } from './kal-form-field.component';
export * from './kal-form-field.component';

const exports = [
  KalFormFieldComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalFormFieldModule { }
