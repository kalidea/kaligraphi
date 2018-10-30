import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalInputModule } from './kal-input/kal-input.module';
import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalRadioModule } from './kal-radio/kal-radio.module';
import { KalOptionModule } from './kal-option/kal-option.module';
import { KalIconModule } from './kal-icon/kal-icon.module';
import { KalProgressBarModule } from './kal-progress-bar/kal-progress-bar.module';
import { KalSliderModule } from './kal-slider/kal-slider.module';

export * from './kal-input/kal-input.module';
export * from './kal-checkbox/kal-checkbox.module';
export * from './kal-radio/kal-radio.module';
export * from './kal-icon/kal-icon.module';
export * from './kal-progress-bar/kal-progress-bar.module';
export * from './kal-slider/kal-slider.module';
export * from './kal-option/kal-option.module';

const exports = [
  KalInputModule,
  KalCheckboxModule,
  KalRadioModule,
  KalIconModule,
  KalProgressBarModule,
  KalSliderModule,
  KalOptionModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
})
export class KalAtomsModule {
}
