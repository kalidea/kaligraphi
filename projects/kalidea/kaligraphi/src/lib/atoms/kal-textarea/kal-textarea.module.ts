import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KalTextareaComponent } from './kal-textarea.component';
export { KalTextareaComponent } from './kal-textarea.component';

const exports = [
  KalTextareaComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: exports,
  declarations: exports
})
export class KalTextareaModule { }
