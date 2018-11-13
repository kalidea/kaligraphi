import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalClickOutsideDirective } from './kal-click-outside.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KalClickOutsideDirective
  ],
  exports: [
    KalClickOutsideDirective
  ]
})
export class KalClickOutsideModule {
}
