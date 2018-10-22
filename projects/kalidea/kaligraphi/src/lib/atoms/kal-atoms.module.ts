import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalRadioModule } from './kal-radio/kal-radio.module';
import { KalInputModule } from './kal-input/kal-input.module';

export * from './kal-input/kal-input.module';
export * from './kal-checkbox/kal-checkbox.module';
export * from './kal-radio/kal-radio.module';
export * from './kal-icon/kal-icon.module';

const exports = [
  KalCheckboxModule,
  KalRadioModule,
  KalInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
})
export class KalAtomsModule { }
