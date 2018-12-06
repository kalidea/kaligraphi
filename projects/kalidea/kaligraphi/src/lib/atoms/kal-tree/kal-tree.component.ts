import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { of } from 'rxjs';

import { KalTreeDataSource } from './kal-tree-data-source';
import { KalTreeNodeDirective } from './kal-tree-node.directive';

@Component({
  selector: 'kal-tree',
  templateUrl: './kal-tree.component.html',
  styleUrls: ['./kal-tree.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTreeComponent<T extends { children?: T[] }> implements OnInit {
  @Input() dataSource: KalTreeDataSource<T>;

  @ContentChild(KalTreeNodeDirective, {read: TemplateRef}) nodeTemplate;

  treeControl: NestedTreeControl<T>;

  constructor() {
    this.treeControl = new NestedTreeControl<T>(this._getChildren);
  }

  hasNestedChild = (_: number, nodeData: T) => nodeData.children;

  private _getChildren = (node: T) => of(node.children);

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<T>(this._getChildren);
  }
}
