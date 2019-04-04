import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalCarouselItemDirective } from './kal-carousel-item.directive';
import { KalCarouselComponent } from './kal-carousel.component';

export * from './kal-carousel-item.directive';
export * from './kal-carousel.component';

const exports = [
  KalCarouselItemDirective,
  KalCarouselComponent
];

@NgModule({
  declarations: exports,
  exports,
  imports: [
    CommonModule
  ]
})
export class KalCarouselModule {
}
