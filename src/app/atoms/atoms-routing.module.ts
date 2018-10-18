import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from 'src/app/atoms/input/input.component';
import { SelectComponent } from 'src/app/atoms/select/select.component';
import { CheckboxComponent } from 'src/app/atoms/checkbox/checkbox.component';

const routes: Routes = [
  {path: 'input', component: InputComponent},
  {path: 'select', component: SelectComponent},
  {path: 'checkbox', component: CheckboxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtomsRoutingModule {
}
