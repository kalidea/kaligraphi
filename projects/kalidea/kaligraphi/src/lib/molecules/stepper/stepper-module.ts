/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatStepHeader} from './step-header';
import {MatStepLabel} from './step-label';
import {MatHorizontalStepper, MatStep, MatStepper, MatVerticalStepper} from './stepper';

export * from './public-api';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    CdkStepperModule,
  ],
  exports: [
    MatHorizontalStepper,
    MatVerticalStepper,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepHeader,
  ],
  declarations: [
    MatHorizontalStepper,
    MatVerticalStepper,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepHeader,
  ]
})
export class MatStepperModule {}
