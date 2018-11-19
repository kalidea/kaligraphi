import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPanelComponent } from 'src/app/molecules/tab-panel/tab-panel.component';
import { StepperComponent } from 'src/app/molecules/stepper/stepper.component';
import { AccordionComponent } from 'src/app/molecules/accordion/accordion.component';
import { ListComponent } from 'src/app/molecules/list/list.component';
import { NavComponent } from 'src/app/molecules/nav/nav.component';
import { FormFieldComponent } from 'src/app/molecules/form-field/form-field.component';
import { DialogComponent } from 'src/app/molecules/dialog/dialog.component';
import { DatepickerComponent } from 'src/app/molecules/datepicker/datepicker.component';
import { ButtonComponent } from 'src/app/molecules/button/button.component';

const routes: Routes = [
  {path: 'tab-panel', component: TabPanelComponent},
  {path: 'stepper', component: StepperComponent},
  {path: 'accordion', component: AccordionComponent},
  {path: 'list', component: ListComponent},
  {path: 'nav', component: NavComponent},
  {path: 'form-field', component: FormFieldComponent},
  {path: 'dialog', component: DialogComponent},
  {path: 'datepicker', component: DatepickerComponent},
  {path: 'button', component: ButtonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculesRoutingModule {
}
