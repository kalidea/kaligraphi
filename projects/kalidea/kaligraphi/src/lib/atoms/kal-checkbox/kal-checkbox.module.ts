import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KalFormFieldModule } from '../../molecules/kal-form-field/kal-form-field.module';

import { KalCheckboxComponent } from './kal-checkbox.component';
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
