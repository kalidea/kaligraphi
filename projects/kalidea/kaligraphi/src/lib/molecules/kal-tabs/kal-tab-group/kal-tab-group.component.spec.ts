import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalTabGroupComponent } from './kal-tab-group.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { KalTabComponent } from '../kal-tab/kal-tab.component';
import { KalTabHeaderComponent } from '../kal-tab-header/kal-tab-header.component';

@Component({
  template: `
    <kal-tab-group>
      <kal-tab>
      </kal-tab>
      <kal-tab>
      </kal-tab>
      <kal-tab>
      </kal-tab>
    </kal-tab-group>
  `
})
class TestTabGroupComponent {
}

describe('KalTabGroupComponent', () => {
  let component: TestTabGroupComponent;
  let fixture: ComponentFixture<TestTabGroupComponent>;
  let groupDebugElement: DebugElement;
  let tabDebugElements: DebugElement[];
  let tabHeaderDebugElements: DebugElement[];
  let groupInstance: KalTabGroupComponent;
  let tabInstances: KalTabComponent[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestTabGroupComponent,
        KalTabGroupComponent,
        KalTabComponent,
        KalTabHeaderComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    groupDebugElement = fixture.debugElement.query(By.directive(KalTabGroupComponent));
    tabDebugElements = fixture.debugElement.queryAll(By.directive(KalTabComponent));
    tabHeaderDebugElements = fixture.debugElement.queryAll(By.directive(KalTabHeaderComponent));

    groupInstance = groupDebugElement.injector.get<KalTabGroupComponent>(KalTabGroupComponent);
    tabInstances = tabDebugElements.map(debugEl => debugEl.componentInstance);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains 3 tabs', () => {
    expect(tabHeaderDebugElements.length).toEqual(3);
  });

  it('should ...', () => {

  });
});
