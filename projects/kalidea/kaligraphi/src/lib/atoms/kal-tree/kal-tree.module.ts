import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@angular/cdk/tree';

import { KalTreeComponent } from './components/kal-tree.component';
import { KalTreeNodeComponent } from './components/kal-tree-node.component';
import { KalTreeNodeOutletDirective } from './directives/kal-tree-node-outlet.directive';
import { KalTreeNodeDefDirective } from './directives/kal-tree-node-def.directive';
import { KalTreeNodeToggleDirective } from './directives/kal-tree-node-toggle.directive';
import { KalTreeNodePaddingDirective } from './directives/kal-tree-node-padding';

import { KalIconModule } from '../kal-icon/kal-icon.module';
import { KalButtonModule } from '../../molecules/kal-button/kal-button.module';

// components
export * from './components/kal-tree.component';
export * from './components/kal-tree-node.component';
// directives
export * from './directives/kal-tree-node-outlet.directive';
export * from './directives/kal-tree-node-def.directive';
export * from './directives/kal-tree-node-toggle.directive';
export * from './directives/kal-tree-node-padding';
// basic classes
export * from './classes/kal-tree-data-source';
export * from './classes/kal-tree-node';
export * from './classes/kal-tree-control';

const exports = [
  KalTreeComponent,
  KalTreeNodeComponent,
  KalTreeNodeOutletDirective,
  KalTreeNodeDefDirective,
  KalTreeNodeToggleDirective,
  KalTreeNodePaddingDirective,
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
    KalButtonModule,
    CdkTreeModule
  ]
})
export class KalTreeModule {
}
