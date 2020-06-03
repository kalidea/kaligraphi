import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';
import { KalSelectComponent } from './kal-select.component';
import { KalSelectPlaceholderDirective } from './kal-select-placeholder.directive';
import { KalUtilityModule } from '../../99-utility/kal-utility.module';

export * from './kal-select.component';
export * from './kal-select-placeholder.directive';

const exports = [
  KalSelectComponent,
  KalSelectPlaceholderDirective
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
