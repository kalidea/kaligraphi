import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KalCheckboxComponent } from './kal-checkbox.component';
export * from './kal-checkbox.component';

const exports = [
  KalCheckboxComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: exports,
  declarations: exports
})
export class KalCheckboxModule {
}
