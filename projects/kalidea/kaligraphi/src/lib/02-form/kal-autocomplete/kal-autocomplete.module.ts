import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { KalAutocompleteDirective } from './kal-autocomplete.directive';
import { KalAutocompleteComponent } from './kal-autocomplete.component';
import { KalOptionModule } from '../kal-option/kal-option.module';
import { KalUtilityModule } from '../../99-utility/kal-utility.module';

export * from './kal-autocomplete.directive';
export * from './kal-autocomplete.component';
export * from './kal-autocomplete-option';

const exports = [
  KalAutocompleteDirective,
  KalAutocompleteComponent
];

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    KalOptionModule,
    KalUtilityModule
  ],
  declarations: exports,
  entryComponents: [
    KalAutocompleteComponent
  ],
  exports
})
export class KalAutocompleteModule {

}
