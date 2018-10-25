import { ChangeDetectionStrategy, Component, forwardRef, Inject, ViewEncapsulation } from '@angular/core';
import { CdkStep } from '@angular/cdk/stepper';

import { KalStepperComponent } from '../kal-stepper.component';

@Component({
  selector: 'kal-step',
  templateUrl: './kal-step.component.html',
  styleUrls: ['./kal-step.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalStepComponent extends CdkStep {

  constructor(@Inject(forwardRef(() => KalStepperComponent)) stepper: KalStepperComponent) {
    super(stepper);
  }

}
