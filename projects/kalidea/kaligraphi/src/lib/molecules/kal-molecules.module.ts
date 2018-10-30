import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalTextareaModule } from './kal-textarea/kal-textarea.module';
import { KalSelectModule } from './kal-select/kal-select.module';
import { KalRaterModule } from './kal-rater/kal-rater.module';
import { KalTabModule } from './kal-tabs/kal-tab.module';
import { KalAccordionModule } from './kal-accordion/kal-accordion.module';

export * from './kal-textarea/kal-textarea.module';
export * from './kal-select/kal-select.module';
export * from './kal-rater/kal-rater.module';
export * from './kal-tabs/kal-tab.module';
export * from './kal-accordion/kal-accordion.module';

const exports = [
  KalTextareaModule,
  KalSelectModule,
  KalTabModule,
  KalRaterModule,
  KalAccordionModule,
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
