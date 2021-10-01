import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

import { KalTabComponent } from './kal-tab/kal-tab.component';
import { KalTabGroupComponent } from './kal-tab-group/kal-tab-group.component';
import { KalTabHeaderComponent } from './kal-tab-header/kal-tab-header.component';
import { KalTabBodyComponent } from './kal-tab-body/kal-tab-body.component';
import { KalTabLabelDirective } from './kal-tab-label.directive';
import { KalTabContentDirective } from './kal-tab-content.directive';
import {CdkScrollableModule} from '@angular/cdk/scrolling';

export * from './kal-tab/kal-tab.component';
export * from './kal-tab-change';
export * from './kal-tab-group/kal-tab-group.component';
export * from './kal-tab-label.directive';
export * from './kal-tab-content.directive';

const exports = [
  KalTabGroupComponent,
  KalTabComponent,
  KalTabLabelDirective,
  KalTabContentDirective
];

@NgModule({
    imports: [
        CommonModule,
        PortalModule,
        CdkScrollableModule,
    ],
  exports,
  declarations: [
    ...exports,
    KalTabHeaderComponent,
    KalTabBodyComponent,
    KalTabContentDirective
  ]
})
export class KalTabModule {
}
