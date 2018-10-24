import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { MoleculesRoutingModule } from 'src/app/molecules/molecules-routing.module';
import { AccordionComponent } from './accordion/accordion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MoleculesRoutingModule,
    KaligraphiModule
  ],
  declarations: [
    AccordionComponent
  ]
})
export class MoleculesModule {
}
