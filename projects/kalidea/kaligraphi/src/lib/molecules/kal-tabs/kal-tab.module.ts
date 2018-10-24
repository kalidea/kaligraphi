import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

import { KalTabComponent } from './kal-tab/kal-tab.component';
import { KalTabGroupComponent } from './kal-tab-group/kal-tab-group.component';
import { KalTabHeaderComponent } from './kal-tab-header/kal-tab-header.component';
import { KalTabBodyComponent } from './kal-tab-body/kal-tab-body.component';

export * from './kal-tab/kal-tab.component';
export * from './kal-tab-group/kal-tab-group.component';
export * from './kal-tab-header/kal-tab-header.component';
export * from './kal-tab-body/kal-tab-body.component';

const exports = [
  KalTabGroupComponent,
  KalTabHeaderComponent,
  KalTabBodyComponent,
  KalTabComponent
];

@NgModule({
  imports: [
    CommonModule,
    PortalModule
  ],
  exports: exports,
  declarations: exports
})
export class KalTabModule { }
