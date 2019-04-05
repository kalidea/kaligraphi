import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { KalDialogContainerComponent } from './kal-dialog-container.component';
import { KalDialogCloseDirective } from './directives/kal-dialog-close.directive';
import { KalDialogContentDirective } from './directives/kal-dialog-content.directive';
import { KalDialogHeaderDirective } from './directives/kal-dialog-header.directive';
import { KalDialogFooterDirective } from './directives/kal-dialog-footer.directive';
import { KalIconModule } from '../../01-typography/kal-icon/kal-icon.module';


export * from './kal-dialog-container.component';
export * from './directives/kal-dialog-close.directive';
export * from './directives/kal-dialog-content.directive';
export * from './directives/kal-dialog-header.directive';
export * from './directives/kal-dialog-footer.directive';
export * from './kal-dialog.injector';
export * from './kal-dialog.service';
export * from './kal-dialog-config';
export * from './kal-dialog-ref';

const exports = [
  KalDialogContainerComponent,
  KalDialogCloseDirective,
  KalDialogContentDirective,
  KalDialogHeaderDirective,
  KalDialogFooterDirective,
];

@NgModule({
  imports: [
    CommonModule,
    KalIconModule,
    OverlayModule,
    PortalModule
  ],
  entryComponents: [
    KalDialogContainerComponent,
  ],
  exports: [...exports, OverlayModule, PortalModule],
  declarations: exports
})
export class KalDialogModule { }
