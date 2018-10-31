import { Directive } from '@angular/core';
import { CdkStepLabel } from '@angular/cdk/stepper';

@Directive({
  selector: '[kalStepLabel]'
})
export class KalStepLabelDirective extends CdkStepLabel {

}
