import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalListComponent } from './kal-list.component';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';
export * from './kal-list.component';

const exports = [
  KalListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    KalIconModule
  ],
  declarations: exports,
  exports: exports
})
export class KalListModule {
}
