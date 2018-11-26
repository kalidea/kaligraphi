import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalCardComponent } from './kal-card.component';
import { KalCardTitleDirective } from './kal-card-title.directive';
import { KalCardItemDirective } from './kal-card-item.directive';
import { KalCardFooterDirective } from './kal-card-footer.directive';

@NgModule({
  declarations: [KalCardComponent, KalCardTitleDirective, KalCardItemDirective, KalCardFooterDirective],
  imports: [
    CommonModule
  ]
})
export class KalCardModule { }
