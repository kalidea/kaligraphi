import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: 'tabPanel', component: TabPanelComponent},
  {path: 'list', component: ListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculesRoutingModule {
}
