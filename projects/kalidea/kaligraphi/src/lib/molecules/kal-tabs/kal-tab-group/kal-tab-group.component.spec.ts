import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';
import { RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';

import { KalTabGroupComponent } from './kal-tab-group.component';
import { KalTabComponent } from '../kal-tab/kal-tab.component';
import { KalTabHeaderComponent } from '../kal-tab-header/kal-tab-header.component';
import { KalTabBodyComponent } from '../kal-tab-body/kal-tab-body.component';
import { KalTabLabelDirective } from '../kal-tab-label.directive';
import { createKeyboardEvent } from '../../../utils/tests/event-keyboard';

@Component({
  template: `
    <kal-tab-group>
      <kal-tab label="Header 1" selected>
        Body 1
      </kal-tab>
      <kal-tab label="Header 2">
        Body 2
      </kal-tab>
      <kal-tab label="Header 3" [disabled]="disabled">
        Body 3
      </kal-tab>
    </kal-tab-group>
  `
})
class TestTabGroupWithLabelComponent {
  disabled = false;
}

@Component({
  template: `
    <kal-tab-group>
      <kal-tab selected>
        <ng-template kalTabLabel>
          Header 1
        </ng-template>
        Body 1
      </kal-tab>
      <kal-tab>
        <ng-template kalTabLabel>
          Header 2
        </ng-template>
        Body 2
      </kal-tab>
      <kal-tab>
        <ng-template kalTabLabel>
          Header 3
        </ng-template>
        Body 3
      </kal-tab>
    </kal-tab-group>
  `
})
class TestGroupWithTemplateLabelComponent {
  disabled = false;
}

fdescribe('KalTabGroupComponent', () => {
  let component: TestTabGroupWithLabelComponent;
  let fixture: ComponentFixture<TestTabGroupWithLabelComponent>;
  let groupDebugElement: DebugElement;
  let tabHeaderDebugElements: DebugElement[];
  let tabBodyDebugElements: DebugElement[];
  let groupInstance: KalTabGroupComponent;
  let tabHeaderInstances: KalTabHeaderComponent[];
  let headers: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PortalModule
      ],
      declarations: [
        TestTabGroupWithLabelComponent,
        KalTabGroupComponent,
        KalTabComponent,
        KalTabHeaderComponent,
        KalTabBodyComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabGroupWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    groupDebugElement = fixture.debugElement.query(By.directive(KalTabGroupComponent));
    tabBodyDebugElements = fixture.debugElement.queryAll(By.directive(KalTabBodyComponent));
    tabHeaderDebugElements = fixture.debugElement.queryAll(By.directive(KalTabHeaderComponent));
    headers = fixture.debugElement.queryAll(By.css('kal-tab-header'));

    groupInstance = groupDebugElement.injector.get<KalTabGroupComponent>(KalTabGroupComponent);
    tabHeaderInstances = tabHeaderDebugElements.map(debugEl => debugEl.componentInstance);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains 3 tabs body', () => {
    expect(tabBodyDebugElements.length).toEqual(3);
  });

  it('should contains tabs header', () => {
    expect(tabHeaderDebugElements.length).toEqual(3);
  });

  it('should display the header label', () => {
    expect(tabHeaderDebugElements[0].nativeElement.innerText.trim()).toEqual('Header 1');
    expect(tabHeaderDebugElements[1].nativeElement.innerText.trim()).toEqual('Header 2');
    expect(tabHeaderDebugElements[2].nativeElement.innerText.trim()).toEqual('Header 3');
  });

  it('should selected the first tab header', () => {
    expect(tabHeaderInstances[0].selected).toBeTruthy();
    expect(tabHeaderInstances[1].selected).toBeFalsy();
    expect(tabHeaderInstances[2].selected).toBeFalsy();
  });

  it('should set the kal tab body is active class to the body component if the tab is selected', () => {
    let itemsList = tabBodyDebugElements[0].nativeElement.classList;
    let newItemsList = Array.from(itemsList);
    let hasClass = newItemsList.some(element => element === 'kal-tab-body-is-active');

    expect(hasClass).toBeTruthy();

    itemsList = tabBodyDebugElements[1].nativeElement.classList;
    newItemsList = Array.from(itemsList);
    hasClass = newItemsList.some(element => element === 'kal-tab-body-is-active');

    expect(hasClass).toBeFalsy();

    itemsList = tabBodyDebugElements[2].nativeElement.classList;
    newItemsList = Array.from(itemsList);
    hasClass = newItemsList.some(element => element === 'kal-tab-body-is-active');

    expect(hasClass).toBeFalsy();

  });

  it('should display all body component with template', () => {
    expect(tabBodyDebugElements[0].nativeElement.innerText.trim()).toEqual('Body 1');
    expect(tabBodyDebugElements[1].nativeElement.innerText.trim()).toEqual('Body 2');
    expect(tabBodyDebugElements[2].nativeElement.innerText.trim()).toEqual('Body 3');
  });

  it('should select a tab header', () => {
    expect(groupInstance.selectedIndex).toEqual(0);

    headers[1].nativeElement.click();

    expect(groupInstance.selectedIndex).toEqual(1);
  });

  it('should disabled one tab header', () => {
    expect(groupInstance.selectedIndex).toEqual(0);

    headers[1].nativeElement.click();

    expect(groupInstance.selectedIndex).toEqual(1);

    headers[2].nativeElement.click();

    expect(groupInstance.selectedIndex).toEqual(2);

    component.disabled = true;

    fixture.detectChanges();

    headers[1].nativeElement.click();

    expect(groupInstance.selectedIndex).toEqual(1);

    headers[2].nativeElement.click();

    expect(groupInstance.selectedIndex).toEqual(1);

  });

  it('should emit an event with the selected tab index', () => {
    spyOn(groupInstance.selectedTab, 'emit');

    expect(groupInstance.selectedIndex).toEqual(0);

    headers[2].nativeElement.click();

    expect(groupInstance.selectedIndex).toEqual(2);

    expect(groupInstance.selectedTab.emit).toHaveBeenCalled();
  });

  it('should select tab via the LEFT/RIGHT arrow keys', () => {
    groupInstance.focus();
    groupInstance.handleKeydown(createKeyboardEvent('keydown', RIGHT_ARROW));
    const tabHeaderHighlighted = groupInstance.headers.find((item, index) => index === groupInstance.selectedIndex);

    expect(tabHeaderHighlighted.highlighted).toBeTruthy();
  });

});

describe('KalTabGroupComponent', () => {
  let component: TestGroupWithTemplateLabelComponent;
  let fixture: ComponentFixture<TestGroupWithTemplateLabelComponent>;
  let groupDebugElement: DebugElement;
  let tabHeaderDebugElements: DebugElement[];
  let tabBodyDebugElements: DebugElement[];
  let groupInstance: KalTabGroupComponent;
  let tabHeaderInstances: KalTabHeaderComponent[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PortalModule
      ],
      declarations: [
        TestGroupWithTemplateLabelComponent,
        KalTabGroupComponent,
        KalTabComponent,
        KalTabHeaderComponent,
        KalTabBodyComponent,
        KalTabLabelDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGroupWithTemplateLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    groupDebugElement = fixture.debugElement.query(By.directive(KalTabGroupComponent));
    tabBodyDebugElements = fixture.debugElement.queryAll(By.directive(KalTabBodyComponent));
    tabHeaderDebugElements = fixture.debugElement.queryAll(By.directive(KalTabHeaderComponent));

    groupInstance = groupDebugElement.injector.get<KalTabGroupComponent>(KalTabGroupComponent);
    tabHeaderInstances = tabHeaderDebugElements.map(debugEl => debugEl.componentInstance);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains 3 tabs body', () => {
    expect(tabBodyDebugElements.length).toEqual(3);
  });

  it('should contains tabs header', () => {
    expect(tabHeaderDebugElements.length).toEqual(3);
  });

  it('should display the header label', () => {
    expect(tabHeaderDebugElements[0].nativeElement.innerText.trim()).toEqual('Header 1');
    expect(tabHeaderDebugElements[1].nativeElement.innerText.trim()).toEqual('Header 2');
    expect(tabHeaderDebugElements[2].nativeElement.innerText.trim()).toEqual('Header 3');
  });

  it('should display all body component with template', () => {
    expect(tabBodyDebugElements[0].nativeElement.innerText.trim()).toEqual('Body 1');
    expect(tabBodyDebugElements[1].nativeElement.innerText.trim()).toEqual('Body 2');
    expect(tabBodyDebugElements[2].nativeElement.innerText.trim()).toEqual('Body 3');
  });

  it('should selected the first tab header', () => {
    expect(tabHeaderInstances[0].selected).toBeTruthy();
    expect(tabHeaderInstances[1].selected).toBeFalsy();
    expect(tabHeaderInstances[2].selected).toBeFalsy();
  });
});
