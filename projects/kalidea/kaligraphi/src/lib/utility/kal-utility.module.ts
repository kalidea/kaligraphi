import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// directives
import { KalClickOutsideDirective } from './directives/kal-click-outside/kal-click-outside.directive';
import { KalAutofocusDirective } from './directives/kal-autofocus/kal-autofocus.directive';
import { KalThemeDirective } from './directives/kal-theme/kal-theme.directive';
import { KalVirtualScrollDirective } from './directives/kal-virtual-scroll/kal-virtual-scroll.directive';

const exports = [
  KalClickOutsideDirective,
  KalAutofocusDirective,
  KalThemeDirective,
  KalVirtualScrollDirective
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
