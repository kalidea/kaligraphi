import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalOptionComponent } from './kal-option.component';

export * from './kal-option.component';

const exports = [
  KalOptionComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: exports,
  declarations: [KalOptionComponent]
})
export class KalOptionModule { }
