import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KalInputComponent } from './kal-input.component';
export * from './kal-input.component';

const exports = [
  KalInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: exports,
  declarations: exports
})
export class KalInputModule { }
