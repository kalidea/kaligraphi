import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { KalListModule } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.module';
import { KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';
import { KalCheckboxModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.module';
import { KalListComponent, } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component';
import { KalIconComponent } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.component';
import { KalCheckboxComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component';
import { KalSelectionModel } from 'projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection';
import { take, tap } from 'rxjs/operators';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  template: `
      <kal-list [dataSource]="dataSource"
                [groupByFunction]="groupByFunction"
                [disableRowsFunction]="disableRowsFunction"
                [selectionMode]="selectionMode"
                [selectRowOnContentClick]="selectRowOnContentClick"
                [icon]="icon"
                (selectionChange)="selectRow($event)">

          <ng-template kalListItem let-item="item">
              {{ item.name }}
          </ng-template>

      </kal-list>
  `
})
class TestListItemComponent {

  icon = 'keyboard_arrow_right';

  dataSource = new TestDataSource();

  groupByFunction = null;

  disableRowsFunction = null;

  selectionMode = 'single';

  selectRowOnContentClick = null;

  selectRow($event) {
  }

}

const itemsList = [
  {
    id: '1',
    name: 'Item 1',
    disabled: true,
  },
  {
    id: '2',
    name: 'Item 2',
    disabled: false,
  },
  {
    id: '3',
    name: 'Item 3',
    disabled: false,
  },
];

// tslint:disable-next-line:max-classes-per-file
class TestDataSource<T> implements DataSource<{ id: string, name: string }> {

  datastream: BehaviorSubject<T[]> = new BehaviorSubject([]);
  total: BehaviorSubject<number> = new BehaviorSubject(0);
  page = 1;
  countElement = 500;
  subscriptionsList: Subscription[] = [];

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

  get list(): Observable<any[]> {
    return of(itemsList);
  }

  /**
   * Return an observable that contains the items list
   */
  connect(collectionViewer: CollectionViewer): Observable<any> {
    this.subscriptionsList.push(
      collectionViewer.viewChange.pipe(
        tap(value => {
          if (value.end > this.displayedElement && this.cachedData.length <= this.total.getValue()) {
            this.page += 1;
            this.changePage();
          }
        })
      ).subscribe()
    );

    return this.datastream;
  }

  changePage() {
    return this.list.pipe(
      take(1),
      tap(data => {
          this.cachedData = data;
          this.total.next(data.length);
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

// tslint:disable-next-line:max-classes-per-file
@Component({
  template: `
      <kal-list [dataSource]="dataSource"
                [icon]="icon"
                (selectionChange)="selectRow($event)">

          <ng-template kalListItem let-item="item">
              {{ item.name }}
          </ng-template>

      </kal-list>
  `
})
class TestListItemWithObservableComponent {

  icon = 'keyboard_arrow_right';

  dataSource = of([
    {
      id: '1',
      name: 'Item 1',
      disabled: true,
    },
    {
      id: '2',
      name: 'Item 2',
      disabled: false,
    },
    {
      id: '3',
      name: 'Item 3',
      disabled: false,
    },
  ]);

  selectRow($event) {
  }

}

describe('TestListItemComponent', () => {
  let component: TestListItemComponent;
  let fixture: ComponentFixture<TestListItemComponent>;
  let groupElement: DebugElement[];
  let disabled: DebugElement[];
  let kalListInstances: KalListComponent<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalListModule,
        KalIconModule,
        KalCheckboxModule,
        ScrollingModule
      ],
      declarations: [
        TestListItemComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestListItemComponent);
    component = fixture.componentInstance;

    const kalList = kalListFunction(fixture);
    kalListInstances = kalListInstanceFunction(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 3 items', fakeAsync(() => {
    finishInit(fixture);

    const kalListItems = kalListItemsFunction(fixture);

    expect(kalListItems.length).toEqual(3);
  }));

  it('should create 3 icons', fakeAsync(() => {
    finishInit(fixture);
    const iconsDebugElements = iconsDebugElementsFunction(fixture);

    expect(iconsDebugElements.length).toEqual(3);
  }));

  it('should display items in list component', fakeAsync(() => {
    finishInit(fixture);
    const kalListItems = kalListItemsFunction(fixture);

    expect(kalListItems[0].nativeElement.innerText.trim()).toEqual('Item 1');
    expect(kalListItems[1].nativeElement.innerText.trim()).toEqual('Item 2');
    expect(kalListItems[2].nativeElement.innerText.trim()).toEqual('Item 3');
  }));

  it('should select an item (single mode)', fakeAsync(() => {
    spyOn(kalListInstances.selectionChange, 'emit');

    finishInit(fixture);

    const checkboxList = checkboxListFunction(fixture);
    const kalListItems = kalListItemsFunction(fixture);

    expect(checkboxList.length).toEqual(0);

    kalListItems.forEach(
      (item, index) => {
        item.nativeElement.click();
        expect(kalListInstances.isRowSelected(itemsList[index])).toBeTruthy();
        expect(kalListInstances.selectionChange.emit).toHaveBeenCalled();

        expect(kalListInstances.selection.format())
          .toEqual(new KalSelectionModel({added: [itemsList[index]], numberOfItems: itemsList.length}).format());
      }
    );
  }));

  it('should select an item (multiple mode)', fakeAsync(() => {
    const kalListInstance = kalListInstanceFunction(fixture);

    spyOn(kalListInstance.selectionChange, 'emit');
    component.selectionMode = 'multiple';

    finishInit(fixture);

    const checkboxList = checkboxListFunction(fixture);
    const kalListItems = kalListItemsFunction(fixture);

    expect(checkboxList.length).toEqual(3);

    kalListItems.forEach(
      (item, index) => {
        item.nativeElement.click();
        expect(kalListInstances.isRowSelected(itemsList[index])).toBeTruthy();
        expect(kalListInstances.selectionChange.emit).toHaveBeenCalled();
      }
    );

    expect(kalListInstances.selection.format()).toEqual(new KalSelectionModel({
      added: [...itemsList],
      numberOfItems: itemsList.length
    }).format());
  }));

  it('should clear the selection', fakeAsync(() => {
    finishInit(fixture);
    const item = itemsList[0];

    kalListInstances.selectItem(item);

    expect(kalListInstances.isRowSelected(item)).toBeTruthy();

    kalListInstances.clear();

    expect(kalListInstances.isRowSelected(item)).toBeFalsy();
  }));

  it('should group items', fakeAsync(() => {
    component.groupByFunction = (item) => item['name'].charAt(0).toLocaleUpperCase();

    finishInit(fixture);

    groupElement = fixture.debugElement.queryAll(By.css('.kal-list__group'));

    expect(groupElement.length).toEqual(1);
  }));

  it('should disable row', fakeAsync(() => {
    finishInit(fixture);

    const kalListItems = kalListItemsFunction(fixture);
    component.disableRowsFunction = (item) => item['disabled'];

    fixture.detectChanges();

    kalListItems[0].nativeElement.click();

    expect(kalListInstances.isRowSelected(itemsList[0])).toBeFalsy();

    disabled = fixture.debugElement.queryAll(By.css('.kal-list__item--disabled'));

    expect(disabled.length).toEqual(1);
  }));

  it('should highlight a row', fakeAsync(() => {

    finishInit(fixture);

    spyOn(kalListInstances.highlighted, 'emit');

    const selectedItem = itemsList[0];
    const kalListItems = kalListItemsFunction(fixture);

    component.selectRowOnContentClick = true;

    fixture.detectChanges();

    let highlighted = fixture.debugElement.queryAll(By.css('.kal-list__item--highlighted'));

    expect(kalListInstances.selectRowOnContentClick).toBeTruthy();
    expect(kalListInstances.highlightedItem).toBeNull();
    expect(highlighted.length).toEqual(0);

    kalListItems[0].nativeElement.click();

    fixture.detectChanges();

    highlighted = fixture.debugElement.queryAll(By.css('.kal-list__item--highlighted'));

    expect(kalListInstances.highlightedItem).toEqual(selectedItem);
    expect(kalListInstances.highlighted.emit).toHaveBeenCalledWith(selectedItem);
    expect(highlighted.length).toEqual(1);

  }));
});

describe('TestListItemWithObservableComponent', () => {
  let component: TestListItemWithObservableComponent;
  let fixture: ComponentFixture<TestListItemWithObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalListModule,
        KalIconModule,
        KalCheckboxModule,
        ScrollingModule
      ],
      declarations: [
        TestListItemWithObservableComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestListItemWithObservableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 3 items', fakeAsync(() => {
    finishInit(fixture);
    const kalListItems = kalListItemsFunction(fixture);
    expect(kalListItems.length).toEqual(3);
  }));

  it('should create 3 icons', fakeAsync(() => {
    finishInit(fixture);
    const iconsDebugElements = iconsDebugElementsFunction(fixture);
    expect(iconsDebugElements.length).toEqual(3);
  }));

  it('should display items in list component', fakeAsync(() => {
    finishInit(fixture);
    const kalListItems = kalListItemsFunction(fixture);

    expect(kalListItems[0].nativeElement.innerText.trim()).toEqual('Item 1');
    expect(kalListItems[1].nativeElement.innerText.trim()).toEqual('Item 2');
    expect(kalListItems[2].nativeElement.innerText.trim()).toEqual('Item 3');
  }));
});

function kalListDebugElementsFunction(fixture) {
  return fixture.debugElement.query(By.directive(KalListComponent));
}

function kalListFunction(fixture) {
  return fixture.debugElement.query(By.css('kal-list'));
}

function kalListItemsFunction(fixture) {
  return fixture.debugElement.queryAll(By.css('.kal-list__content'));
}

function iconsDebugElementsFunction(fixture) {
  return fixture.debugElement.queryAll(By.directive(KalIconComponent));
}

function checkboxListFunction(fixture) {
  return fixture.debugElement.queryAll(By.directive(KalCheckboxComponent));
}

function kalListInstanceFunction(fixture) {
  const kalListDebugElements = kalListDebugElementsFunction(fixture);
  return kalListDebugElements.injector.get(KalListComponent);
}

/** Finish initializing the virtual scroll component at the beginning of a test. */
function finishInit(fixture: ComponentFixture<any>) {
  // On the first cycle we render and measure the viewport.
  fixture.detectChanges();
  flush();

  // On the second cycle we render the items.
  fixture.detectChanges();
  flush();
}
