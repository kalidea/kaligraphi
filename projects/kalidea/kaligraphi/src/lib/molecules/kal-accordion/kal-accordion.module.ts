import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
// Panel
import { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
export { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';

// Panel : Header
import { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
export { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
// Panel : Action Row
import { KalActionRowComponent } from './kal-action-row/kal-action-row.component';
export { KalActionRowComponent } from './kal-action-row/kal-action-row.component';

const exports = [
  KalExpansionPanelComponent,
  KalExpansionPanelHeaderComponent,
  KalActionRowComponent
];
@NgModule({
  imports: [
    CommonModule,
  ],
  exports: exports,
  declarations: exports
})
export class KalAccordionModule {
}
