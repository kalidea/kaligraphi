import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalAutofocusDirective } from './kal-autofocus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KalAutofocusDirective
  ],
  exports: [
    KalAutofocusDirective
  ]
})
export class KalAutofocusModule {
}
