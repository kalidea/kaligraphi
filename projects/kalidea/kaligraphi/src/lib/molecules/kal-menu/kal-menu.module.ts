import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalMenuComponent } from './kal-menu.component';
import { RouterModule } from '@angular/router';

export * from './kal-menu.component';

const exports = [
  KalMenuComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: exports,
  exports
})
export class KalMenuModule { }
