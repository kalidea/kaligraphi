import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { KalListModule } from './kal-list.module';
import { KalListComponent, } from './kal-list.component';
import { KalIconComponent } from '../../atoms/kal-icon/kal-icon.component';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';

@Component({
  template: `
    <kal-list [datasource]="datasource"
              [groupByFunction]="groupByFunction"
              [disableRowsFunction]="disableRowsFunction">

    <ng-template kalListItem let-item="item">
      {{ item.name }}
    </ng-template>

    </kal-list>
  `
})
class TestListItemComponent {

  datasource = new TestDataSource();

  groupByFunction = null;

  disableRowsFunction = null;

}

class TestDataSource implements DataSource<{code: string, name: string}> {

  listItem = [
    {
      code: '1',
      name: 'Item 1',
      disabled: true,
    },
    {
      code: '2',
      name: 'Item 2',
      disabled: false,
    },
    {
      code: '3',
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

  it('should select an item', () => {
    spyOn(listInstances.selectionChange, 'emit');

    listItems[0].nativeElement.click();

    expect(listInstances.isSelected(component.datasource.listItem[0])).toBeTruthy();
    expect(listInstances.selectionChange.emit).toHaveBeenCalledWith(component.datasource.listItem[0]);

    listItems[1].nativeElement.click();

    expect(listInstances.isSelected(component.datasource.listItem[1])).toBeTruthy();
    expect(listInstances.selectionChange.emit).toHaveBeenCalledWith(component.datasource.listItem[1]);

    listItems[2].nativeElement.click();

    expect(listInstances.isSelected(component.datasource.listItem[2])).toBeTruthy();
    expect(listInstances.selectionChange.emit).toHaveBeenCalledWith(component.datasource.listItem[2]);
  });

  it('should reset selected item', () => {
    const item = component.datasource.listItem[0];

    listInstances.selectItem(item);

    expect(listInstances.isSelected(item)).toBeTruthy();

    listInstances.reset();

    expect(listInstances.isSelected(item)).toBeFalsy();
  });

  it('should group items', () => {
    component.groupByFunction = (item) => item['name'].charAt(0).toLocaleUpperCase();

    fixture.detectChanges();

    groupElement = fixture.debugElement.queryAll(By.css('.kal-list__group'));

    expect(groupElement.length).toEqual(1);
  });

  it('should disable row', () => {
    component.disableRowsFunction = (item) => item['disabled'];

    fixture.detectChanges();

    listItems[0].nativeElement.click();

    expect(listInstances.isSelected(component.datasource.listItem[0])).toBeFalsy();

    disabled = fixture.debugElement.queryAll(By.css('.kal-list__item--disabled'));

    expect(disabled.length).toEqual(1);
  });
});
