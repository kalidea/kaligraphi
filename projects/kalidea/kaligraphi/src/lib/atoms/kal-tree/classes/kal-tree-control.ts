import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';

import { KalFlatTreeNode } from './kal-tree-node';

export class KalTreeControl extends FlatTreeControl<KalFlatTreeNode> {

  public selectionModel: SelectionModel<KalFlatTreeNode>;

  constructor(selection?: SelectionModel<KalFlatTreeNode>) {
    super(
      (node: KalFlatTreeNode) => node.level,
      (node: KalFlatTreeNode) => node.expandable
    );

    this.selectionModel = selection || new SelectionModel(false);
  }


  getAscendants(node: KalFlatTreeNode) {
    const startIndex = this.dataNodes.indexOf(node);
    const results: KalFlatTreeNode[] = [];
    let lastLevel = this.getLevel(node);

    for (let i = startIndex - 1; i >= 0; i--) {
      const currentLevel = this.getLevel(this.dataNodes[i]);

      if (currentLevel < lastLevel) {
        lastLevel = currentLevel; // store last level
        results.push(this.dataNodes[i]);
      }

      if (this.getLevel(this.dataNodes[i]) === 0) {
        // break loop when reaching root of tree
        break;
      }

    }
    return results;
  }

  isSelected(node: KalFlatTreeNode) {
    return this.selectionModel.isSelected(node);
  }

  select(node: KalFlatTreeNode) {
    this.selectionModel.select(node);
  }

}
