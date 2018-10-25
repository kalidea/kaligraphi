import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalStepperComponent } from './kal-stepper.component';
export { KalStepperComponent } from './kal-stepper.component';
import { KalStepComponent } from './kal-step/kal-step.component';
export { KalStepComponent } from './kal-step/kal-step.component';

const exports = [
  KalStepperComponent,
  KalStepComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalStepperModule { }
