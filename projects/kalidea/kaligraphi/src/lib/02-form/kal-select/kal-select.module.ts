import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';

import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';
import { KalSelectComponent } from './kal-select.component';
import { KalSelectTriggerValueDirective } from './kal-select-trigger-value.directive';
import { KalUtilityModule } from '../../99-utility/kal-utility.module';
import { KalInputModule } from '../../02-form/kal-input/kal-input.module';

export * from './kal-select.component';
export * from './kal-select-trigger-value.directive';

const exports = [
  KalSelectComponent,
  KalSelectTriggerValueDirective
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    KalIconModule,
    ReactiveFormsModule,
    KalInputModule,
    KalUtilityModule
  ],
  exports,
  declarations: exports
})
export class KalSelectModule { }
