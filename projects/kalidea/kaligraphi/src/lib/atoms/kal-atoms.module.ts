import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalInputModule } from './kal-input/kal-input.module';
import { KalTextareaModule } from './kal-textarea/kal-textarea.module';
import { KalCheckboxModule } from './kal-checkbox/kal-checkbox.module';
import { KalRadioModule } from './kal-radio/kal-radio.module';
import { KalOptionModule } from './kal-option/kal-option.module';
import { KalIconModule } from './kal-icon/kal-icon.module';
import { KalProgressBarModule } from './kal-progress-bar/kal-progress-bar.module';
import { KalSliderModule } from './kal-slider/kal-slider.module';
import { KalMenuModule } from './kal-menu/kal-menu.module';
import { KalCardModule } from './kal-card/kal-card.module';
import { KalSnackbarModule } from './kal-snackbar/kal-snackbar.module';
import { KalTreeModule } from './kal-tree/kal-tree.module';
import { KalDragDropModule } from './kal-drag-drop/kal-drag-drop.module';
import { KalChipModule } from './kal-chip/kal-chip.module';
import { KalLoaderModule } from './kal-loader/kal-loader.module';
import { KalCarouselModule } from './kal-carousel/kal-carousel.module';
import { KalAutocompleteModule } from './kal-autocomplete/kal-autocomplete.module';
import { KalTooltipModule } from './kal-tooltip/kal-tooltip.module';


export * from './kal-input/kal-input.module';
export * from './kal-textarea/kal-textarea.module';
export * from './kal-checkbox/kal-checkbox.module';
export * from './kal-radio/kal-radio.module';
export * from './kal-icon/kal-icon.module';
export * from './kal-progress-bar/kal-progress-bar.module';
export * from './kal-slider/kal-slider.module';
export * from './kal-option/kal-option.module';
export * from './kal-menu/kal-menu.module';
export * from './kal-snackbar/kal-snackbar.module';
export * from './kal-card/kal-card.module';
export * from './kal-tree/kal-tree.module';
export * from './kal-drag-drop/kal-drag-drop.module';
export * from './kal-chip/kal-chip.module';
export * from './kal-loader/kal-loader.component';
export * from './kal-carousel/kal-carousel.module';
export * from './kal-autocomplete/kal-autocomplete.module';
export * from './kal-tooltip/kal-tooltip.module';

const exports = [
  KalInputModule,
  KalTextareaModule,
  KalCheckboxModule,
  KalRadioModule,
  KalIconModule,
  KalProgressBarModule,
  KalSliderModule,
  KalOptionModule,
  KalMenuModule,
  KalCardModule,
  KalSnackbarModule,
  KalTreeModule,
  KalDragDropModule,
  KalChipModule,
  KalLoaderModule,
  KalCarouselModule,
  KalLoaderModule,
  KalAutocompleteModule,
  KalTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports: exports,
  declarations: [],
})
export class KalAtomsModule {
}
