/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkTree, CdkTreeNode, CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';

/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
@Directive({
  selector: '[kalTreeNodePadding]',
  providers: [{provide: CdkTreeNodePadding, useExisting: KalTreeNodePaddingDirective}]
})
export class KalTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> {

  constructor(treeNode: CdkTreeNode<T>, tree: CdkTree<T>, element: ElementRef<HTMLElement>, dir: Directionality) {
    super(treeNode, tree, element, dir);
  }

  /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
  @Input()
  set kalTreeNodePaddingIndent(indent: number) {
    this.indent = indent;
  }

  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  @Input()
  set kalTreeNodePadding(level: number) {
    this.level = level;
  }
}
