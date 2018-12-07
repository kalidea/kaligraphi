import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { KalTreeDataSource } from './kal-tree-data-source';

@Component({
  selector: 'kal-tree',
  templateUrl: './kal-tree.component.html',
  styleUrls: ['./kal-tree.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTreeComponent<T extends { children?: T[], title: string, level?: number }> implements OnInit {
  @Input() dataSource: KalTreeDataSource<T>;

  get nodesList() {
    return this.flatten(this.dataSource.data);
  }

  drop($event) {
    console.log($event);
  }

  private flatten(itemsList: T[], level = 0): T[] {

    const list: T[] = [];

    for (const item of itemsList) {
      item.level = level;
      list.push(item);
      if (item.children && item.children.length > 0) {
        list.push(...this.flatten(item.children, level + 1));
      }
    }

    return list;
  }

  ngOnInit(): void {
  }
}
