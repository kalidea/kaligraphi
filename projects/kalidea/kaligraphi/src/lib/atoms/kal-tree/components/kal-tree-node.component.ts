/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CdkNestedTreeNode, CdkTree, CdkTreeNode } from '@angular/cdk/tree';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  IterableDiffers,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { KalTreeNodeOutletDirective } from '../directives/kal-tree-node-outlet.directive';
import { KalTreeComponent } from './kal-tree.component';
import { KalTreeNode } from 'src/lib/atoms/kal-tree/classes/kal-tree-node';

/**
 * Wrapper for the CdkTree nested node with kalerial design styles.
 */
@Component({
  selector: 'kal-tree-node',
  template: '<ng-content></ng-content>',
  exportAs: 'kalTreeNode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: CdkNestedTreeNode, useExisting: KalTreeNodeComponent},
    {provide: CdkTreeNode, useExisting: KalTreeNodeComponent}
  ]
})
export class KalTreeNodeComponent extends CdkNestedTreeNode<KalTreeNode> implements AfterContentInit, OnDestroy {

  @Input() disabled;

  @Input() tabIndex = 0;

  node: KalTreeNode;

  @ContentChildren(KalTreeNodeOutletDirective) nodeOutlet: QueryList<KalTreeNodeOutletDirective>;

  constructor(protected elementRef: ElementRef<HTMLElement>,
              protected tree: KalTreeComponent,
              protected differs: IterableDiffers) {
    super(elementRef, tree as CdkTree<KalTreeNode>, differs);
  }

  @HostBinding('class.kal-selected')
  get selected() {
    return this.tree.isSelected(this.data);
  }

  @Input()
  set kalNestedTreeNode(node) {
    this.node = node;
  }

  @HostListener('click', ['$event'])
  select($event) {
    $event.stopPropagation();
    if (this.data) {
      this.tree.select(this.data);
    }
  }

  // This is a workaround for https://github.com/angular/angular/issues/23091
  // In aot mode, the lifecycle hooks from parent class are not called.

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
