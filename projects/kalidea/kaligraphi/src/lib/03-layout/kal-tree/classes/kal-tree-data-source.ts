/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 */
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { KalFlatTreeNode, KalTreeNode } from './kal-tree-node';
import { KalTreeControl } from './kal-tree-control';


/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type KalTreeNode to flattened nodes of type KalFlatTreeNode.
 *
 */
class KalTreeFlattener {

  constructor(public transformFunction: (node: KalTreeNode, level: number) => KalFlatTreeNode,
              public getLevel: (node: KalFlatTreeNode) => number,
              public isExpandable: (node: KalFlatTreeNode) => boolean,
              public getChildren: (node: KalTreeNode) => Observable<KalTreeNode[]> | KalTreeNode[]) {
  }

  _flattenNode(node: KalTreeNode, level: number,
               resultNodes: KalFlatTreeNode[], parentMap: boolean[]): KalFlatTreeNode[] {
    const flatNode = this.transformFunction(node, level);
    resultNodes.push(flatNode);

    if (this.isExpandable(flatNode)) {
      const childrenNodes = this.getChildren(node);
      if (Array.isArray(childrenNodes)) {
        this._flattenChildren(childrenNodes, level, resultNodes, parentMap);
      } else {
        childrenNodes.pipe(take(1)).subscribe(children => {
          this._flattenChildren(children, level, resultNodes, parentMap);
        });
      }
    }
    return resultNodes;
  }

  _flattenChildren(children: KalTreeNode[], level: number,
                   resultNodes: KalFlatTreeNode[], parentMap: boolean[]): void {
    children.forEach((child, index) => {
      const childParentMap: boolean[] = parentMap.slice();
      childParentMap.push(index !== children.length - 1);
      this._flattenNode(child, level + 1, resultNodes, childParentMap);
    });
  }

  /**
   * Flatten a list of node type T to flattened version of node F.
   * Please note that type T may be nested, and the length of `structuredData` may be different
   * from that of returned list `F[]`.
   */
  flattenNodes(structuredData: KalTreeNode[]): KalFlatTreeNode[] {
    const resultNodes: KalFlatTreeNode[] = [];
    structuredData.forEach(node => this._flattenNode(node, 0, resultNodes, []));
    return resultNodes;
  }

  /**
   * Expand flattened node with current expansion status.
   * The returned list may have different length.
   */
  expandFlattenedNodes(nodes: KalFlatTreeNode[], treeControl: KalTreeControl): KalFlatTreeNode[] {
    const results: KalFlatTreeNode[] = [];
    const currentExpand: boolean[] = [];
    currentExpand[0] = true;

    nodes.forEach(node => {
      let expand = true;
      for (let i = 0; i <= this.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (this.isExpandable(node)) {
        currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
      }
    });
    return results;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class KalTreeDataSource extends DataSource<KalTreeNode> {
  _flattenedData = new BehaviorSubject<KalTreeNode[]>([]);

  _expandedData = new BehaviorSubject<KalTreeNode[]>([]);

  private treeFlattener: KalTreeFlattener;

  constructor(private treeControl: KalTreeControl, initialData: KalTreeNode[] = []) {
    super();

    if (!treeControl) {
      throw Error('treeControl should be not null');
    }

    this._data = new BehaviorSubject<KalTreeNode[]>(initialData);
    this.treeFlattener = new KalTreeFlattener(
      (node, level) => new KalFlatTreeNode({...node, expandable: !!node.children, level}),
      node => node.level,
      node => node.expandable,
      node => node.children
    );
  }

  _data: BehaviorSubject<KalTreeNode[]>;

  get data() {
    return this._data.value;
  }

  set data(value: KalTreeNode[]) {
    this._data.next(value);
    this._flattenedData.next(this.treeFlattener.flattenNodes(this.data));
    this.treeControl.dataNodes = this._flattenedData.value;
  }

  /**
   * get flat node from node
   */
  getFlatNode(nodeOrId: KalTreeNode | string) {
    const id = nodeOrId instanceof KalTreeNode ? nodeOrId.id : nodeOrId;
    return this._flattenedData.value.find(flatNode => flatNode.id === id);
  }

  /**
   * select flatNode by node
   */
  selectNode(nodeOrId: KalTreeNode | string) {
    const node = this.getFlatNode(nodeOrId);
    if (node) {
      this.treeControl.selectionModel.select(node);
      // expand ascendants
      this.treeControl.expansionModel.select(...this.treeControl.getAscendants(node));
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<KalFlatTreeNode[]> {
    const changes = [
      collectionViewer.viewChange,
      this.treeControl.expansionModel.changed,
      this.treeControl.selectionModel.changed,
      this._flattenedData
    ];
    return merge(...changes).pipe(
      map(() => {
        this._expandedData.next(this.treeFlattener.expandFlattenedNodes(this._flattenedData.value, this.treeControl));
        return this._expandedData.value;
      }),
    );
  }

  disconnect() {
    // no op
  }
}
