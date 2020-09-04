import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { KalAutocompleteDirective } from './kal-autocomplete.directive';
import { KalAutocompleteComponent } from './kal-autocomplete.component';
import { KalOptionModule } from '../kal-option/kal-option.module';
import { KalUtilityModule } from '../../99-utility/kal-utility.module';
import { KalLoaderModule } from '../../04-overlay/kal-loader/kal-loader.module';

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
    KalUtilityModule,
    KalLoaderModule,
  ],
  declarations: exports,
  exports
})
export class KalAutocompleteModule {

}
