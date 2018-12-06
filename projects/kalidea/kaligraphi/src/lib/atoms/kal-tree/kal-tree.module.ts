import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@angular/cdk/tree';

import { KalTreeComponent } from './kal-tree.component';
import { KalTreeNodeDirective } from './kal-tree-node.directive';
import { KalIconModule } from '../kal-icon/kal-icon.module';

export * from './kal-tree.component';
export * from './kal-tree-node.directive';
export * from './kal-tree-data-source';

const exports = [
  KalTreeComponent,
  KalTreeNodeDirective
];

@NgModule({
  exports: [
    ...exports,
    CdkTreeModule
  ],
  declarations: exports,
  imports: [
    CommonModule,
    KalIconModule,
    CdkTreeModule
  ]
})
export class KalTreeModule {
}
