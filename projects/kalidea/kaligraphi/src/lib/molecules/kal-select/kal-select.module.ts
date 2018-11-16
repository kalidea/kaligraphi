import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';
import { KalSelectComponent } from './kal-select.component';

export * from './kal-select.component';

const exports = [
  KalSelectComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    KalIconModule
  ],
  exports: exports,
  declarations: exports
})
export class KalSelectModule { }
