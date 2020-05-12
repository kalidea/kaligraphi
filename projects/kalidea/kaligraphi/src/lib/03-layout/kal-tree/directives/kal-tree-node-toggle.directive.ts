import { Directive } from '@angular/core';
import { CdkTree, CdkTreeNode, CdkTreeNodeToggle } from '@angular/cdk/tree';

import { KalTreeNode } from '../classes/kal-tree-node';

@Directive({
  selector: '[kalTreeNodeToggle]'
})
export class KalTreeNodeToggleDirective extends CdkTreeNodeToggle<KalTreeNode> {
  constructor(tree: CdkTree<KalTreeNode>, treeNode: CdkTreeNode<KalTreeNode>) {
    super(tree, treeNode);
  }
}
