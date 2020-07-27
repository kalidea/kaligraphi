import { ChangeDetectionStrategy, Component, ContentChild, forwardRef, Inject, ViewEncapsulation } from '@angular/core';
import { CdkStep } from '@angular/cdk/stepper';

import { KalStepperComponent } from './kal-stepper.component';
import { KalStepLabelDirective } from './kal-step-label.directive';

@Component({
  selector: 'kal-step',
  exportAs: 'kalstep',
  template: '<ng-template><ng-content></ng-content></ng-template>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalStepComponent extends CdkStep {

  @ContentChild(KalStepLabelDirective, {static: false}) stepLabel: KalStepLabelDirective;

  constructor(@Inject(forwardRef(() => KalStepperComponent)) stepper: KalStepperComponent) {
    super(stepper);
  }

}
