import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { KalListComponent, KalSelectionModel } from '@kalidea/kaligraphi';
import { Observable, of } from 'rxjs';
import range from 'lodash-es/range';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  items = [];

  /**
   * dataSource
   */
  dataSource: any = new TestDataSource();

  /**
   * groupBy function
   */
  groupByFunction = null;

  /**
   * Disable rows function
   */
  disableRowsFunction = null;

  /**
   * items selectionMode
   */
  selectionMode = 'single';

  /**
   * The list selection
   */
  listSelection: KalSelectionModel<{id: string}> = null;

  /**
   * The virtual scroll config
   */
  virtualScrollConfig = {
    height: 500,
    itemSize: 48
  };

  icon = 'keyboard_arrow_right';

  selectRowOnContentClick = false;

  @ViewChild(KalListComponent, { static: true }) kalListComponent: KalListComponent<{ id: string, name: string, disabled: boolean }>;

  constructor() {
  }

  selectRow($event: KalSelectionModel<{ id: string }>) {
    this.kalListComponent.highlightedItem = null;
  }

  highlightItem() {
    this.listSelection = new KalSelectionModel();
  }

  changeDataSource() {
    this.virtualScrollConfig = null;

    this.dataSource = range(1, 5).map(
      index => {
        return {
          id: '' + index,
          name: (index !== 4 ? 'aTest' : 'bTest') + index,
          disabled: index === 1
        };
      }
    );

    this.listSelection = new KalSelectionModel({numberOfItems: this.dataSource.length});
  }

  /**
   * Add a function that group all items
   */
  addGroupByFunction() {
    this.groupByFunction = !this.groupByFunction ? (item) => item['name'].charAt(0).toLocaleUpperCase() : null;
  }

  /**
   * Add a function that disable rows
   */
  disableRow() {
    this.disableRowsFunction = !this.disableRowsFunction ? (item) => item['disabled'] : null;
  }

  selectAll() {
    if (this.listSelection && this.listSelection.format().all) {
      this.kalListComponent.clear();
    } else {
      this.kalListComponent.selectAll();
    }
  }

  selectMultipleRows() {
    this.icon = 'keyboard_arrow_right';
    this.selectionMode = 'multiple';
    this.listSelection.clear();
  }

  unselectRows() {
    this.icon = null;
    this.selectionMode = 'none';
    this.listSelection.clear();
  }

  selectSingleRow() {
    this.icon = 'keyboard_arrow_right';
    this.selectionMode = null;
    this.listSelection.clear();
  }

  changeSelection() {
    this.listSelection = new KalSelectionModel<{ id: string }>({added: [{id: '1'}], all: false});
  }

  ngOnInit(): void {
    this.selectionMode = 'multiple';
    this.listSelection = new KalSelectionModel<{ id: string }>({added: [{id: '1'}, {id: '2'}], all: false});
  }

}

class TestDataSource implements DataSource<{ id: string, name: string }> {

  /**
   * Return an observable that contains the items list
   */
  connect(): Observable<any> {
    const listItem = [];
    for (let i = 1; i <= 500; i++) {
      listItem.push(
        {
          id: '' + i,
          name: 'rTest' + i,
          disabled: i === 1
        },
      );
    }

    return of(listItem);
  }

  disconnect() {
  }
}
