import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalChipComponent } from './kal-chip.component';

import { KalIconModule } from '../kal-icon/kal-icon.module';

export * from './kal-chip.component';

const exports = [
  KalChipComponent
];

@NgModule({
  declarations: exports,
  imports: [
    CommonModule,
    KalIconModule
  ],
  exports
})
export class KalChipModule { }
