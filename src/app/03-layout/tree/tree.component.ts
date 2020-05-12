import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { KalTreeNode } from '@kalidea/kaligraphi';
import { KalTreeControl } from '@kalidea/kaligraphi';
import { KalTreeDataSource } from '@kalidea/kaligraphi';

const TREE_DATA: KalTreeNode[] = [
  {
    id: '1', title: 'level A', children: [
      {id: '11', title: 'level A1'},
      {
        id: '12', title: 'level A2', children: [
          {id: '121', title: 'level A21'},
          {id: '122', title: 'level A22'},
          {id: '123', title: 'level A23'},
        ]
      },
      {id: '13', title: 'level A3'}
    ]
  },
  {
    id: '2', title: 'level B', children: [
      {
        id: '21', title: 'level B1', children: [
          {
            id: '211', title: 'level B11', children: [
              {id: '2111', title: 'level B111'},
              {id: '2112', title: 'level B112'},
            ]
          },
          {
            id: '212', title: 'level B12', children: [
              {id: '2121', title: 'level B121'},
              {id: '2122', title: 'level B122'},
            ]
          },
        ]
      },
      {
        id: '22', title: 'level B2', children: [
          {id: '221', title: 'level B21'},
          {id: '222', title: 'level B22'},
          {id: '223', title: 'level B23'},
        ]
      },
      {id: '23', title: 'level B3'}
    ]
  }
];


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent {


  treeControl: KalTreeControl;

  dataSource: KalTreeDataSource;

  constructor() {
    this.treeControl = new KalTreeControl();
    this.dataSource = new KalTreeDataSource(this.treeControl);
    this.dataSource.data = TREE_DATA;
  }

  hasNestedChild = (_: number, nodeData: KalTreeNode) => !!nodeData.children;

  select(id: string) {
    this.dataSource.selectNode(id);
  }

  changed($event) {
    // console.log($event);
  }

  drop($event) {
    console.log($event);
  }

  collapseAll() {
    this.treeControl.collapseAll();
  }

  expandAll() {
    this.treeControl.expandAll();
  }
}
