import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalAtomsModule } from './atoms/kal-atoms.module';
import { KalMoleculesModule, KalMoleculesModuleConfiguration } from './molecules/kal-molecules.module';

export * from './atoms/kal-atoms.module';
export * from './molecules/kal-molecules.module';
export * from './organisms/kal-organisms.module';
export * from './utils/index';

export interface KaligraphiModuleConfiguration {
  kalMoleculesModuleConfiguration: KalMoleculesModuleConfiguration;
}

const exports = [
  KalAtomsModule,
  KalMoleculesModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: []
})
export class KaligraphiModule {

  static forRoot(modulesConfiguration?: KaligraphiModuleConfiguration): ModuleWithProviders {
    console.log('KaligraphiModule', modulesConfiguration);

    KalMoleculesModule.forRoot({
      date: modulesConfiguration ? modulesConfiguration.kalMoleculesModuleConfiguration.date : null
    });

    return {
      ngModule: KaligraphiModule,
      providers: [{provide: 'modulesConfig', useValue: modulesConfiguration}]
    };
  }
}
