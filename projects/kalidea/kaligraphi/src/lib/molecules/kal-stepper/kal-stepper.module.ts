import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalStepHeaderDirective, KalStepperComponent } from './kal-stepper.component';
import { KalStepComponent } from './kal-step/kal-step.component';
import { KalStepHeaderComponent } from './kal-step-header/kal-step-header.component';
import { KalStepperNextDirective, KalStepperPreviousDirective, KalStepLabelDirective } from './directives/index';

export * from './kal-stepper.component';
export * from './kal-step/kal-step.component';
export * from './kal-step-header/kal-step-header.component';
export * from './directives/kal-step-label.directive';
export * from './directives/index';

const exports = [
  KalStepperComponent,
  KalStepComponent,
  KalStepHeaderComponent,
  KalStepHeaderDirective,
  KalStepLabelDirective,
  KalStepperNextDirective,
  KalStepperPreviousDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalStepperModule {
}
