import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalIconComponent } from './kal-icon.component';

export { KalIconComponent } from './kal-icon.component';

const exports = [
  KalIconComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: exports
})
export class KalIconModule { }
