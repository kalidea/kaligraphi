import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { ReactiveFormsModule } from '@angular/forms';

import { AtomsRoutingModule } from 'src/app/atoms/atoms-routing.module';
import { InputComponent } from 'src/app/atoms/input/input.component';
import { SelectComponent } from 'src/app/atoms/select/select.component';
import { CheckboxComponent } from 'src/app/atoms/checkbox/checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    AtomsRoutingModule,
    KaligraphiModule,
    ReactiveFormsModule
  ],
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent
  ]
})
export class AtomsModule { }
