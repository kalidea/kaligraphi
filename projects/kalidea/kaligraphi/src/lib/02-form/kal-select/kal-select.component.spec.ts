import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CdkPortal } from '@angular/cdk/portal';
import { Platform } from '@angular/cdk/platform';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';

import { KalSelectComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component';
import {
  KalOptionComponent,
  KalOptionGroupComponent,
  KalOptionModule
} from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.module';
import { KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';
import { KalUtilityModule } from 'projects/kalidea/kaligraphi/src/lib/99-utility/kal-utility.module';
import { createDuplicateIdTest } from '../../utils/forms/form-element.spec';
import { KalSelectModule } from './kal-select.module';

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

    const getOverlaySelectDiv = () => overlayContainerElement.querySelector(`.${KalSelectComponent.overlayClassName}`);

    beforeEach(waitForAsync(() => {
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

      component.options.map(o => expect(overlayContainerElement.textContent).toContain(o.getLabel()));
    });

    it('should add information class ( "multiple" ) on overlay', () => {
      component.select.multiple = true;
      trigger.click();
      const multipleClassName = KalSelectComponent.multipleClassName;
      const overlaySelectDivClasses = getOverlaySelectDiv().classList;
      expect(overlaySelectDivClasses.contains(multipleClassName))
        .toBeTruthy(`classList "${overlaySelectDivClasses.value}" should contain class ${multipleClassName}`);
    });

    it('should add custom class to overlay', () => {
      const classes = ['unit-test-is-awesome', 'continous-integration-too'];
      component.select.overlayClassList = classes;
      trigger.click();
      const overlaySelectDivClasses = getOverlaySelectDiv().classList;
      classes.forEach(c => expect(overlaySelectDivClasses.contains(c)).toBeTruthy(
        `classList "${overlaySelectDivClasses.value}" should contain class ${c}`
      ));
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

    it('should unselect an option when its has been disabled', () => {
      trigger.click();

      component.select.select('Option 2');
      expect(component.select.selectedValue).toEqual('Option 2');
      const selectedOption = component.select.selected as KalOptionComponent;
      selectedOption.disabled = true;
      expect(component.select.selectedValue).toBeNull();
    });

    it('should unselect an option which has been disabled in multiple select', () => {
      trigger.click();
      component.select.multiple = true;

      const options = fixture.debugElement.queryAll(By.css('.kal-option__selection'));
      options.map(o => o.nativeElement.click());
      component.select.selection.filter((o, i) => i % 2 === 0).forEach(o => o.disabled = true);

      expect(component.select.options.filter(o => o.active).length).toEqual(component.options.length / 2);


      const selectedOption = component.select.selected as KalOptionComponent;
      selectedOption.disabled = true;
      expect(component.select.selectedValue).toEqual(component.options.filter((o, i) => i % 2 === 1).map(o => o.value));
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

    beforeEach(waitForAsync(() => {
      configureTestingModule([TestSelectOneComponent]);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectOneComponent);
      component = fixture.componentInstance;
    });

    it('should select the first option when there is only one option', () => {
      fixture.detectChanges();
      const selectedOption = component.select.selected as KalOptionComponent;
      expect(selectedOption.getLabel()).toEqual(component.options.first.getLabel());
    });

    it('should disable the first option selection when there is one option in options list', () => {
      component.disableFirstOptionSelection = true;
      fixture.detectChanges();
      const selectedOption = component.select.selected as KalOptionComponent;
      expect(selectedOption).toEqual(null);
    });

  });

  describe('TestSelectOptionGroupComponent', () => {
    let component: TestSelectOptionGroupComponent;
    let fixture: ComponentFixture<TestSelectOptionGroupComponent>;
    let overlayContainer: OverlayContainer;
    let platform: Platform;
    let overlayContainerElement: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(async(() => {
      configureTestingModule([TestSelectOptionGroupComponent]);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectOptionGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      trigger = fixture.debugElement.query(By.css('.kal-select__trigger')).nativeElement;
      overlayContainer = fixture.debugElement.injector.get(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      platform = fixture.debugElement.injector.get(Platform);
    });

    it('should display given optionGroup and optionsComponent', () => {
      trigger.click();
      fixture.detectChanges();

      component.optionsGroup.map(o => expect(overlayContainerElement.textContent).toContain(o.label));
      component.options.map(o => expect(overlayContainerElement.textContent).toContain(o.getLabel()));
    });

    it('should select an option and display opt-group label and its label', () => {
      const spy = spyOn(component.select.valueChanges, 'emit');
      trigger.click();
      const options = fixture.debugElement.query(By.css('.kal-option__selection')).nativeElement;
      options.click();

      const selectedOption = component.select.selected as KalOptionComponent;

      expect(component.select.selected).toEqual(component.options.first);
      expect(selectedOption.active).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(component.select.selectedValue);

      expect(component.select.triggerValue).toEqual(selectedOption.displayLabel);
    });

    it('should unselect an option when its parent option group has been disabled', () => {

      component.select.select('Fixt > Celldweller');

      expect(component.select.selectedValue).toEqual('Fixt > Celldweller');
      (component.select.selected as KalOptionComponent).group.disabled = true;
      expect(component.select.selectedValue).toBeNull();
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

// tslint:disable-next-line:max-classes-per-file
@Component({
  selector: 'kal-test-select-option-group',
  template: `
    <kal-select>
      <kal-option-group label="Fixt">
        <kal-option>Celldweller</kal-option>
        <kal-option>Blue Stahli</kal-option>
        <kal-option>The Algorithm</kal-option>
      </kal-option-group>
      <kal-option-group label="Nuclear Blast">
        <kal-option>Alestorm</kal-option>
        <kal-option>Lord Of The Lost</kal-option>
        <kal-option>Ensiferum</kal-option>
      </kal-option-group>
    </kal-select>
  `
})
class TestSelectOptionGroupComponent {

  @ViewChild(KalSelectComponent, {static: true}) select: KalSelectComponent;

  @ViewChildren(KalOptionGroupComponent) optionsGroup: QueryList<KalOptionGroupComponent>;

  @ViewChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;
}

// tslint:disable-next-line:max-classes-per-file
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

createDuplicateIdTest('kal-select', KalSelectComponent, [KalSelectModule]);
