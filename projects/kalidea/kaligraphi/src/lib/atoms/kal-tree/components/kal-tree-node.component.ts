/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CdkNestedTreeNode, CdkTreeNode } from '@angular/cdk/tree';
import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, QueryList, } from '@angular/core';
import { KalTreeNodeOutletDirective } from '../directives/kal-tree-node-outlet.directive';

/**
 * Wrapper for the CdkTree nested node with kalerial design styles.
 */
@Component({
  selector: 'kal-tree-node',
  template: '<ng-content></ng-content>',
  exportAs: 'kalTreeNode',
  providers: [
    {provide: CdkNestedTreeNode, useExisting: KalTreeNodeComponent},
    {provide: CdkTreeNode, useExisting: KalTreeNodeComponent}
  ]
})
export class KalTreeNodeComponent<T> extends CdkNestedTreeNode<T> implements AfterContentInit, OnDestroy {

  @Input() disabled;

  @Input() tabIndex = 0;

  node: T;

  @ContentChildren(KalTreeNodeOutletDirective) nodeOutlet: QueryList<KalTreeNodeOutletDirective>;

  @Input()
  set kalNestedTreeNode(node) {
    this.node = node;
  }

  // This is a workaround for https://github.com/angular/angular/issues/23091
  // In aot mode, the lifecycle hooks from parent class are not called.

  // TODO(tinayuangao): Remove when the angular issue #23091 is fixed
  ngAfterContentInit() {
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
