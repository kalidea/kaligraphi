import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { KalListModule } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.module';
import { KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';
import { KalCheckboxModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.module';
import { KalListComponent, } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component';
import { KalIconComponent } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.component';
import { KalCheckboxComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component';
import { KalSelectionModel } from 'projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection';
import { delay, take, tap } from 'rxjs/operators';

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

// class TestDataSource implements DataSource<{ id: string, name: string }> {
//
//   listItem = [
//     {
//       id: '1',
//       name: 'Item 1',
//       disabled: true,
//     },
//     {
//       id: '2',
//       name: 'Item 2',
//       disabled: false,
//     },
//     {
//       id: '3',
//       name: 'Item 3',
//       disabled: false,
//     },
//   ];
//
//   connect(): Observable<any> {
//     return of(this.listItem);
//   }
//
//   disconnect() {
//   }
// }

const itemsList = (page: number, numberOfElements: number) => {
  const listItem = [];
  const startElement = ((page - 1) * numberOfElements) + 1;
  const total = 1000;
  const numberOfTotalElements = Math.min(total, startElement + numberOfElements);

  for (let i = startElement; i <= numberOfTotalElements; i++) {
    listItem.push(
      {
        id: '' + i,
        name: 'rTest' + i,
        disabled: i === 1
      },
    );
  }

  return of({data: listItem, meta: {total}}).pipe(delay(1000));
};

class TestDataSource<T> implements DataSource<{ id: string, name: string }> {

  private datastream: BehaviorSubject<T[]> = new BehaviorSubject([]);
  private total: BehaviorSubject<number> = new BehaviorSubject(0);
  private page = 1;
  private countElement = 500;

  constructor() {
    this.list.pipe(
      take(1),
      tap(({data, meta}) => {
        this.cachedData = data;
        this.total.next(meta.total);
      })).subscribe();
  }

  private _cachedData: T[] = [];

  set cachedData(values: T[]) {
    this._cachedData.push(...values);
    this.datastream.next(this._cachedData);
  }

  get cachedData(): T[] {
    return this._cachedData;
  }

  get displayedElement(): number {
    return this.page * this.countElement;
  }

  get list(): Observable<{ data, meta }> {
    return itemsList(this.page, this.countElement);
  }

  /**
   * Return an observable that contains the items list
   */
  connect(collectionViewer: CollectionViewer): Observable<any> {
    collectionViewer.viewChange.pipe(
      tap(value => {
        if (value.end > this.displayedElement && this.cachedData.length <= this.total.getValue()) {
          this.page += 1;
          this.changePage();
        }
      })
    ).subscribe();

    return this.datastream;
  }

  changePage() {
    this.list.pipe(
      take(1),
      tap(({data}) => {
          this.cachedData = data;
        }
      )).subscribe();
  }

  disconnect(collectionViewer: CollectionViewer) {
  }
}

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
  let listDebugElements: DebugElement;
  let list: DebugElement;
  let listItems: DebugElement[];
  let iconsDebugElements: DebugElement[];
  let groupElement: DebugElement[];
  let disabled: DebugElement[];
  let listInstances: KalListComponent<any>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalListModule,
        KalIconModule,
        KalCheckboxModule
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
    fixture.detectChanges();

    listDebugElements = fixture.debugElement.query(By.directive(KalListComponent));
    list = fixture.debugElement.query(By.css('kal-list'));
    listItems = fixture.debugElement.queryAll(By.css('.kal-list__content'));
    iconsDebugElements = fixture.debugElement.queryAll(By.directive(KalIconComponent));
    listInstances = listDebugElements.injector.get(KalListComponent);
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 3 items', () => {
    expect(listItems.length).toEqual(3);
  });

  it('should create 3 icons', () => {
    expect(iconsDebugElements.length).toEqual(3);
  });

  it('should display items in list component', () => {
    expect(listItems[0].nativeElement.innerText.trim()).toEqual('Item 1');
    expect(listItems[1].nativeElement.innerText.trim()).toEqual('Item 2');
    expect(listItems[2].nativeElement.innerText.trim()).toEqual('Item 3');
  });

  it('should select an item (single mode)', () => {
    spyOn(listInstances.selectionChange, 'emit');
    const checkboxList = fixture.debugElement.queryAll(By.directive(KalCheckboxComponent));

    expect(checkboxList.length).toEqual(0);

    // listItems.forEach(
    //   (item, index) => {
    //     item.nativeElement.click();
    //     expect(listInstances.isRowSelected(component.dataSource.listItem[index])).toBeTruthy();
    //     expect(listInstances.selectionChange.emit).toHaveBeenCalled();
    //     expect(listInstances.selection.format())
    //       .toEqual(new KalSelectionModel({added: [component.dataSource.listItem[index]], numberOfItems: 3}).format());
    //   }
    // );
  });

  // it('should select an item (multiple mode)', () => {
  //   spyOn(listInstances.selectionChange, 'emit');
  //   component.selectionMode = 'multiple';
  //   fixture.detectChanges();
  //
  //   const checkboxList = fixture.debugElement.queryAll(By.directive(KalCheckboxComponent));
  //
  //   expect(checkboxList.length).toEqual(3);
  //
  //   listItems.forEach(
  //     (item, index) => {
  //       item.nativeElement.click();
  //       expect(listInstances.isRowSelected(component.dataSource.listItem[index])).toBeTruthy();
  //       expect(listInstances.selectionChange.emit).toHaveBeenCalled();
  //     }
  //   );
  //
  //   expect(listInstances.selection.format()).toEqual(new KalSelectionModel({
  //       added: [...component.dataSource.listItem],
  //       numberOfItems: 3
  //     }).format());
  // });
  //
  // it('should clear the selection', () => {
  //   const item = component.dataSource.listItem[0];
  //
  //   listInstances.selectItem(item);
  //
  //   expect(listInstances.isRowSelected(item)).toBeTruthy();
  //
  //   listInstances.clear();
  //
  //   expect(listInstances.isRowSelected(item)).toBeFalsy();
  // });
  //
  // it('should group items', () => {
  //   component.groupByFunction = (item) => item['name'].charAt(0).toLocaleUpperCase();
  //
  //   fixture.detectChanges();
  //
  //   groupElement = fixture.debugElement.queryAll(By.css('.kal-list__group'));
  //
  //   expect(groupElement.length).toEqual(1);
  // });
  //
  // it('should disable row', () => {
  //   component.disableRowsFunction = (item) => item['disabled'];
  //
  //   fixture.detectChanges();
  //
  //   listItems[0].nativeElement.click();
  //
  //   expect(listInstances.isRowSelected(component.dataSource.listItem[0])).toBeFalsy();
  //
  //   disabled = fixture.debugElement.queryAll(By.css('.kal-list__item--disabled'));
  //
  //   expect(disabled.length).toEqual(1);
  // });
  //
  // it('should highlight a row', () => {
  //
  //   spyOn(listInstances.highlighted, 'emit');
  //
  //   const selectedItem = component.dataSource.listItem[0];
  //
  //   component.selectRowOnContentClick = true;
  //
  //   fixture.detectChanges();
  //
  //   let highlighted = fixture.debugElement.queryAll(By.css('.kal-list__item--highlighted'));
  //
  //   expect(listInstances.selectRowOnContentClick).toBeTruthy();
  //
  //   expect(listInstances.highlightedItem).toBeNull();
  //
  //   expect(highlighted.length).toEqual(0);
  //
  //   listItems[0].nativeElement.click();
  //
  //   fixture.detectChanges();
  //
  //   highlighted = fixture.debugElement.queryAll(By.css('.kal-list__item--highlighted'));
  //
  //   expect(listInstances.highlightedItem).toEqual(selectedItem);
  //
  //   expect(listInstances.highlighted.emit).toHaveBeenCalledWith(selectedItem);
  //
  //   expect(highlighted.length).toEqual(1);
  //
  // });
});

describe('TestListItemWithObservableComponent', () => {
  let component: TestListItemWithObservableComponent;
  let fixture: ComponentFixture<TestListItemWithObservableComponent>;
  let listItems: DebugElement[];
  let iconsDebugElements: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalListModule,
        KalIconModule,
        KalCheckboxModule
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
    fixture.detectChanges();

    listItems = fixture.debugElement.queryAll(By.css('.kal-list__content'));
    iconsDebugElements = fixture.debugElement.queryAll(By.directive(KalIconComponent));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 3 items', () => {
    expect(listItems.length).toEqual(3);
  });

  it('should create 3 icons', () => {
    expect(iconsDebugElements.length).toEqual(3);
  });

  it('should display items in list component', () => {
    expect(listItems[0].nativeElement.innerText.trim()).toEqual('Item 1');
    expect(listItems[1].nativeElement.innerText.trim()).toEqual('Item 2');
    expect(listItems[2].nativeElement.innerText.trim()).toEqual('Item 3');
  });
});
