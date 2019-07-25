import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';
import { KalCheckboxModule } from '../../02-form/kal-checkbox/kal-checkbox.module';

import { KalListComponent } from './kal-list.component';
import { KalListItemDirective } from './directives/kal-list-item.directive';
import { KalListItemLastDirective } from './directives/kal-list-item-last.directive';
import { KalListItemSelectionDirective } from './directives/kal-list-item-selection.directive';

export * from './kal-list.component';
export * from './directives/kal-list-item.directive';
export * from './directives/kal-list-item-last.directive';
export * from './directives/kal-list-item-selection.directive';

const exports = [
  KalListComponent,
  KalListItemDirective,
  KalListItemLastDirective,
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
