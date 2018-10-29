import { Directive, HostListener } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Directive({
  selector: '[kalStepperPrevious]'
})
export class KalStepperPreviousDirective {


  @HostListener('click')
  previousStep() {
    this.stepper.previous();
  }

  constructor(public stepper: CdkStepper) {}


}
