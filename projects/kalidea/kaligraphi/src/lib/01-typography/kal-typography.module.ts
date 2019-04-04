import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalChipModule } from './kal-chip/kal-chip.module';
import { KalIconModule } from './kal-icon/kal-icon.module';

export * from './kal-chip/kal-chip.module';
export * from './kal-icon/kal-icon.module';

const exports = [
  KalChipModule,
  KalIconModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: [],
})
export class KalTypographyModule {
}
