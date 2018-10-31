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

  datasource = new TestDataSource();

  initials = null;

  constructor() {
  }

  addInitials() {
    this.initials = !this.initials ? (item) => item['name'].charAt(0).toLocaleUpperCase() : null;
  }

  ngOnInit() {
  }

}

class TestDataSource implements DataSource<{code: string, name: string}> {

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

  connect(): Observable<any> {
    return of(this.listItem);
  }

  disconnect() {
  }
}
