import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalTextareaModule } from './kal-textarea/kal-textarea.module';
import { KalSelectModule } from './kal-select/kal-select.module';
import { KalRaterModule } from './kal-rater/kal-rater.module';
import { KalAtomsModule } from '../atoms/kal-atoms.module';

export * from './kal-textarea/kal-textarea.module';
export * from './kal-select/kal-select.module';
export * from './kal-rater/kal-rater.module';

const exports = [
  KalTextareaModule,
  KalSelectModule,
  KalAtomsModule,
  KalRaterModule
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
