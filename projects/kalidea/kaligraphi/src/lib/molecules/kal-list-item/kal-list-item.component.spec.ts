import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { KalListItemModule } from 'projects/kalidea/kaligraphi/src/lib/molecules/kal-list-item/kal-list-item.module';
import {
  KalListComponent,
  KalListItemComponent
} from 'projects/kalidea/kaligraphi/src/lib/molecules/kal-list-item/kal-list-item.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <kal-list>
      <kal-list-item>
      </kal-list-item>
      <kal-list-item>
      </kal-list-item>
      <kal-list-item>
      </kal-list-item>
    </kal-list>
  `
})
class TestListItemComponent {
  disabled = false;
}

describe('TestListItemComponent', () => {
  let component: TestListItemComponent;
  let fixture: ComponentFixture<TestListItemComponent>;
  let listItemDebugElements: DebugElement[];
  let listItemInstances: KalListItemComponent[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestListItemComponent,
        KalListComponent,
        KalListItemComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    listItemDebugElements = fixture.debugElement.queryAll(By.directive(KalListItemComponent));
    listItemInstances = listItemDebugElements.map(element => element.componentInstance);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 3 elements', () => {
    expect(listItemDebugElements.length).toEqual(3);
  });
});
