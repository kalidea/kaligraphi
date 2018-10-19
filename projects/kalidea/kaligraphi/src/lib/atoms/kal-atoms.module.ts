import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalInputModule } from './kal-input/kal-input.module';
import { KalSelectModule } from './kal-select/kal-select.module';
import { KalOptionModule } from './kal-option/kal-option.module';

export * from './kal-input/kal-input.module';
export * from './kal-checkbox/kal-checkbox.module';
export * from './kal-icon/kal-icon.module';
export * from './kal-select/kal-select.module';
export * from './kal-option/kal-option.module';

const exports = [
  KalCheckboxModule,
  KalInputModule,
  KalSelectModule,
  KalOptionModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KalAtomsModule { }
