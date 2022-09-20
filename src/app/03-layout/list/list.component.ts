import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { KalListComponent, KalSelectionModel, KalVirtualScrollConfig } from '@kalidea/kaligraphi';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import range from 'lodash-es/range';
import { take, tap } from 'rxjs/operators';

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
  listSelection: KalSelectionModel<{ id: string }> = null;

  /**
   * The virtual scroll config
   */
  virtualScrollConfig: KalVirtualScrollConfig = {
    itemSize: 48
  };

  icon = 'keyboard_arrow_right';

  selectRowOnContentClick = false;

  highlightedItem = null;

  @ViewChild(KalListComponent, {static: true}) kalListComponent: KalListComponent<{ id: string, name: string, disabled: boolean }>;

  selectRow($event: KalSelectionModel<{ id: string }>) {
    this.listSelection = $event;
  }

  highlightItem($event): void {
    this.highlightedItem = $event;
  }

  changeDataSource(): void {
    this.virtualScrollConfig = null;

    this.dataSource = range(1, 20000).map(
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
  addGroupByFunction(): void {
    this.groupByFunction = !this.groupByFunction ? (item) => item['name'].charAt(0).toLocaleUpperCase() : null;
  }

  /**
   * Add a function that disable rows
   */
  disableRow(): void {
    this.disableRowsFunction = !this.disableRowsFunction ? (item) => item['disabled'] : null;
  }

  selectAll(): void {
    if (this.listSelection && this.listSelection.format().all) {
      this.kalListComponent.clear();
    } else {
      this.kalListComponent.selectAll();
    }
  }

  selectMultipleRows(): void {
    this.icon = 'keyboard_arrow_right';
    this.selectionMode = 'multiple';
    this.listSelection.clear();
  }

  unselectRows(): void {
    this.icon = null;
    this.selectionMode = 'none';
    this.listSelection.clear();
  }

  selectSingleRow(): void {
    this.icon = 'keyboard_arrow_right';
    this.selectionMode = null;
    this.listSelection.clear();
  }

  changeSelection(): void {
    this.listSelection = new KalSelectionModel<{ id: string }>({added: [{id: '1'}], all: false});
  }

  ngOnInit(): void {
    this.selectionMode = 'multiple';
    this.listSelection = new KalSelectionModel<{ id: string }>({added: [{id: '1'}, {id: '2'}], all: false});
  }

}

const list = (page: number, numberOfElements: number) => {
  const listItem = [];
  const startElement = ((page - 1) * numberOfElements) + 1;
  const total = 1000;
  const numberOfTotalElements = Math.min(total, page * numberOfElements);

  for (let i = startElement; i <= numberOfTotalElements; i++) {
    listItem.push(
      {
        id: '' + i,
        name: 'rTest' + i,
        disabled: i === 1
      },
    );
  }

  return of({data: listItem, meta: {total}});
};

// tslint:disable-next-line:max-classes-per-file
class TestDataSource<T> implements DataSource<{ id: string, name: string }> {

  private subscriptionsList: Subscription[] = [];
  private datastream: BehaviorSubject<T[]> = new BehaviorSubject([]);
  private total: BehaviorSubject<number> = new BehaviorSubject(0);
  private page = 1;
  private countElement = 500;

  constructor() {
    this.subscriptionsList.push(
      this.changePage().subscribe()
    );
  }

  private _cachedData: T[] = [];

  get cachedData(): T[] {
    return this._cachedData;
  }

  set cachedData(values: T[]) {
    this._cachedData.push(...values);
    this.datastream.next(this._cachedData);
  }

  get displayedElement(): number {
    return this.page * this.countElement;
  }

  get list(): Observable<{ data, meta }> {
    return list(this.page, this.countElement);
  }

  /**
   * Return an observable that contains the items list
   */
  connect(collectionViewer: CollectionViewer): Observable<any> {
    this.subscriptionsList.push(
      collectionViewer.viewChange.pipe(
        tap(value => {
          if (value.end >= this.displayedElement && this.cachedData.length <= this.total.getValue()) {
            this.page += 1;
            this.subscriptionsList.push(this.changePage().subscribe());
          }
        })
      ).subscribe()
    );

    return this.datastream;
  }

  changePage(): Observable<any> {
    return this.list.pipe(
      take(1),
      tap(({data, meta}) => {
          this.cachedData = data;
          this.total.next(meta.total);
        }
      ));
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.subscriptionsList.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
