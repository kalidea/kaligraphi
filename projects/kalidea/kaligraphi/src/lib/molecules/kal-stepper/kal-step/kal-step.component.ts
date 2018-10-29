import { ChangeDetectionStrategy, Component, ContentChild, forwardRef, Inject, ViewEncapsulation } from '@angular/core';
import { CdkStep } from '@angular/cdk/stepper';

import { KalStepperComponent } from '../kal-stepper.component';
import { KalStepLabelDirective } from '../directives/kal-step-label.directive';

@Component({
  selector: 'kal-step',
  templateUrl: './kal-step.component.html',
  styleUrls: ['./kal-step.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalStepComponent extends CdkStep {

  @ContentChild(KalStepLabelDirective) stepLabel: KalStepLabelDirective;

  constructor(@Inject(forwardRef(() => KalStepperComponent)) stepper: KalStepperComponent) {
    super(stepper);
  }

}
