import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  KAL_FORM_FIELDS_GLOBAL_OPTIONS,
  KAL_INPUT_GLOBAL_OPTIONS,
  KalFormFieldOptions,
  KaligraphiModule,
  KalInputOptions
} from '@kalidea/kaligraphi';

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
import { TextareaComponent } from 'src/app/02-form/textarea/textarea.component';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { CalendarComponent } from 'src/app/02-form/calendar/calendar.component';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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
    TextareaComponent,
    CalendarComponent
  ],
  providers: [
    {
      provide: KAL_FORM_FIELDS_GLOBAL_OPTIONS,
      useValue: {
        showError: true,
        showErrorAtDisplay: true,
        errors: {
          'email': 'email "{value}" is not an email',
          'maxlength': '{value} length {actualLength} exceed maximal {requiredLength}'
        }
      } as KalFormFieldOptions
    },
    {
      provide: KAL_INPUT_GLOBAL_OPTIONS,
      useValue: {
        clearable: false
      } as KalInputOptions
    }
  ],
})
export class FormModule {
}
