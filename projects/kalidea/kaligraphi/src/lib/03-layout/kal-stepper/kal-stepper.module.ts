import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalStepHeaderDirective, KalStepperComponent } from './kal-stepper.component';
import { KalStepComponent } from './kal-step.component';
import { KalStepHeaderComponent } from './kal-step-header.component';
import { KalStepLabelDirective } from './kal-step-label.directive';

export * from './kal-stepper.component';
export * from './kal-step.component';
export * from './kal-step-header.component';
export { KalStepLabelDirective } from './kal-step-label.directive';

const exports = [
  KalStepperComponent,
  KalStepComponent,
  KalStepHeaderComponent,
  KalStepHeaderDirective,
  KalStepLabelDirective,
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports,
  declarations: exports
})
export class KalStepperModule {
}
