import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

// Accordion
import { KalAccordionComponent } from './kal-accordion.component';
// Panel
import { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
// Panel : Header
import { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
// Panel : Content
import { KalExpansionPanelContentComponent } from './kal-expansion-panel-content/kal-expansion-panel-content.component';
// Panel : Action Row
import { KalActionRowComponent } from './kal-action-row/kal-action-row.component';

export { KalAccordionComponent } from './kal-accordion.component';
export { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
export { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
export { KalExpansionPanelContentComponent } from './kal-expansion-panel-content/kal-expansion-panel-content.component';
export { KalActionRowComponent } from './kal-action-row/kal-action-row.component';

const exports = [
  KalAccordionComponent,
  KalExpansionPanelComponent,
  KalExpansionPanelHeaderComponent,
  KalExpansionPanelContentComponent,
  KalActionRowComponent
];
@NgModule({
  imports: [
    CommonModule,
    CdkAccordionModule
  ],
  exports: exports,
  declarations: exports
})
export class KalAccordionModule {
}
