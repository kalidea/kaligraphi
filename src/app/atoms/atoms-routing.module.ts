import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from 'src/app/atoms/input/input.component';
import { SelectComponent } from 'src/app/atoms/select/select.component';
import { CheckboxComponent } from 'src/app/atoms/checkbox/checkbox.component';
import { RadioComponent } from 'src/app/atoms/radio/radio.component';
import { IconComponent } from 'src/app/atoms/icon/icon.component';
import { RaterComponent } from 'src/app/atoms/rater/rater.component';
import { ProgressBarComponent } from 'src/app/atoms/progress-bar/progress-bar.component';
import { SliderComponent } from 'src/app/atoms/slider/slider.component';

const routes: Routes = [
  {path: 'input', component: InputComponent},
  {path: 'select', component: SelectComponent},
  {path: 'checkbox', component: CheckboxComponent},
  {path: 'radio', component: RadioComponent},
  {path: 'icon', component: IconComponent},
  {path: 'rater', component: RaterComponent},
  {path: 'progress-bar', component: ProgressBarComponent},
  {path: 'slider', component: SliderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtomsRoutingModule {
}
