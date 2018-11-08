import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClickOutsideDirective
  ],
  exports: [
    ClickOutsideDirective
  ]
})
export class ClickOutsideModule {
}
