import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from 'src/app/atoms/input/input.component';
import { SelectComponent } from 'src/app/atoms/select/select.component';
import { CheckboxComponent } from 'src/app/atoms/checkbox/checkbox.component';
import { IconComponent } from 'src/app/atoms/icon/icon.component';
import { RaterComponent } from 'src/app/atoms/rater/rater.component';
import { ProgressBarComponent } from 'src/app/atoms/progress-bar/progress-bar.component';
import { StepperComponent } from 'src/app/atoms/stepper/stepper.component';

const routes: Routes = [
  {path: 'input', component: InputComponent},
  {path: 'select', component: SelectComponent},
  {path: 'checkbox', component: CheckboxComponent},
  {path: 'icon', component: IconComponent},
  {path: 'rater', component: RaterComponent},
  {path: 'stepper', component: StepperComponent},
  {path: 'progress-bar', component: ProgressBarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtomsRoutingModule {
}
