import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { MoleculesRoutingModule } from 'src/app/molecules/molecules-routing.module';

import { TabPanelComponent } from 'src/app/molecules/tab-panel/tab-panel.component';
import { StepperComponent } from 'src/app/molecules/stepper/stepper.component';
import { AccordionComponent } from 'src/app/molecules/accordion/accordion.component';
import { ListComponent } from 'src/app/molecules/list/list.component';
import { MenuComponent } from 'src/app/molecules/menu/menu.component';
import { FormFieldComponent } from 'src/app/molecules/form-field/form-field.component';
import { DialogComponent } from 'src/app/molecules/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MoleculesRoutingModule,
    KaligraphiModule,
  ],
  declarations: [
    TabPanelComponent,
    StepperComponent,
    AccordionComponent,
    ListComponent,
    MenuComponent,
    FormFieldComponent,
    DialogComponent,

  ],
})
export class MoleculesModule { }
