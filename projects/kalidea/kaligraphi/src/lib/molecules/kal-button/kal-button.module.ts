import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalButtonComponent } from './kal-button.component';

import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';
export { KalButtonComponent } from './kal-button.component';

const exports = [
  KalButtonComponent
];

@NgModule({
  imports: [
    KalIconModule,
    CommonModule,
  ],
  exports: exports,
  declarations: exports
})
export class KalButtonModule { }
