import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalAtomsModule } from './atoms/kal-atoms.module';
import { KalMoleculesModule } from './molecules/kal-molecules.module';
import { FormElementComponent } from './utils/index';

export * from './atoms/kal-atoms.module';
export * from './molecules/kal-molecules.module';
export * from './organisms/kal-organisms.module';
export * from './utils/index';

const exports = [
  KalAtomsModule,
  KalMoleculesModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: [...exports, FormElementComponent],
  declarations: [FormElementComponent]
})
export class KaligraphiModule { }
