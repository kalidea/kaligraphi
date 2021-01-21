import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { CdkStepper, StepperOrientation } from '@angular/cdk/stepper';
import { FocusableOption } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs/operators';
import { KalStepComponent } from './kal-step.component';


// bug in cdk, should provide this class ourselves
// https://github.com/angular/material2/pull/10614/files#diff-6c5ad0b93867d084db7acfd30f02d32bR247
// should remove in cdk 7.x
@Directive({
  selector: '[kalStepHeader]',
})
export class KalStepHeaderDirective implements FocusableOption {

  constructor(protected _elementRef: ElementRef<HTMLElement>) {
  }

  /** Focuses the step header. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
}

// tslint:disable-next-line:max-classes-per-file
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

  protected _orientation: StepperOrientation = 'horizontal';

  @HostBinding('attr.aria-orientation')
  @Input()
  get orientation() {
    return this._orientation;
  }

  set orientation(orientation: StepperOrientation){
    this._orientation = orientation;
  }

  @ViewChildren(KalStepHeaderDirective)
  _stepHeader: QueryList<KalStepHeaderDirective>;

  /** Full list of steps inside the stepper, including inside nested steppers. */
  @ContentChildren(KalStepComponent, {descendants: true}) _steps: QueryList<KalStepComponent>;

  /** Steps that belong to the current stepper, excluding ones from nested steppers. */
  readonly steps: QueryList<KalStepComponent> = new QueryList<KalStepComponent>();

  ngAfterContentInit() {
    super.ngAfterContentInit();
    // Mark the component for change detection whenever the content children query changes
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
  }
}
