/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { CdkNestedTreeNode, CdkTree, CdkTreeNode } from '@angular/cdk/tree';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';

import { KalTreeNodeOutletDirective } from '../directives/kal-tree-node-outlet.directive';
import { KalTreeComponent } from './kal-tree.component';
import { KalTreeNode } from '../classes/kal-tree-node';

/**
 * Wrapper for the CdkTree nested node with kalerial design styles.
 */
@Component({
  selector: 'kal-tree-node',
  exportAs: 'kalTreeNode',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: CdkNestedTreeNode, useExisting: KalTreeNodeComponent},
    {provide: CdkTreeNode, useExisting: KalTreeNodeComponent}
  ]
})
export class KalTreeNodeComponent extends CdkTreeNode<KalTreeNode> implements OnDestroy {

  @Input() disabled;

  tabIndex;

  @ContentChildren(KalTreeNodeOutletDirective, {descendants: true}) nodeOutlet: QueryList<KalTreeNodeOutletDirective>;

  constructor(protected elementRef: ElementRef<HTMLElement>,
              protected tree: KalTreeComponent,
              @Attribute('tabindex') tabIndex: string) {
    super(elementRef, tree as CdkTree<KalTreeNode>);
    this.tabIndex = Number(tabIndex) || 0;
  }

  @HostBinding('class.kal-selected')
  get selected() {
    return this.tree.selection.isSelected(this.data);
  }

  @HostListener('click', ['$event'])
  select($event: Event) {
    $event.stopPropagation();
    if (this.data) {
      this.tree.selection.select(this.data);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
