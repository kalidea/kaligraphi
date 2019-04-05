import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { LayoutRoutingModule } from 'src/app/03-layout/layout-routing.module';
import { AccordionComponent } from 'src/app/03-layout/accordion/accordion.component';
import { CardComponent } from 'src/app/03-layout/card/card.component';
import { CarouselComponent } from 'src/app/03-layout/carousel/carousel.component';
import { ListComponent } from 'src/app/03-layout/list/list.component';
import { NavComponent } from 'src/app/03-layout/nav/nav.component';
import { StepperComponent } from 'src/app/03-layout/stepper/stepper.component';
import { TabPanelComponent } from 'src/app/03-layout/tab-panel/tab-panel.component';
import { TreeComponent } from 'src/app/03-layout/tree/tree.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutRoutingModule,
    KaligraphiModule,
  ],
  declarations: [
    AccordionComponent,
    CardComponent,
    CarouselComponent,
    ListComponent,
    NavComponent,
    StepperComponent,
    TabPanelComponent,
    TreeComponent
  ]
})
export class LayoutModule { }
