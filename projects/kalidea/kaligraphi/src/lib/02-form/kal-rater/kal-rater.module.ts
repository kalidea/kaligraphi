import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';

import { KalRaterComponent } from './kal-rater.component';
export { KalRaterComponent } from './kal-rater.component';

const exports = [
  KalRaterComponent
];

@NgModule({
  imports: [
    CommonModule,
    KalIconModule
  ],
  exports: exports,
  declarations: exports
})
export class KalRaterModule { }
