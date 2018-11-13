import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPanelComponent } from 'src/app/molecules/tab-panel/tab-panel.component';
import { StepperComponent } from 'src/app/molecules/stepper/stepper.component';
import { AccordionComponent } from 'src/app/molecules/accordion/accordion.component';
import { ListComponent } from 'src/app/molecules/list/list.component';
import { MenuComponent } from 'src/app/molecules/menu/menu.component';
import { FormFieldComponent } from 'src/app/molecules/form-field/form-field.component';
import { DatepickerComponent } from 'src/app/molecules/datepicker/datepicker.component';

const routes: Routes = [
  {path: 'tab-panel', component: TabPanelComponent},
  {path: 'stepper', component: StepperComponent},
  {path: 'accordion', component: AccordionComponent},
  {path: 'list', component: ListComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'form-field', component: FormFieldComponent},
  {path: 'datepicker', component: DatepickerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculesRoutingModule {
}
