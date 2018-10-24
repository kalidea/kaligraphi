import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from 'src/app/molecules/accordion/accordion.component';

const routes: Routes = [
  {path: 'accordion', component: AccordionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoleculesRoutingModule { }
