import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalSelectComponent } from './kal-select.component';
export { KalSelectComponent } from './kal-select.component';

const exports = [
  KalSelectComponent
];
@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalSelectModule { }
