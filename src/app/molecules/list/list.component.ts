import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { KalListSelection } from '@kalidea/kaligraphi';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

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
   * selected value
   */
  selectedValue;

  /**
   * items selectionMode
   */
  selectionMode = 'single';

  /**
   * The list selection
   */
  listSelection = null;

  /**
   * Use the virtual scroll
   */
  useVirtualScroll = true;

  constructor() {
  }

  changeDataSource() {
    this.useVirtualScroll = false;
    this.dataSource = [
      {
        id: '1',
        name: 'aTest',
        disabled: true
      },
      {
        id: '2',
        name: 'aTest2',
        disabled: false
      },
      {
        id: '3',
        name: 'aTest3',
        disabled: false
      },    {
        id: '4',
        name: 'bTest4',
        disabled: false
      },
    ];
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

  selectMultipleRows() {
    this.selectionMode = 'multiple';
  }

  unselectRows() {
    this.selectionMode = 'none';
  }

  selectSingleRow() {
    this.selectionMode = null;
  }

  changeSelection() {
    this.listSelection = new KalListSelection<{id: string}>([{id: '1'}], false, []);
  }

  ngOnInit() {
  }

}

class TestDataSource implements DataSource<{id: string, name: string}> {

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
          disabled: false
        },
      );
    }
    return of(listItem);
  }

  disconnect() {
  }
}
