import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { FormRoutingModule } from 'src/app/02-form/form-routing.module';
import { AutocompleteComponent } from 'src/app/02-form/autocomplete/autocomplete.component';
import { ButtonComponent } from 'src/app/02-form/button/button.component';
import { CheckboxComponent } from 'src/app/02-form/checkbox/checkbox.component';
import { DatepickerComponent } from 'src/app/02-form/datepicker/datepicker.component';
import { FormFieldComponent } from 'src/app/02-form/form-field/form-field.component';
import { InputComponent } from 'src/app/02-form/input/input.component';
import { ProgressBarComponent } from 'src/app/02-form/progress-bar/progress-bar.component';
import { RadioComponent } from 'src/app/02-form/radio/radio.component';
import { RaterComponent } from 'src/app/02-form/rater/rater.component';
import { SelectComponent } from 'src/app/02-form/select/select.component';
import { SliderComponent } from 'src/app/02-form/slider/slider.component';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormRoutingModule,
    KaligraphiModule,
  ],
  declarations: [
    AutocompleteComponent,
    ButtonComponent,
    CheckboxComponent,
    DatepickerComponent,
    FormFieldComponent,
    InputComponent,
    ProgressBarComponent,
    RadioComponent,
    RaterComponent,
    SelectComponent,
    SliderComponent,
    TextareaComponent
  ]
})
export class FormModule { }
