import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalAutocompleteDirective } from './kal-autocomplete.directive';
import { KalAutocompleteComponent } from './kal-autocomplete.component';
import { KalOptionModule } from '../kal-option/kal-option.module';
import { KalUtilityModule } from '../../utility/kal-utility.module';

export * from './kal-autocomplete.directive';
export * from './kal-autocomplete.component';
export * from './kal-autocomplete-option';

const exports = [
  KalAutocompleteDirective,
  KalAutocompleteComponent
];

@NgModule({
  exports,
  declarations: exports,
  imports: [
    CommonModule,
    KalOptionModule,
    KalUtilityModule
  ],
  entryComponents: [
    KalAutocompleteComponent
  ]
})
export class KalAutocompleteModule {

}
