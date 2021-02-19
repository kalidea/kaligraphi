import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KalCheckboxModule } from '../kal-checkbox/kal-checkbox.module';

import { KalOptionComponent } from './kal-option.component';
import { KalOptionGroupComponent } from './kal-option-group/kal-option-group.component';

export * from './kal-option.component';
export * from './kal-option-group/kal-option-group.component';

const exports = [
  KalOptionComponent,
  KalOptionGroupComponent
];

@NgModule({
  imports: [
    CommonModule,
    KalCheckboxModule,
    ReactiveFormsModule
  ],
  exports,
  declarations: exports
})
export class KalOptionModule { }
