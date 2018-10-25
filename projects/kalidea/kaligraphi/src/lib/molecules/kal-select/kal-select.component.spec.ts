import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CdkPortal} from '@angular/cdk/portal';
import {KalSelectComponent} from './kal-select.component';
import {Overlay, OverlayContainer} from '@angular/cdk/overlay';
import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {KalOptionComponent, KalOptionModule} from '../../atoms/kal-option/kal-option.module';
import {Platform} from '@angular/cdk/platform';
import {DOWN_ARROW, ENTER} from '@angular/cdk/keycodes';
import { createKeyboardEvent } from '../../utils/tests/event-keyboard';

function configureTestingModule(declarations: any[]) {
  TestBed.configureTestingModule({
    declarations: [KalSelectComponent, CdkPortal, ...declarations],
    providers: [Overlay],
    imports: [KalOptionModule]
  }).compileComponents();
}

describe('TestSelectComponent', () => {

  describe('KalSelectComponent', () => {
    let component: TestSelectComponent;
    let fixture: ComponentFixture<TestSelectComponent>;
    let overlayContainer: OverlayContainer;
    let platform: Platform;
    let overlayContainerElement: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(async(() => {
      configureTestingModule([TestSelectComponent]);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.kal-select-trigger')).nativeElement;

      overlayContainer = fixture.debugElement.injector.get(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      platform = fixture.debugElement.injector.get(Platform);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should open the panel when trigger is clicked', () => {
      trigger.click();

      expect(component.select.panelOpen).toBeTruthy();
    });

    it('should close the panel when a click occurs outside the panel', fakeAsync(() => {
      trigger.click();
      fixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

      backdrop.click();
      fixture.detectChanges();
      flush();

      expect(overlayContainerElement.textContent).toEqual('');
      expect(fixture.componentInstance.select.panelOpen).toBeFalsy();
    }));

    it('should to have so many option as option components when is open', () => {
      component.select.open();
      const options = fixture.debugElement.queryAll(By.directive(KalOptionComponent));

      expect(component.select.options.length).toBe(options.length);
    });

    it('should display given options', () => {
      trigger.click();

      component.options.map(o => expect(overlayContainerElement.textContent).toContain(o.viewValue));
    });

    it('should set a default label', () => {
      fixture.detectChanges();
      const placeHolder = fixture.debugElement.query(By.css('.kal-select-placeholder'));

      expect(placeHolder.nativeElement.textContent).toEqual('Sélectionnez un élément');
    });

    it('should close when option is clicked', () => {
      trigger.click();
      const options = fixture.debugElement.query(By.css('.kal-option-selection')).nativeElement;
      options.click();

      expect(component.select.panelOpen).toBeFalsy();
    });

    it('should select an option in option list', () => {
      trigger.click();
      const options = fixture.debugElement.query(By.css('.kal-option-selection')).nativeElement;
      options.click();

      const selectedOption = component.select.selected as KalOptionComponent;

      expect(component.select.selected).toEqual(component.options.first);
      expect(selectedOption.active).toBeTruthy();
    });

    it('should select multiple option in option list', () => {
      component.select.multiple = true;

      trigger.click();
      const options = fixture.debugElement.queryAll(By.css('.kal-option-selection'));
      options.map(o => o.nativeElement.click());

      const selectedOptions = component.select.selected as KalOptionComponent[];

      expect(selectedOptions.length).toEqual(component.options.length);
      expect(component.select.options.filter(o => o.active).length).toEqual(component.options.length);
      expect(component.select.panelOpen).toBeTruthy();
    });

    it('should select options via the UP/DOWN arrow keys', () => {
      component.select.focus();

      component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
      component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
      component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));

      expect(component.select.options.first.isHighlighted).toBeTruthy();
      expect(component.select.options.first.active).toBeTruthy();
      expect(component.select.selected).toEqual(component.options.first);

      component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
      component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
      component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));

      const optionsPos1 = component.select.options.find((item, index) => index === 1);
      expect(optionsPos1.isHighlighted).toBeTruthy();
      expect(optionsPos1.active).toBeTruthy();
      expect(component.select.selected).toEqual(optionsPos1);

      expect(component.select.options.first.isHighlighted).toBeFalsy();
      expect(component.select.options.first.active).toBeFalsy();
    });

    it('should select multiple options via the UP/DOWN arrow keys on multiple select', () => {
      component.select.multiple = true;
      component.select.focus();
      component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
      component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
      component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));

      expect(component.select.options.first.isHighlighted).toBeTruthy();
      expect(component.select.options.first.active).toBeTruthy();

      let selectedOptions = component.select.selected as KalOptionComponent[];
      expect(selectedOptions.length).toEqual(1);

      component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
      component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));

      const optionsPos1 = component.select.options.find((item, index) => index === 1);
      expect(optionsPos1.isHighlighted).toBeTruthy();
      expect(optionsPos1.active).toBeTruthy();
      expect(component.select.options.first.isHighlighted).toBeFalsy();
      expect(component.select.options.first.active).toBeTruthy();

      selectedOptions = component.select.selected as KalOptionComponent[];
      expect(selectedOptions.length).toEqual(2);
    });

  });

  describe('TestSelectOneComponent', () => {
    let component: TestSelectComponent;
    let fixture: ComponentFixture<TestSelectComponent>;

    beforeEach(async(() => {
      configureTestingModule([TestSelectOneComponent]);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectOneComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should select the first option when there is only one option', () => {
      const selectedOption = component.select.selected as KalOptionComponent;
      expect(selectedOption.viewValue).toEqual(component.options.first.viewValue);
    });

  });

});

@Component({
  selector: 'kal-test-select',
  template: `
    <kal-select placeholder="Sélectionnez un élément">
      <kal-option *ngFor="let i of [0, 1, 2, 3]">Option {{i}}</kal-option>
    </kal-select>`
})
class TestSelectComponent {
  @ViewChild(KalSelectComponent) select: KalSelectComponent;
  @ViewChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;
}

@Component({
  selector: 'kal-test-select-one',
  template: `
    <kal-select>
      <kal-option>Steak</kal-option>
    </kal-select>`
})
class TestSelectOneComponent {
  @ViewChild(KalSelectComponent) select: KalSelectComponent;
  @ViewChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;
}

