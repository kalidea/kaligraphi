import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { KalInputModule } from '../../atoms/kal-input/kal-input.module';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';

// datepicker
import { KalDatepickerComponent } from './kal-datepicker.component';
export { KalDatepickerComponent } from './kal-datepicker.component';

// datepicker header
import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
export { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';

// datepicker : month calendar
import { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
export { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';

// datepicker : multi view
import { KalDatepickerMultiViewComponent } from './kal-datepicker-multi-view/kal-datepicker-multi-view.component';
export { KalDatepickerMultiViewComponent } from './kal-datepicker-multi-view/kal-datepicker-multi-view.component';

// KalUtilityModule is used for ``KalAutoFocusDirective`
import { KalUtilityModule } from '../../utility/kal-utility.module';

export { KalDate } from './kal-date';

const exports = [
  KalDatepickerComponent,
  KalDatepickerHeaderComponent,
  KalMonthCalendarComponent,
  KalDatepickerMultiViewComponent
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
  exports: exports,
  declarations: exports
})
export class KalDatepickerModule {
}
