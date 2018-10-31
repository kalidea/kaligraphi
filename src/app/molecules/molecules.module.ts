import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { TabPanelComponent } from 'src/app/molecules/tab-panel/tab-panel.component';
import { StepperComponent } from 'src/app/molecules/stepper/stepper.component';

import { MoleculesRoutingModule } from 'src/app/molecules/molecules-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesRoutingModule,
    KaligraphiModule
  ],
  declarations: [
    TabPanelComponent,
    StepperComponent
  ]
})
export class MoleculesModule { }
