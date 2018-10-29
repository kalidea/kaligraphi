import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KalSliderComponent } from './kal-slider.component';
export { KalSliderComponent } from './kal-slider.component';

const exports = [
  KalSliderComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: exports,
  declarations: exports
})
export class KalSliderModule {
}
