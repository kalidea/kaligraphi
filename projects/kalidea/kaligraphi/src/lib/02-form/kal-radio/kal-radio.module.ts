import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalRadioComponent, KalRadioGroupComponent } from './kal-radio.component';

export * from './kal-radio.component';
export * from './kal-radio-change';

const exports = [
  KalRadioComponent,
  KalRadioGroupComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exports,
  exports: exports
})
export class KalRadioModule { }
