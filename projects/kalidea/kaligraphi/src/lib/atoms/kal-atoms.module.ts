import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalInputModule } from './kal-input/kal-input.module';
import { KalIconModule } from './kal-icon/kal-icon.module';
import { KalSliderModule } from './kal-slider/kal-slider.module';

export * from './kal-input/kal-input.module';
export * from './kal-checkbox/kal-checkbox.module';
export * from './kal-icon/kal-icon.module';
export * from './kal-slider/kal-slider.module';

const exports = [
  KalCheckboxModule,
  KalInputModule,
  KalIconModule,
  KalSliderModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KalAtomsModule {
}
