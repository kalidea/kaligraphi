import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { KalNavComponent } from './kal-nav.component';

export * from './kal-nav.component';

const exports = [
  KalNavComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: exports,
  exports
})
export class KalNavModule { }
