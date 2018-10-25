import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren, ElementRef, Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { takeUntil } from 'rxjs/operators';

import { KalStepComponent } from './kal-step/kal-step.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'mat-step-header',
  templateUrl: 'step-header.html',
  styleUrls: ['step-header.css'],
  host: {
    'class': 'mat-step-header',
    'role': 'tab',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatStepHeader implements OnDestroy {
  private _intlSubscription: Subscription;

  /** State of the given step. */
  @Input() state: string;

  /** Index of the given step. */
  @Input() index: number;

  /** Whether the given step is selected. */
  @Input() selected: boolean;

  /** Whether the given step label is active. */
  @Input() active: boolean;

  /** Whether the given step is optional. */
  @Input() optional: boolean;

  constructor(
    private _element: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy() {
  }

  /** Returns string label of given step if it is a text label. */
  _stringLabel() {
  }

  /** Returns MatStepLabel if the label of given step is a template label. */
  _templateLabel() {
  }

  /** Returns the host HTML element. */
  _getHostElement() {
    return this._element.nativeElement;
  }


  focus() {
    this._getHostElement().focus();
  }
}


@Component({
  selector: 'kal-stepper',
  templateUrl: './kal-stepper.component.html',
  styleUrls: ['./kal-stepper.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalStepperComponent extends CdkStepper implements AfterContentInit {

  /** Steps that the stepper holds. */
  @ContentChildren(KalStepComponent) _steps: QueryList<KalStepComponent>;

  @ContentChildren(MatStepHeader) _stepHeader: QueryList<MatStepHeader>;

  ngAfterContentInit(): void {
    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());
  }


}


/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

