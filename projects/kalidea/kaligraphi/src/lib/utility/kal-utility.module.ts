import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalClickOutsideModule } from './directives/kal-click-outside/kal-click-outside.module';
import { KalAutofocusModule } from './directives/kal-autofocus/kal-autofocus.module';

const exports = [
  KalClickOutsideModule,
  KalAutofocusModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KalUtilityModule {
}
