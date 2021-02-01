import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { KalDateModule } from '../../99-utility/kal-date/kal-date.module';

import { KalInputModule } from '../kal-input/kal-input.module';
import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';
import { KalCalendarModule } from '../../03-layout/kal-calendar/kal-calendar.module';

// KalUtilityModule is used for ``KalAutoFocusDirective`
import { KalUtilityModule } from '../../99-utility/kal-utility.module';

// local import
import { KalDatepickerComponent } from './kal-datepicker.component';

export * from './kal-datepicker.component';

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
    KalUtilityModule,
    KalCalendarModule,
  ],
  exports,
  declarations: [
    ...exports,
  ]
})
export class KalDatepickerModule {
}
