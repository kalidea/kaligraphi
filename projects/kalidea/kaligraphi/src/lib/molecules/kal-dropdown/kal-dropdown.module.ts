import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { KalDropdownDirective } from './kal-dropdown.directive';
export * from './kal-dropdown.directive';

const exports = [
  KalDropdownDirective
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule
  ],
  exports,
  declarations: exports
})
export class KalDropdownModule { }
