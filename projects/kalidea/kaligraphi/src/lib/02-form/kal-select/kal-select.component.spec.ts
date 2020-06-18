import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CdkPortal } from '@angular/cdk/portal';
import { Platform } from '@angular/cdk/platform';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';

import { KalSelectComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component';
import { KalOptionComponent, KalOptionModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.module';
import { KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';
import { KalUtilityModule } from 'projects/kalidea/kaligraphi/src/lib/99-utility/kal-utility.module';

function configureTestingModule(declarations: any[]) {
  TestBed.configureTestingModule({
    declarations: [KalSelectComponent, CdkPortal, ...declarations],
    providers: [Overlay],
    imports: [KalOptionModule, KalIconModule, KalUtilityModule]
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
      trigger = fixture.debugElement.query(By.css('.kal-select__trigger')).nativeElement;

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

    it('should close the panel when a click occurs outside the panel', () => {
      trigger.click();
      fixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

      backdrop.click();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toEqual('');
      expect(fixture.componentInstance.select.panelOpen).toBeFalsy();
    });

    it('should to have so many option as option components when is open', () => {
      component.select.open();
      const options = fixture.debugElement.queryAll(By.directive(KalOptionComponent));

      expect(component.select.options.length).toBe(options.length);
    });

    it('should display given optionsComponent', () => {
      trigger.click();

      component.options.map(o => expect(overlayContainerElement.textContent).toContain(o.viewValue));
    });

    it('should set a default label', () => {
      fixture.detectChanges();
      const placeHolder = fixture.debugElement.query(By.css('.kal-select__placeholder'));

      expect(placeHolder.nativeElement.textContent).toEqual('Sélectionnez un élément');
    });

    it('should close when option is clicked', () => {
      trigger.click();
      const options = fixture.debugElement.query(By.css('.kal-option__selection')).nativeElement;
      options.click();

      expect(component.select.panelOpen).toBeFalsy();
    });

    it('should reset the select', () => {
      component.select.select('Option 2');
      expect(component.select.selectedValue).toEqual('Option 2');
      component.select.reset();
      expect(component.select.selectedValue).toBeNull();
    });

    // todo @frank repare for angular 7
    // it('should reset active item on close', () => {
    //   component.select.select('Option 2');
    //   component.select.open();
    //
    //   expect((component.select.selected as KalOptionComponent).isHighlighted).toBeTruthy();
    //   component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
    //   expect((component.select.selected as KalOptionComponent).isHighlighted).toBeFalsy();
    //   component.select.close();
    //   expect((component.select.selected as KalOptionComponent).isHighlighted).toBeTruthy();
    // });

    it('should select an option in option list', () => {
      const spy = spyOn(component.select.valueChanges, 'emit');
      trigger.click();
      const options = fixture.debugElement.query(By.css('.kal-option__selection')).nativeElement;
      options.click();

      const selectedOption = component.select.selected as KalOptionComponent;

      expect(component.select.selected).toEqual(component.options.first);
      expect(selectedOption.active).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(component.select.selectedValue);
    });

    it('should emit an event when selection change', () => {
      const spy = spyOn(component.select.valueChanges, 'emit');

      component.select.open();
      const options = fixture.debugElement.query(By.css('.kal-option__selection')).nativeElement;
      options.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should select an option in option list by select method', () => {
      component.select.select('Option 2');
      const selectedOption = component.select.selected as KalOptionComponent;

      expect(selectedOption).toEqual(component.select.options.find((item, index) => index === 2));
      expect(selectedOption.isHighlighted).toBeTruthy();
      expect(selectedOption.active).toBeTruthy();
    });

    it('should select multiple option in option list', () => {
      const spy = spyOn(component.select.valueChanges, 'emit');
      component.select.multiple = true;

      trigger.click();
      const options = fixture.debugElement.queryAll(By.css('.kal-option__selection'));
      options.map(o => o.nativeElement.click());

      const selectedOptions = component.select.selected as KalOptionComponent[];

      expect(selectedOptions.length).toEqual(component.options.length);
      expect(component.select.options.filter(o => o.active).length).toEqual(component.options.length);
      expect(component.select.panelOpen).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(component.select.selectedValue);
    });


    // todo @frank repare for angular 7
    // it('should select optionsComponent via the UP/DOWN arrow keys', () => {
    //   component.select.focus();
    //
    //   component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
    //   component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
    //   component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
    //
    //   expect(component.select.optionsComponent.first.isHighlighted).toBeTruthy();
    //   expect(component.select.optionsComponent.first.active).toBeTruthy();
    //   expect(component.select.selected).toEqual(component.optionsComponent.first);
    //
    //   component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
    //   component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
    //   component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
    //
    //   const optionsPos1 = component.select.optionsComponent.find((item, index) => index === 1);
    //   expect(optionsPos1.isHighlighted).toBeTruthy();
    //   expect(optionsPos1.active).toBeTruthy();
    //   expect(component.select.selected).toEqual(optionsPos1);
    //
    //   expect(component.select.optionsComponent.first.isHighlighted).toBeFalsy();
    //   expect(component.select.optionsComponent.first.active).toBeFalsy();
    // });

    // it('should select multiple optionsComponent via the UP/DOWN arrow keys on multiple select', () => {
    //   component.select.multiple = true;
    //   component.select.focus();
    //   component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
    //   component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
    //   component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
    //
    //   expect(component.select.optionsComponent.first.isHighlighted).toBeTruthy();
    //   expect(component.select.optionsComponent.first.active).toBeTruthy();
    //
    //   let selectedOptions = component.select.selected as KalOptionComponent[];
    //   expect(selectedOptions.length).toEqual(1);
    //
    //   component.select.handleKeydown(createKeyboardEvent('keydown', DOWN_ARROW));
    //   component.select.handleKeydown(createKeyboardEvent('keydown', ENTER));
    //
    //   const optionsPos1 = component.select.optionsComponent.find((item, index) => index === 1);
    //   expect(optionsPos1.isHighlighted).toBeTruthy();
    //   expect(optionsPos1.active).toBeTruthy();
    //   expect(component.select.optionsComponent.first.isHighlighted).toBeFalsy();
    //   expect(component.select.optionsComponent.first.active).toBeTruthy();
    //
    //   selectedOptions = component.select.selected as KalOptionComponent[];
    //   expect(selectedOptions.length).toEqual(2);
    // });

  });

  describe('TestSelectOneComponent', () => {
    let component: TestSelectOneComponent;
    let fixture: ComponentFixture<TestSelectOneComponent>;

    beforeEach(async(() => {
      configureTestingModule([TestSelectOneComponent]);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectOneComponent);
      component = fixture.componentInstance;
    });

    it('should select the first option when there is only one option', () => {
      fixture.detectChanges();
      const selectedOption = component.select.selected as KalOptionComponent;
      expect(selectedOption.viewValue).toEqual(component.options.first.viewValue);
    });

    it('should disable the first option selection when there is one option in options list', () => {
      component.disableFirstOptionSelection = true;
      fixture.detectChanges();
      const selectedOption = component.select.selected as KalOptionComponent;
      expect(selectedOption).toEqual(null);
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
  @ViewChild(KalSelectComponent, {static: true}) select: KalSelectComponent;

  @ViewChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;
}

@Component({
  selector: 'kal-test-select-one',
  template: `
    <kal-select [disableFirstOptionSelection]="disableFirstOptionSelection">
      <kal-option>Steak</kal-option>
    </kal-select>`
})
class TestSelectOneComponent {

  disableFirstOptionSelection = false;

  @ViewChild(KalSelectComponent, {static: true}) select: KalSelectComponent;

  @ViewChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;
}

