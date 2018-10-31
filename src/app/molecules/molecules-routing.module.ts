import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPanelComponent } from 'src/app/molecules/tab-panel/tab-panel.component';
import { StepperComponent } from 'src/app/molecules/stepper/stepper.component';

const routes: Routes = [
  {path: 'tab-panel', component: TabPanelComponent},
  {path: 'stepper', component: StepperComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculesRoutingModule {
}
