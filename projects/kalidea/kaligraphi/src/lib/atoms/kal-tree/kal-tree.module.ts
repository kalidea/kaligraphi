import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { KalTreeComponent } from './kal-tree.component';
import { KalTreeNodeComponent } from './kal-tree-node.component';
import { KalIconModule } from '../kal-icon/kal-icon.module';

export * from './kal-tree.component';
export * from './kal-tree-node.component';
export * from './kal-tree-data-source';

const exports = [
  KalTreeComponent,
  KalTreeNodeComponent
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
    CdkTreeModule,
    DragDropModule
  ]
})
export class KalTreeModule {
}
