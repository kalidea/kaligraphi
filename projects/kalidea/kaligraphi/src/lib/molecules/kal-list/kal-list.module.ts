import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalListComponent } from './kal-list.component';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';
import { KalListItemDirective } from './kal-list-item.directive';

export * from './kal-list.component';
export * from './kal-list-item.directive';

const exports = [
  KalListComponent,
  KalListItemDirective
];

@NgModule({
  imports: [
    CommonModule,
    KalIconModule,
  ],
  declarations: exports,
  exports: exports
})
export class KalListModule {
}
