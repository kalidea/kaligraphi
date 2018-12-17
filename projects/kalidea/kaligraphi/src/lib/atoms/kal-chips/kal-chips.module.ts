import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalChipsComponent } from './kal-chips.component';
import { KalIconModule } from '../kal-icon/kal-icon.module';

export * from './kal-chips.component';

const exports = [
  KalChipsComponent
];

@NgModule({
  declarations: exports,
  imports: [
    CommonModule,
    KalIconModule
  ],
  exports
})
export class KalChipsModule { }
