import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { KalTreeNode } from 'projects/kalidea/kaligraphi/src/lib/atoms/kal-tree/classes/kal-tree-node';
import { KalTreeControl } from 'projects/kalidea/kaligraphi/src/lib/atoms/kal-tree/classes/kal-tree-control';

const TREE_DATA: KalTreeNode[] = [
  {
    title: 'level A', children: [
      {title: 'level A1'},
      {
        title: 'level A2', children: [
          {title: 'level A21'},
          {title: 'level A22'},
          {title: 'level A23'},
        ]
      },
      {title: 'level A3'}
    ]
  },
  {
    title: 'level B', children: [
      {
        title: 'level B1', children: [
          {title: 'level B11'},
          {title: 'level B12'},
        ]
      },
      {
        title: 'level B2', children: [
          {title: 'level B21'},
          {title: 'level B22'},
          {title: 'level B23'},
        ]
      },
      {title: 'level B3'}
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

  treeControl: KalTreeControl = new KalTreeControl((node: KalTreeNode) => node.children);

  data = TREE_DATA;

  hasNestedChild = (_: number, nodeData: KalTreeNode) => {
    return !!nodeData.children;
  };


}
