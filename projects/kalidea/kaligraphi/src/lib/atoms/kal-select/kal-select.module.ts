import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalSelectComponent } from './kal-select.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

export * from './kal-select.component';

const exports = [
  KalSelectComponent,
  OverlayModule
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
  ],
  exports: exports,
  declarations: [KalSelectComponent]
})
export class KalSelectModule { }
