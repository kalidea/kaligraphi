import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

import { KalTooltipContentDirective } from './kal-tooltip-content.directive';
import { KalTooltipComponent, KalTooltipDirective } from './kal-tooltip.directive';
import { KalUtilityModule } from '../../99-utility/kal-utility.module';

export * from './kal-tooltip.directive';
export * from './kal-tooltip-content.directive';

const exports = [
  KalTooltipComponent,
  KalTooltipDirective,
  KalTooltipContentDirective
];

@NgModule({
  declarations: exports,
  exports,
  imports: [
    CommonModule,
    PortalModule,
    KalUtilityModule
  ]
})
export class KalTooltipModule {
}
