import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalInputModule } from './kal-input/kal-input.module';

export * from './kal-input/kal-input.module';
export * from './kal-checkbox/kal-checkbox.module';

const exports = [
  KalCheckboxModule,
  KalInputModule
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
