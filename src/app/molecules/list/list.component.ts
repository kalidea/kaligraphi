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

  constructor() {
  }

  changeDataSource() {
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
   * The list of items
   */
  listItem = [
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
    {
      id: '5',
      name: 'cTest5',
      disabled: false
    },
    {
      id: '6',
      name: 'eTest6',
      disabled: false
    },
    {
      id: '7',
      name: 'rTest7',
      disabled: false
    },
    {
      id: '8',
      name: 'rTest8',
      disabled: false
    },
  ];

  /**
   * Return an observable that contains the items list
   */
  connect(): Observable<any> {
    for (let i = 9; i < 10000; i++) {
      this.listItem.push(
        {
          id: '' + i,
          name: 'rTest' + i,
          disabled: false
        },
      );
    }
    return of(this.listItem);
  }

  disconnect() {
  }
}
