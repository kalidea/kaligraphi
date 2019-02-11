import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KalCheckboxComponent } from './kal-checkbox.component';

import { KalFormFieldModule } from '../../molecules/kal-form-field/kal-form-field.module';
export * from './kal-checkbox.component';

const exports = [
  KalCheckboxComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KalFormFieldModule
  ],
  exports: exports,
  declarations: exports
})
export class KalCheckboxModule {
}
