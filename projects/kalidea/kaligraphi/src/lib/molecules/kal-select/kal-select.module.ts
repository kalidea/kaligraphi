import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { KalSelectComponent } from './kal-select.component';

import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';
import { KalUtilityModule } from '../../utility/kal-utility.module';

export * from './kal-select.component';

const exports = [
  KalSelectComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    KalIconModule,
    KalUtilityModule
  ],
  exports: exports,
  declarations: exports
})
export class KalSelectModule { }
