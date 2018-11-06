import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { KalInputModule } from '../../atoms/kal-input/kal-input.module';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';

import { KalDatepickerComponent } from './kal-datepicker.component';
import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
import { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerMultiViewComponent } from './kal-datepicker-multi-view/kal-datepicker-multi-view.component';

export { KalDatepickerComponent } from './kal-datepicker.component';
export { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
export { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
export { KalDatepickerMultiViewComponent } from './kal-datepicker-multi-view/kal-datepicker-multi-view.component';

export interface KalDatepickerModuleConfig {
  parseFormat: string;
  displayFormat: string;
}

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
    KalIconModule
  ],
  exports: exports,
  declarations: exports
})
export class KalDatepickerModule {
  public static forRoot(datepickerModuleConfig: KalDatepickerModuleConfig): ModuleWithProviders {
    console.log('init', datepickerModuleConfig);

    // If there's no configuration, set a default one.
    datepickerModuleConfig = {
      parseFormat: datepickerModuleConfig && datepickerModuleConfig.parseFormat ? datepickerModuleConfig.parseFormat : 'dd/MM/yyyy',
      displayFormat: datepickerModuleConfig && datepickerModuleConfig.displayFormat ? datepickerModuleConfig.displayFormat : 'dd/MM/yyyy',
    };

    // User config get logged here
    console.log('after default', datepickerModuleConfig);
    return {
      ngModule: KalDatepickerModule,
      providers: [{provide: 'testConfig', useValue: datepickerModuleConfig}]
    };
  }
}
