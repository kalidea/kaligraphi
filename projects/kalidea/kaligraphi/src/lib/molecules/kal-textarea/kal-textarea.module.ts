import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalTextareaComponent } from './kal-textarea.component';
export { KalTextareaComponent } from './kal-textarea.component';

const exports = [
  KalTextareaComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalTextareaModule { }
