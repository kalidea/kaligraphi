import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CdkPortal } from '@angular/cdk/portal';

import { KalSelectComponent } from './kal-select.component';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { KalOptionComponent, KalOptionModule } from '../../atoms/kal-option/kal-option.module';
import { Platform } from '@angular/cdk/platform';

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

      expect(component.select.panelOpen).toBe(true);
    });

    it('should close the panel when a click occurs outside the panel', fakeAsync(() => {
      trigger.click();
      fixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

      backdrop.click();
      fixture.detectChanges();
      flush();

      expect(overlayContainerElement.textContent).toEqual('');
      expect(fixture.componentInstance.select.panelOpen).toBe(false);
    }));

    it('should to have so many option as html when is open', () => {
      component.select.open();
      const options = fixture.debugElement.queryAll(By.css('kal-option'));

      expect(component.select.options.length).toBe(options.length);
    });

    it('Doit afficher la liste d\'éléments donnée', () => {
      trigger.click();

      expect(overlayContainerElement.textContent).toContain('Steak');
      expect(overlayContainerElement.textContent).toContain('Pizza');
    });

    it('Doit pouvoir avoir un label par défaut', () => {
      fixture.detectChanges();
      const placeHolder = fixture.debugElement.query(By.css('.kal-select-placeholder'));

      expect(placeHolder.nativeElement.textContent).toEqual('Sélectionnez un élément');
    });

    it('Doit fermer lorsque lon selection', () => {
      trigger.click();
      const options = fixture.debugElement.query(By.css('.kal-option-selection')).nativeElement;
      options.click();

      expect(component.select.panelOpen).toEqual(false);
    });

    it('Doit pouvoir sélectionner une valeur dans la liste', () => {
      trigger.click();
      const options = fixture.debugElement.query(By.css('.kal-option-selection')).nativeElement;
      options.click();

      const selectedOption = component.select.selected as KalOptionComponent;

      expect(component.select.selected).toEqual(component.options.first);
      expect(selectedOption.active).toEqual(true);
    });

    it('Doit pouvoir sélectionner plusieurs valeurs', () => {
      component.select.multiple = true;

      trigger.click();
      const options = fixture.debugElement.queryAll(By.css('.kal-option-selection'));
      options.map(o => o.nativeElement.click());

      const selectedOptions = component.select.selected as KalOptionComponent[];

      expect(selectedOptions.length).toEqual(component.options.length);
      expect(component.select.options.filter(o => o.active).length).toEqual(component.options.length);
      expect(component.select.panelOpen).toEqual(true);
    });

    it('Doit pouvoir selectionner une valeur lorsqu\'on utilise les flèches', () => {

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

    it('Doit sélectionner la première valeur lorsqu\'il n\'y a qu\'un seul élément', () => {
      const selectedOption = component.select.selected as KalOptionComponent;
      expect(selectedOption.viewValue).toEqual('Steak');
    });

  });

});

@Component({
  selector: 'kal-test-select',
  template: `
    <kal-select placeHolder="Sélectionnez un élément">
      <kal-option>Steak</kal-option>
      <kal-option>Pizza</kal-option>
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

