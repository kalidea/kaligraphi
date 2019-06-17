import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// directives
import { KalClickOutsideDirective } from './directives/kal-click-outside/kal-click-outside.directive';
import { KalAutofocusDirective } from './directives/kal-autofocus/kal-autofocus.directive';
import { KalThemeDirective } from './directives/kal-theme/kal-theme.directive';
import { KalOverlayService } from './services/kal-overlay.service';

export * from './directives/kal-click-outside/kal-click-outside.directive';
export * from './directives/kal-autofocus/kal-autofocus.directive';
export * from './directives/kal-theme/kal-theme.directive';

const exports = [
  KalClickOutsideDirective,
  KalAutofocusDirective,
  KalThemeDirective,
];

const providers = [
  KalOverlayService,
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports,
  providers
})
export class KalUtilityModule {
}
