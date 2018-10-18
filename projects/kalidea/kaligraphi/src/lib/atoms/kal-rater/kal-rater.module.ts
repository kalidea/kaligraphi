import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalRaterComponent } from './kal-rater.component';
import { KalIconModule } from 'src/lib/atoms/kal-icon/kal-icon.module';
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
