import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { AtomsRoutingModule } from 'src/app/atoms/atoms-routing.module';
import { InputComponent } from 'src/app/atoms/input/input.component';
import { SelectComponent } from './select/select.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [
    CommonModule,
    AtomsRoutingModule,
    KaligraphiModule
  ],
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    IconComponent,
  ]
})
export class AtomsModule { }
