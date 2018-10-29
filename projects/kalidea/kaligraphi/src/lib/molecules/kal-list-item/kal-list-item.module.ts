import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalListComponent, KalListItemComponent } from 'src/lib/molecules/kal-list-item/kal-list-item.component';

const exports = [
  KalListComponent,
  KalListItemComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: exports,
  exports: exports
})
export class KalListItemModule {
}
