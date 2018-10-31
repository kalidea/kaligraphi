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
   * Datasource
   */
  datasource = new TestDataSource();

  /**
   * Initials
   */
  initials = null;

  constructor() {
  }

  /**
   * Add initials
   */
  addInitials() {
    this.initials = !this.initials ? (item) => item['name'].charAt(0).toLocaleUpperCase() : null;
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
    },
    {
      code: '2',
      name: 'aTest2',
    },
    {
      code: '3',
      name: 'aTest3',
    },    {
      code: '4',
      name: 'bTest4',
    },
    {
      code: '5',
      name: 'cTest5',
    },
    {
      code: '6',
      name: 'eTest6',
    },
    {
      code: '7',
      name: 'rTest7',
    },
    {
      code: '8',
      name: 'rTest8',
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
