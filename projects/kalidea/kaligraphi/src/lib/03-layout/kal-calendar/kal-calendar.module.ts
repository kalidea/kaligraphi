import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';

// KalUtilityModule is used for ``KalAutoFocusDirective`
import { KalUtilityModule } from '../../99-utility/kal-utility.module';
import { KalDateModule } from '../../99-utility/kal-date/kal-date.module';

// local import
import { KalCalendarHeaderComponent } from './kal-calendar-header/kal-calendar-header.component';
import { KalCalendarMonthComponent } from './kal-calendar-month/kal-calendar-month.component';
import { KalCalendarMultiViewComponent } from './kal-calendar-multi-view/kal-calendar-multi-view.component';
import { KalCalendarComponent } from './kal-calendar.component';

////// EXPORTS ////
export * from './kal-calendar-header/kal-calendar-header.component';
export * from './kal-calendar-month/kal-calendar-month.component';
export * from './kal-calendar-multi-view/kal-calendar-multi-view.component';
export * from './kal-calendar.component';

const exports = [
  KalCalendarComponent,
  KalCalendarMonthComponent,
  KalCalendarHeaderComponent,
  KalCalendarMultiViewComponent
];

@NgModule({
  imports: [
    CommonModule,
    KalIconModule,
    KalUtilityModule,
    KalDateModule
  ],
  exports,
  declarations: [
    ...exports,
  ]
})
export class KalCalendarModule {
}
