import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { MoleculesRoutingModule } from 'src/app/molecules/molecules-routing.module';

import { TabPanelComponent } from 'src/app/molecules/tab-panel/tab-panel.component';
import { DatepickerComponent } from 'src/app/molecules/datepicker/datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesRoutingModule,
    KaligraphiModule
  ],
  declarations: [
    TabPanelComponent,
    DatepickerComponent
  ]
})
export class MoleculesModule { }
