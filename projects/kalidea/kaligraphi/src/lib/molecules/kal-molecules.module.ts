import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalTextareaModule } from './kal-textarea/kal-textarea.module';
import { KalSelectModule } from './kal-select/kal-select.module';
import { KalTabModule } from './kal-tabs/kal-tab.module';
import { KalStepperModule } from './kal-stepper/kal-stepper.module';
import { KalButtonModule } from './kal-button/kal-button.module';
import { KalRaterModule } from './kal-rater/kal-rater.module';
import { KalAccordionModule } from './kal-accordion/kal-accordion.module';
import { KalMenuModule } from './kal-menu/kal-menu.module';
import { KalListModule } from './kal-list/kal-list.module';
import { KalDatepickerModule, KalDatepickerModuleConfig } from './kal-datepicker/kal-datepicker.module';

export * from './kal-textarea/kal-textarea.module';
export * from './kal-select/kal-select.module';
export * from './kal-tabs/kal-tab.module';
export * from './kal-stepper/kal-stepper.module';
export * from './kal-button/kal-button.module';
export * from './kal-rater/kal-rater.module';
export * from './kal-accordion/kal-accordion.module';
export * from './kal-menu/kal-menu.module';
export * from './kal-list/kal-list.module';
export * from './kal-datepicker/kal-datepicker.module';

export interface KalMoleculesModuleConfiguration {
  date: KalDatepickerModuleConfig;
}

const exports = [
  KalTextareaModule,
  KalSelectModule,
  KalTabModule,
  KalStepperModule,
  KalButtonModule,
  KalRaterModule,
  KalAccordionModule,
  KalMenuModule,
  KalListModule,
  KalDatepickerModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KalMoleculesModule {
  public static forRoot(moleculesModuleConfiguration?: KalMoleculesModuleConfiguration): ModuleWithProviders {

    KalDatepickerModule.forRoot({
      displayFormat: moleculesModuleConfiguration && moleculesModuleConfiguration.date ? moleculesModuleConfiguration.date.displayFormat : null,
      parseFormat: moleculesModuleConfiguration && moleculesModuleConfiguration.date ? moleculesModuleConfiguration.date.parseFormat : null
    });

    return {
      ngModule: KalMoleculesModule,
      providers: [{provide: 'moleculesModuleConfiguration', useValue: moleculesModuleConfiguration}]
    };
  }
}
