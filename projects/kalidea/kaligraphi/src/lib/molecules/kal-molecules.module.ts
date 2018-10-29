import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalTextareaModule } from './kal-textarea/kal-textarea.module';
import { KalSelectModule } from './kal-select/kal-select.module';
import { KalRaterModule } from './kal-rater/kal-rater.module';
import { KalTabModule } from './kal-tabs/kal-tab.module';
import { KalListItemModule } from 'src/lib/molecules/kal-list-item/kal-list-item.module';

export * from './kal-textarea/kal-textarea.module';
export * from './kal-select/kal-select.module';
export * from './kal-rater/kal-rater.module';
export * from './kal-tabs/kal-tab.module';
export * from './kal-list-item/kal-list-item.component';

const exports = [
  KalTextareaModule,
  KalSelectModule,
  KalRaterModule,
  KalTabModule,
  KalListItemModule
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
