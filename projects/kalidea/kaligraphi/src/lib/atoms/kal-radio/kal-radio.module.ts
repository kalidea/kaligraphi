import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalRadioGroupComponent } from './kal-radio-group/kal-radio-group.component';
import { KalRadioComponent } from './kal-radio/kal-radio.component';

export * from './kal-radio-group/kal-radio-group.component';
export * from './kal-radio/kal-radio.component';

const exports = [
  KalRadioGroupComponent,
  KalRadioComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalRadioModule { }
