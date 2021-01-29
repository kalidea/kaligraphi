import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// directives
import { KalClickOutsideDirective } from './directives/kal-click-outside/kal-click-outside.directive';
import { KalAutofocusDirective } from './directives/kal-autofocus/kal-autofocus.directive';
import { KalThemeDirective } from './directives/kal-theme/kal-theme.directive';

export * from './directives/kal-click-outside/kal-click-outside.directive';
export * from './directives/kal-autofocus/kal-autofocus.directive';
export * from './directives/kal-theme/kal-theme.directive';
export * from './kal-date/kal-date';
export * from './kal-date/kal-date.service';

const exports = [
  KalClickOutsideDirective,
  KalAutofocusDirective,
  KalThemeDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports,
  declarations: exports
})
export class KalUtilityModule {
}
