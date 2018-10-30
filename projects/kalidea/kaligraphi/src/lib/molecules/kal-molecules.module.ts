import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalTextareaModule } from './kal-textarea/kal-textarea.module';
import { KalSelectModule } from './kal-select/kal-select.module';
import { KalRaterModule } from './kal-rater/kal-rater.module';
import { KalTabModule } from './kal-tabs/kal-tab.module';
import { KalListModule } from './kal-list/kal-list.module';

export * from './kal-textarea/kal-textarea.module';
export * from './kal-select/kal-select.module';
export * from './kal-rater/kal-rater.module';
export * from './kal-tabs/kal-tab.module';
export * from './kal-list/kal-list.component';
export * from './kal-list/kal-list.module';

const exports = [
  KalTextareaModule,
  KalSelectModule,
  KalRaterModule,
  KalTabModule,
  KalListModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KalMoleculesModule {
}
