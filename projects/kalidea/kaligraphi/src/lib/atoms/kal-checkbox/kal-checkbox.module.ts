import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalCheckboxComponent } from './kal-checkbox.component';
export { KalCheckboxComponent } from './kal-checkbox.component';

const exports = [
  KalCheckboxComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalCheckboxModule {
}
