import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
// Panel
import { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
export { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';

// Panel : Header
import { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
export { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
const exports = [
  KalExpansionPanelComponent,
  KalExpansionPanelHeaderComponent,
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
