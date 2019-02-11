import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { KalSliderComponent } from './kal-slider.component';

import { GestureConfig } from '../../utils/gestures/gesture-config';

export { KalSliderComponent } from './kal-slider.component';

const exports = [
  KalSliderComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    }
  ],
  exports: exports,
  declarations: exports
})
export class KalSliderModule {
}
