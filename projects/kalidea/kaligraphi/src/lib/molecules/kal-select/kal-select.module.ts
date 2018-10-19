import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { KalSelectComponent } from './kal-select.component';

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
