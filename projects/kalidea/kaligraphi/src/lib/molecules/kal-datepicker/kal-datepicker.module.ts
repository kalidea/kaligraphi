import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { KalInputModule } from '../../atoms/kal-input/kal-input.module';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';

import { KalDatepickerComponent } from './kal-datepicker.component';
export { KalDatepickerComponent } from './kal-datepicker.component';

import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
export { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';

import { KalDatepickerMonthViewComponent } from './kal-datepicker-month-view/kal-datepicker-month-view.component';
export { KalDatepickerMonthViewComponent } from './kal-datepicker-month-view/kal-datepicker-month-view.component';

const exports = [
  KalDatepickerComponent,
  KalDatepickerHeaderComponent,
  KalDatepickerMonthViewComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    ReactiveFormsModule,
    KalInputModule,
    KalIconModule
  ],
  exports: exports,
  declarations: exports
})
export class KalDatepickerModule {
}
