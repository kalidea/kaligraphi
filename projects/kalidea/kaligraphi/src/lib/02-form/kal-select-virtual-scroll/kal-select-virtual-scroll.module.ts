import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { KalSelectVirtualScrollComponent } from './kal-select-virtual-scroll.component';

const exports = [
  KalSelectVirtualScrollComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    OverlayModule,
    PortalModule
  ],
  exports : [...exports],
  declarations: [...exports]
})
export class KalSelectVirtualScrollModule { }
