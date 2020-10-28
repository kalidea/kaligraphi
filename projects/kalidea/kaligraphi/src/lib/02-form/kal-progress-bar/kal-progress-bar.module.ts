import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {KalProgressBarComponent} from './kal-progress-bar.component';
export {KalProgressBarComponent} from './kal-progress-bar.component';

const exports = [
  KalProgressBarComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports,
  declarations: exports
})
export class KalProgressBarModule {
}
