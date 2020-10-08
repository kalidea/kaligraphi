import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { KalAccordionComponent } from './kal-accordion.component';
import { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
import { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
import { KalExpansionPanelContentComponent } from './kal-expansion-panel-content/kal-expansion-panel-content.component';
import { KalExpansionPanelFooterComponent } from './kal-expansion-panel-footer/kal-expansion-panel-footer.component';
import { KalActionRowComponent } from './kal-action-row/kal-action-row.component';

export * from './kal-accordion.component';
export * from './kal-expansion-panel/kal-expansion-panel.component';
export * from './kal-expansion-panel-header/kal-expansion-panel-header.component';
export * from './kal-expansion-panel-content/kal-expansion-panel-content.component';
export * from './kal-expansion-panel-footer/kal-expansion-panel-footer.component';
export * from './kal-action-row/kal-action-row.component';


const exports = [
  KalAccordionComponent,
  KalExpansionPanelComponent,
  KalExpansionPanelHeaderComponent,
  KalExpansionPanelContentComponent,
  KalExpansionPanelFooterComponent,
  KalActionRowComponent
];
@NgModule({
  imports: [
    CommonModule,
    CdkAccordionModule
  ],
  exports,
  declarations: exports
})
export class KalAccordionModule {
}
