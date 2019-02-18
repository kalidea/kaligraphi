import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { KalListModule, KalListSelection } from './kal-list.module';
import { KalListComponent, } from './kal-list.component';
import { KalIconComponent } from '../../atoms/kal-icon/kal-icon.component';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';

@Component({
  template: `
    <kal-list [dataSource]="dataSource"
              [groupByFunction]="groupByFunction"
              [disableRowsFunction]="disableRowsFunction"
              [selectionMode]="selectable"
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

  selectable = 'single';

  selectRow($event) {
  }

}

class TestDataSource implements DataSource<{ id: string, name: string }> {

  listItem = [
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

  connect(): Observable<any> {
    return of(this.listItem);
  }

  disconnect() {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 3 _items', () => {
    expect(listItems.length).toEqual(3);
  });

  it('should create 3 icons', () => {
    expect(iconsDebugElements.length).toEqual(3);
  });

  it('should display _items in list component', () => {
    expect(listItems[0].nativeElement.innerText.trim()).toEqual('Item 1');
    expect(listItems[1].nativeElement.innerText.trim()).toEqual('Item 2');
    expect(listItems[2].nativeElement.innerText.trim()).toEqual('Item 3');
  });

  it('should select an item', () => {
    spyOn(listInstances.selectionChange, 'emit');

    listItems[0].nativeElement.click();
    expect(listInstances.isRowSelected(component.dataSource.listItem[0])).toBeTruthy();
    expect(listInstances.selectionChange.emit).toHaveBeenCalledWith(new KalListSelection(
      [component.dataSource.listItem[0]],
      false,
      []
    ));

    listItems[1].nativeElement.click();
    expect(listInstances.selectionChange.emit).toHaveBeenCalledWith(new KalListSelection(
      [component.dataSource.listItem[1]],
      false,
      []
    ));

    listItems[2].nativeElement.click();

    expect(listInstances.isRowSelected(component.dataSource.listItem[2])).toBeTruthy();
    expect(listInstances.selectionChange.emit).toHaveBeenCalledWith(new KalListSelection(
      [component.dataSource.listItem[2]],
      false,
      []
    ));

    component.selectable = 'multiple';
    listInstances.reset();
    fixture.detectChanges();

    listItems[0].nativeElement.click();
    listItems[1].nativeElement.click();
    listItems[2].nativeElement.click();

    expect(listInstances.isRowSelected(component.dataSource.listItem[0])).toBeTruthy();
    expect(listInstances.isRowSelected(component.dataSource.listItem[1])).toBeTruthy();
    expect(listInstances.isRowSelected(component.dataSource.listItem[2])).toBeTruthy();

    expect(listInstances.selectionChange.emit).toHaveBeenCalledWith(new KalListSelection(
      [component.dataSource.listItem[0],
        component.dataSource.listItem[1],
        component.dataSource.listItem[2]],
      false,
      []
    ));
  });

  it('should reset selected item', () => {
    const item = component.dataSource.listItem[0];

    listInstances.selectItem(item);

    expect(listInstances.isRowSelected(item)).toBeTruthy();

    listInstances.reset();

    expect(listInstances.isRowSelected(item)).toBeFalsy();
  });

  it('should group _items', () => {
    component.groupByFunction = (item) => item['name'].charAt(0).toLocaleUpperCase();

    fixture.detectChanges();

    groupElement = fixture.debugElement.queryAll(By.css('.kal-list__group'));

    expect(groupElement.length).toEqual(1);
  });

  it('should disable row', () => {
    component.disableRowsFunction = (item) => item['disabled'];

    fixture.detectChanges();

    listItems[0].nativeElement.click();

    expect(listInstances.isRowSelected(component.dataSource.listItem[0])).toBeFalsy();

    disabled = fixture.debugElement.queryAll(By.css('.kal-list__item--disabled'));

    expect(disabled.length).toEqual(1);
  });
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

  it('should create 3 _items', () => {
    expect(listItems.length).toEqual(3);
  });

  it('should create 3 icons', () => {
    expect(iconsDebugElements.length).toEqual(3);
  });

  it('should display _items in list component', () => {
    expect(listItems[0].nativeElement.innerText.trim()).toEqual('Item 1');
    expect(listItems[1].nativeElement.innerText.trim()).toEqual('Item 2');
    expect(listItems[2].nativeElement.innerText.trim()).toEqual('Item 3');
  });
});
