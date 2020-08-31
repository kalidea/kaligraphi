import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalAccordionModule } from './kal-accordion/kal-accordion.module';
import { KalCardModule } from './kal-card/kal-card.module';
import { KalCarouselModule } from './kal-carousel/kal-carousel.module';
import { KalListModule } from './kal-list/kal-list.module';
import { KalNavModule } from './kal-nav/kal-nav.module';
import { KalStepperModule } from './kal-stepper/kal-stepper.module';
import { KalTabModule } from './kal-tabs/kal-tab.module';
import { KalTreeModule } from './kal-tree/kal-tree.module';

export * from './kal-accordion/kal-accordion.module';
export * from './kal-card/kal-card.module';
export * from './kal-carousel/kal-carousel.module';
export * from './kal-list/kal-list.module';
export * from './kal-nav/kal-nav.module';
export * from './kal-stepper/kal-stepper.module';
export * from './kal-tabs/kal-tab.module';
export * from './kal-tree/kal-tree.module';

const exports = [
  KalAccordionModule,
  KalCardModule,
  KalCarouselModule,
  KalListModule,
  KalNavModule,
  KalStepperModule,
  KalTabModule,
  KalTreeModule
];

@NgModule({
  imports: [
    CommonModule,
    ...exports
  ],
  exports,
  declarations: [],
})
export class KalLayoutModule {
}
