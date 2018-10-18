import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalTextareaModule } from './kal-textarea/kal-textarea.module';
import { KalSelectModule } from './kal-select/kal-select.module';

export * from './kal-textarea/kal-textarea.module';
export * from './kal-select/kal-select.module';

const exports = [
  KalTextareaModule,
  KalSelectModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KalMoleculesModule { }
