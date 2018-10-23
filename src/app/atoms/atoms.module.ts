import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { AtomsRoutingModule } from 'src/app/atoms/atoms-routing.module';
import { InputComponent } from 'src/app/atoms/input/input.component';
import { SelectComponent } from './select/select.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IconComponent } from './icon/icon.component';
import { RaterComponent } from './rater/rater.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AtomsRoutingModule,
    KaligraphiModule
  ],
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    IconComponent,
    RaterComponent,
  ]
})
export class AtomsModule { }
