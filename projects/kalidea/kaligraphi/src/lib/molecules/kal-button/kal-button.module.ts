import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalButtonComponent } from './kal-button.component';
export { KalButtonComponent } from './kal-button.component';

const exports = [
  KalButtonComponent
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: exports,
  declarations: exports
})
export class KalButtonModule { }
