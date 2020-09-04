import { async, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';

import { KalMenuTriggerForDirective } from 'projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive';
import { KalMenuComponent, KalMenuModule } from 'projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu.module';
import { KalOptionModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.module';

/**
 * Custom component to test directive
 * => isolated test unit
 * @link https://angular.io/docs/ts/latest/testing/#!#isolated-unit-tests
 */
@Component({
  template: `
    <span [kalMenuTriggerFor]="menu">
      toggle
    </span>

    <kal-menu (selectionChange)="mainOutput($event)" #menu>
      <kal-option (selectionChange)="optionOutput($event)">Option 1</kal-option>
      <kal-option (selectionChange)="optionOutput($event)">Option 2</kal-option>
      <kal-option (selectionChange)="optionOutput($event)">Option 3</kal-option>
    </kal-menu>
  `
})
class TestComponent {
  @ViewChild('menu', {static: true}) menu: KalMenuComponent;

  mainOutput($event) {}

  optionOutput($event) {}
}

function clickFirstOption() {
  document.querySelector<HTMLElement>('kal-option div').click();
}

describe('KalMenu', () => {

  let trigger: DebugElement;
  let component: TestComponent;
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [KalOptionModule, KalMenuModule, OverlayModule],
      declarations: [TestComponent]
    }).createComponent(TestComponent);
    // initial binding
    fixture.detectChanges();

    component = fixture.componentRef.instance;

    // all elements with an attached DisableDirective
    trigger = fixture.debugElement.query(By.directive(KalMenuTriggerForDirective));
  });


  const getContent = () => document.querySelector<HTMLElement>('.' + component.menu.contentClass);


  it('should open menu on click', () => {

    expect(getContent()).toBeFalsy();

    trigger.nativeElement.click();

    fixture.whenStable().then(() => {
      expect(getContent()).toBeTruthy();
    });
  });

  it('should close menu on selection', ((done) => {
    trigger.nativeElement.click();

    fixture.whenStable().then(() => {
      clickFirstOption();

      fixture.whenStable().then(() => {
        expect(getContent()).toBeFalsy();
        done();
      });
    });
  }));

  it('should output selected option', ((done) => {
    trigger.nativeElement.click();

    fixture.whenStable().then(() => {
      const spy1 = spyOn(component, 'mainOutput');
      const spy2 = spyOn(component, 'optionOutput');

      clickFirstOption();

      fixture.whenStable().then(() => {
        expect(spy1).toHaveBeenCalledWith(component.menu.options.first);
        expect(spy2).toHaveBeenCalledWith(component.menu.options.first);
        done();
      });
    });
  }));

});
