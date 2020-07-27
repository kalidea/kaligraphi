import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';

import { KalInputModule } from '../kal-input/kal-input.module';
import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';

import { KalDatepickerComponent } from './kal-datepicker.component';
import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
import { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerMultiViewComponent } from './kal-datepicker-multi-view/kal-datepicker-multi-view.component';
// KalUtilityModule is used for ``KalAutoFocusDirective`
import { KalUtilityModule } from '../../99-utility/kal-utility.module';

export * from './kal-datepicker.component';

export { KalDate } from './kal-date';

const exports = [
  KalDatepickerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    ReactiveFormsModule,
    KalInputModule,
    KalIconModule,
    KalUtilityModule
  ],
  exports,
  declarations: [
    ...exports,
    KalDatepickerHeaderComponent,
    KalMonthCalendarComponent,
    KalDatepickerMultiViewComponent
  ]
})
export class KalDatepickerModule {
}
