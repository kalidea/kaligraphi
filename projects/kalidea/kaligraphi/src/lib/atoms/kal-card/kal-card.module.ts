import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './kal-card.component';

import { KalCardComponent } from './kal-card.component';
import { KalCardHeaderComponent } from './components/kal-card-header.component';
import { KalCardContentComponent } from './components/kal-card-content.component';
import { KalCardActionsComponent } from './components/kal-card-actions.component';
import { KalCardTitleComponent } from './components/kal-card-title.component';
import { KalCardOnTitleComponent } from './components/kal-card-on-title.component';

import { KalIconModule } from '../kal-icon/kal-icon.module';
import { KalButtonModule } from '../../molecules/kal-button/kal-button.module';

export * from './kal-card.component';
export * from './components/kal-card-header.component';
export * from './components/kal-card-content.component';
export * from './components/kal-card-actions.component';
export * from './components/kal-card-title.component';
export * from './components/kal-card-on-title.component';

const exports = [
  KalCardComponent,
  KalCardHeaderComponent,
  KalCardContentComponent,
  KalCardActionsComponent,
  KalCardTitleComponent,
  KalCardOnTitleComponent
];

@NgModule({
  exports,
  declarations: exports,
  imports: [
    CommonModule,
    KalIconModule,
    KalButtonModule
  ]
})
export class KalCardModule {
}
