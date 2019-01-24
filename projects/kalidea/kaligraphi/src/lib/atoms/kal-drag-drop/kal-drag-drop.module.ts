import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalDropDirective } from './directives/kal-drop.directive';
import { KalDragDirective } from './directives/kal-drag.directive';

export * from './directives/kal-drop.directive';
export * from './directives/kal-drag.directive';
export * from './services/kal-drag.service';

const exports = [
  KalDropDirective,
  KalDragDirective
];

@NgModule({
  declarations: [
    ...exports
  ],
  imports: [
    CommonModule
  ],
  exports
})
export class KalDragDropModule {
}
