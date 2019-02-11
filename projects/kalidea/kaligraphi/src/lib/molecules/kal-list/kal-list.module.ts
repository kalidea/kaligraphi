import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { KalListComponent } from './kal-list.component';
import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';

import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';

export * from './kal-list.component';
export * from './kal-list-selection';
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
    ScrollingModule
  ],
  declarations: exports,
  exports: exports
})
export class KalListModule {
}
