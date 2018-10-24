import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
// Panel
import { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
export { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
const exports = [
  KalExpansionPanelComponent,
];
@NgModule({
  imports: [
  ],
  exports: exports,
  declarations: exports
})
export class KalAccordionModule {
}
