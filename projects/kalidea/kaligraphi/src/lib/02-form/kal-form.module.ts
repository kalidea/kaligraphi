import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { KalAutocompleteModule } from './kal-autocomplete/kal-autocomplete.module';
import { KalButtonModule } from './kal-button/kal-button.module';
import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalDatepickerModule } from './kal-datepicker/kal-datepicker.module';
import { KalFormFieldModule } from './kal-form-field/kal-form-field.module';
import { KalInputModule } from './kal-input/kal-input.module';
import { KalOptionModule } from './kal-option/kal-option.module';
import { KalProgressBarModule } from './kal-progress-bar/kal-progress-bar.module';
import { KalRadioModule } from './kal-radio/kal-radio.module';
import { KalRaterModule } from './kal-rater/kal-rater.module';
import { KalSelectModule } from './kal-select/kal-select.module';
import { KalSliderModule } from './kal-slider/kal-slider.module';
import { KalTextareaModule } from './kal-textarea/kal-textarea.module';

export * from './kal-autocomplete/kal-autocomplete.module';
export * from './kal-button/kal-button.module';
export * from './kal-checkbox/kal-checkbox.module';
export * from './kal-datepicker/kal-datepicker.module';
export * from './kal-form-field/kal-form-field.module';
export * from './kal-input/kal-input.module';
export * from './kal-option/kal-option.module';
export * from './kal-progress-bar/kal-progress-bar.module';
export * from './kal-radio/kal-radio.module';
export * from './kal-rater/kal-rater.module';
export * from './kal-select/kal-select.module';
export * from './kal-slider/kal-slider.module';
export * from './kal-textarea/kal-textarea.module';

const exports = [
  KalAutocompleteModule,
  KalButtonModule,
  KalCheckboxModule,
  KalDatepickerModule,
  KalFormFieldModule,
  KalInputModule,
  KalOptionModule,
  KalProgressBarModule,
  KalRadioModule,
  KalRaterModule,
  KalSelectModule,
  KalSliderModule,
  KalTextareaModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: [],
})
export class KalFormModule {
}
