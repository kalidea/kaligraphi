import { Inject, NgModule, Optional } from '@angular/core';
import { KAL_DATE_GLOBAL_OPTIONS, KalDateOptions } from './kal-date';

@NgModule()
export class KalDateModule {
  static kalDateOptions: KalDateOptions = {};

  constructor(@Optional() @Inject(KAL_DATE_GLOBAL_OPTIONS) kalDateOptions: KalDateOptions) {
    // trick to use injected options in decorators
    KalDateModule.kalDateOptions = kalDateOptions;
  }
}
