import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';

import { KalInputComponent } from './kal-input.component';

export * from './kal-input.component';
export * from './kal-formater.service';

const exports = [
  KalInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KalIconModule
  ],
  exports: exports,
  declarations: exports
})
export class KalInputModule { }
