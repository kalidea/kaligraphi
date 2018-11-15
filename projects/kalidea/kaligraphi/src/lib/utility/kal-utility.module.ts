import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// directives
import { KalClickOutsideDirective } from './directives/kal-click-outside/kal-click-outside.directive';
import { KalAutofocusDirective } from './directives/kal-autofocus/kal-autofocus.directive';
import { KalThemeDirective } from './directives/kal-theme/kal-theme.directive';

const exports = [
  KalClickOutsideDirective,
  KalAutofocusDirective,
  KalThemeDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalUtilityModule {
}
