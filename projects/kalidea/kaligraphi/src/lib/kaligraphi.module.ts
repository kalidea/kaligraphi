import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalAtomsModule } from 'atoms/kal-atoms.module';
import { KalMoleculesModule } from 'molecules/kal-molecules.module';

export * from './atoms/kal-atoms.module';
export * from './molecules/kal-molecules.module';
export * from './organisms/kal-organisms.module';

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
export class KaligraphiModule { }
