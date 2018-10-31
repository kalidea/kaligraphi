import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

const routes: Routes = [
  {path: 'tabPanel', component: TabPanelComponent},
  {path: 'datepicker', component: DatepickerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculesRoutingModule {
}
