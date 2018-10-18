import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalInputModule } from './kal-input/kal-input.module';
import { KalIconComponent } from './kal-icon/kal-icon.component';

export * from './kal-input/kal-input.module';
export * from './kal-checkbox/kal-checkbox.module';
export * from './kal-icon/kal-icon.module';

const exports = [
  KalCheckboxModule,
  KalInputModule,
  KalIconComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KalAtomsModule {
}
