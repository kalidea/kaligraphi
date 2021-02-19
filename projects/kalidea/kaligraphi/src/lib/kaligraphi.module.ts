import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';

import { KalTypographyModule } from './01-typography/kal-typography.module';
import { KalFormModule } from './02-form/kal-form.module';
import { KalLayoutModule } from './03-layout/kal-layout.module';
import { KalOverlayModule } from './04-overlay/kal-overlay.module';
import { KalUtilityModule } from './99-utility/kal-utility.module';

export * from './01-typography/kal-typography.module';
export * from './02-form/kal-form.module';
export * from './03-layout/kal-layout.module';
export * from './04-overlay/kal-overlay.module';
export * from './99-utility/kal-utility.module';
export * from './utils/index';

const exports = [
  KalTypographyModule,
  KalFormModule,
  KalLayoutModule,
  KalOverlayModule,
  KalUtilityModule
];

@NgModule({
  imports: [
    CommonModule,
    HammerModule,
    ...exports
  ],
  exports,
  declarations: []
})
export class KaligraphiModule {
}
