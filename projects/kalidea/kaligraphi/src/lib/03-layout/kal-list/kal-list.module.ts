import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';
import { KalCheckboxModule } from '../../02-form/kal-checkbox/kal-checkbox.module';

import { KalListComponent } from './kal-list.component';
import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';
import { KalLoaderModule } from '../../04-overlay/kal-loader/kal-loader.module';

export * from './kal-list.component';
export * from './kal-list-item.directive';

const exports = [
  KalListComponent,
  KalListItemDirective,
];

@NgModule({
  imports: [
    CommonModule,
    KalIconModule,
    KalLoaderModule,
    ScrollingModule,
    KalCheckboxModule,
  ],
  declarations: [
    ...exports,
    KalListItemSelectionDirective,
  ],
  exports
})
export class KalListModule {
}
