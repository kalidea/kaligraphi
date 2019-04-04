import { Directive, HostListener } from '@angular/core';
import { CdkTree, CdkTreeNode, CdkTreeNodeToggle } from '@angular/cdk/tree';

import { KalTreeNode } from '../classes/kal-tree-node';

@Directive({
  selector: '[kalTreeNodeToggle]'
})
export class KalTreeNodeToggleDirective extends CdkTreeNodeToggle<KalTreeNode> {
  constructor(tree: CdkTree<KalTreeNode>, treeNode: CdkTreeNode<KalTreeNode>) {
    super(tree, treeNode);
  }

  @HostListener('click', ['$event'])
  _toggle(event: Event): void {
    this.recursive
      ? this._tree.treeControl.toggleDescendants(this._treeNode.data)
      : this._tree.treeControl.toggle(this._treeNode.data);

    event.stopPropagation();
  }

}
