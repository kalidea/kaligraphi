import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { MoleculesRoutingModule } from 'src/app/molecules/molecules-routing.module';

import { TabPanelComponent } from 'src/app/molecules/tab-panel/tab-panel.component';
import { AccordionComponent } from 'src/app/molecules/accordion/accordion.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesRoutingModule,
    KaligraphiModule
  ],
  declarations: [
    TabPanelComponent,
    AccordionComponent
  ]
})
export class MoleculesModule { }
