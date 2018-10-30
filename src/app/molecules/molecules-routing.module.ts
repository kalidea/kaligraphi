import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { AccordionComponent } from './accordion/accordion.component';

const routes: Routes = [
  {path: 'tabPanel', component: TabPanelComponent},
  {path: 'accordion', component: AccordionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculesRoutingModule {
}
