import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from 'src/app/03-layout/list/list.component';
import { NavComponent } from 'src/app/03-layout/nav/nav.component';
import { StepperComponent } from 'src/app/03-layout/stepper/stepper.component';
import { TabPanelComponent } from 'src/app/03-layout/tab-panel/tab-panel.component';
import { TreeComponent } from 'src/app/03-layout/tree/tree.component';
import { AccordionComponent } from 'src/app/03-layout/accordion/accordion.component';
import { CardComponent } from 'src/app/03-layout/card/card.component';
import { CarouselComponent } from 'src/app/03-layout/carousel/carousel.component';


const routes: Routes = [
  {path: 'accordion', component: AccordionComponent},
  {path: 'card', component: CardComponent},
  {path: 'carousel', component: CarouselComponent},
  {path: 'list', component: ListComponent},
  {path: 'nav', component: NavComponent},
  {path: 'stepper', component: StepperComponent},
  {path: 'tab-panel', component: TabPanelComponent},
  {path: 'tree', component: TreeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
