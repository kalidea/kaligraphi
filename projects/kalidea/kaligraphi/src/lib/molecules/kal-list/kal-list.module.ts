import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';
import { KalCheckboxModule } from '../../atoms/kal-checkbox/kal-checkbox.module';

import { KalListComponent } from './kal-list.component';
import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';

export * from './kal-list.component';
export * from './kal-list-item.directive';
export * from './kal-list-item-selection.directive';

const exports = [
  KalListComponent,
  KalListItemDirective,
  KalListItemSelectionDirective
];

@NgModule({
  imports: [
    CommonModule,
    KalIconModule,
    ScrollingModule,
    KalCheckboxModule
  ],
  declarations: exports,
  exports: exports
})
export class KalListModule {
}
