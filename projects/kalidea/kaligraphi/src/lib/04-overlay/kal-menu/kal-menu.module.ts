import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { KalMenuTriggerForDirective } from './kal-menu-trigger-for.directive';
import { KalMenuComponent } from './kal-menu.component';
import { KalOptionModule } from '../../02-form/kal-option/kal-option.module';
import { KalUtilityModule } from '../../99-utility/kal-utility.module';

export * from './kal-menu-trigger-for.directive';
export * from './kal-menu.component';

const exports = [
  KalMenuTriggerForDirective,
  KalMenuComponent,
];

@NgModule({
  declarations: exports,
  exports,
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    KalOptionModule,
    KalUtilityModule
  ]
})
export class KalMenuModule {
}
