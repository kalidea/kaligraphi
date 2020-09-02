import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { TextareaComponent } from 'src/app/02-form/textarea/textarea.component';
import { CalendarComponent } from 'src/app/02-form/month-calendar/calendar.component';

const routes: Routes = [
  {path: 'autocomplete', component: AutocompleteComponent},
  {path: 'button', component: ButtonComponent},
  {path: 'checkbox', component: CheckboxComponent},
  {path: 'datepicker', component: DatepickerComponent},
  {path: 'form-field', component: FormFieldComponent},
  {path: 'input', component: InputComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'progress-bar', component: ProgressBarComponent},
  {path: 'radio', component: RadioComponent},
  {path: 'rater', component: RaterComponent},
  {path: 'select', component: SelectComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'textarea', component: TextareaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {
}
