import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  Optional,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { CdkStep, CdkStepHeader, CdkStepper, StepperOrientation } from '@angular/cdk/stepper';
import { FocusableOption } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs/operators';

import { KalStepLabelDirective } from './kal-step-label.directive';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';

// bug in cdk, should provide this class ourselves
// https://github.com/angular/material2/pull/10614/files#diff-6c5ad0b93867d084db7acfd30f02d32bR247
// should remove in cdk 7.x
@Directive({
  selector: '[kalStepHeader]',
})
export class KalStepHeaderDirective extends CdkStepHeader implements FocusableOption {

  constructor(_elementRef: ElementRef<HTMLElement>) {
    super(_elementRef);
  }

  /** Focuses the step header. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
}

// can't put classes in separate files, because of CDK implementation :
// => CdkStepper need CdkStep // CdkStep need CdkStepper
// eslint-disable-next-line max-classes-per-file
@Component({
  selector: 'kal-step',
  exportAs: 'kalstep',
  template: '<ng-template><ng-content></ng-content></ng-template>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: CdkStep, useExisting: KalStepComponent},
  ]
})
export class KalStepComponent extends CdkStep {

  @ContentChild(KalStepLabelDirective, {static: false}) stepLabel: KalStepLabelDirective;

  constructor(@Inject(forwardRef(() => KalStepperComponent)) stepper: CdkStepper) {
    super(stepper);
  }

}


// eslint-disable-next-line max-classes-per-file
@Component({
  selector: 'kal-stepper',
  templateUrl: './kal-stepper.component.html',
  styleUrls: ['./kal-stepper.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalStepperComponent extends CdkStepper implements AfterContentInit {

  @HostBinding('attr.role')
  role = 'tablist';

  @ViewChildren(KalStepHeaderDirective)
  _stepHeader: QueryList<KalStepHeaderDirective>;

  /** Full list of steps inside the stepper, including inside nested steppers. */
  @ContentChildren(KalStepComponent, {descendants: true}) _steps: QueryList<KalStepComponent>;

  /** Steps that belong to the current stepper, excluding ones from nested steppers. */
  readonly steps: QueryList<KalStepComponent> = new QueryList<KalStepComponent>();

  // need to add constructor for test:ci
  constructor(@Optional() dir: Directionality,
              changeDetectorRef: ChangeDetectorRef,
              elementRef: ElementRef<HTMLElement>,
              @Inject(DOCUMENT) document: any) {
    super(dir, changeDetectorRef, elementRef);
  }

  @HostBinding('attr.aria-orientation')
  @Input()
  get orientation() {
    return super.orientation;
  }

  set orientation(orientation: StepperOrientation) {
    super.orientation = orientation;
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    // Mark the component for change detection whenever the content children query changes
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
  }
}
