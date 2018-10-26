import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalRadioComponent, KalRadioGroupComponent } from './kal-radio.component';
export * from './kal-radio.component';

const exports = [
  KalRadioGroupComponent,
  KalRadioComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalRadioModule { }
