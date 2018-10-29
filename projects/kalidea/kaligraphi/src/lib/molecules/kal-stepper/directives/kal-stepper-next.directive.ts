import { Directive, HostListener } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Directive({
  selector: '[kalStepperNext]'
})
export class KalStepperNextDirective {

  @HostListener('click')
  nextStep() {
    this.stepper.next();
  }

  constructor(public stepper: CdkStepper) {}

}
