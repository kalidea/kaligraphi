import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { KalSnackbarComponent } from './kal-snackbar.component';

export * from './kal-snackbar-config';
export * from './kal-snackbar.injector';
export * from './kal-snackbar.component';
export * from './kal-snackbar.service';

const exports = [
  KalSnackbarComponent
];

@NgModule({
  declarations: exports,
  exports: [...exports, OverlayModule, PortalModule],
  imports: [
    CommonModule
  ],
  entryComponents: [
    KalSnackbarComponent
  ]
})
export class KalSnackbarModule {
}
