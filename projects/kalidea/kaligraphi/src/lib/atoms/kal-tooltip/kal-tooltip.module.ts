import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalTooltipComponent, KalTooltipDirective } from './kal-tooltip.directive';

import { KalUtilityModule } from '../../utility/kal-utility.module';

export * from './kal-tooltip.directive';

const exports = [
  KalTooltipComponent,
  KalTooltipDirective,
];

@NgModule({
  declarations: exports,
  exports,
  imports: [
    CommonModule,
    KalUtilityModule
  ],
  entryComponents: [
    KalTooltipComponent
  ]
})
export class KalTooltipModule {
}
