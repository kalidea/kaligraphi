import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
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
  dataSource = new TestDataSource();

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

  constructor() {
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

  ngOnInit() {
  }

}

class TestDataSource implements DataSource<{code: string, name: string}> {

  /**
   * The list of items
   */
  listItem = [
    {
      code: '1',
      name: 'aTest',
      disabled: true
    },
    {
      code: '2',
      name: 'aTest2',
      disabled: false
    },
    {
      code: '3',
      name: 'aTest3',
      disabled: false
    },    {
      code: '4',
      name: 'bTest4',
      disabled: false
    },
    {
      code: '5',
      name: 'cTest5',
      disabled: false
    },
    {
      code: '6',
      name: 'eTest6',
      disabled: false
    },
    {
      code: '7',
      name: 'rTest7',
      disabled: false
    },
    {
      code: '8',
      name: 'rTest8',
      disabled: false
    },
  ];

  /**
   * Return an observable that contains the items list
   */
  connect(): Observable<any> {
    return of(this.listItem);
  }

  disconnect() {
  }
}
