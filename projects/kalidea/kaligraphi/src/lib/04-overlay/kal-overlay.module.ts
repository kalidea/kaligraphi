import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalDialogModule } from './kal-dialog/kal-dialog.module';
import { KalDragDropModule } from './kal-drag-drop/kal-drag-drop.module';
import { KalLoaderModule } from './kal-loader/kal-loader.module';
import { KalMenuModule } from './kal-menu/kal-menu.module';
import { KalSnackbarModule } from './kal-snackbar/kal-snackbar.module';
import { KalTooltipModule } from './kal-tooltip/kal-tooltip.module';

export * from './kal-dialog/kal-dialog.module';
export * from './kal-drag-drop/kal-drag-drop.module';
export * from './kal-loader/kal-loader.module';
export * from './kal-menu/kal-menu.module';
export * from './kal-snackbar/kal-snackbar.module';
export * from './kal-tooltip/kal-tooltip.module';

const exports = [
  KalDialogModule,
  KalDragDropModule,
  KalLoaderModule,
  KalMenuModule,
  KalSnackbarModule,
  KalTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports,
  declarations: [],
})
export class KalOverlayModule {
}
