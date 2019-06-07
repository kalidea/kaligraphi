import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { of } from 'rxjs';

import { KalSelectVirtualScrollComponent } from './kal-select-virtual-scroll.component';
import { KalSelectVirtualScrollModule } from './kal-select-virtual-scroll.module';

@Component({
  template: `
    <kal-select-virtual-scroll
      [dataSource]="dataSource">
    </kal-select-virtual-scroll>
  `
})
class TestSelectVirtualScrollComponent {

  @ViewChild(KalSelectVirtualScrollComponent) selectVirtualScroll: KalSelectVirtualScrollComponent<any>;

  dataSource = of([
    {
      id: 1,
      label: 'Item 1',
    },
    {
      id: 2,
      label: 'Item 2',
    },
    {
      id: 3,
      label: 'Item 3',
    },
  ]);
}

describe('TestSelectVirtualScrollComponent', () => {

  describe('KalSelectVirtualScrollComponent', () => {
    let component: TestSelectVirtualScrollComponent;
    let fixture: ComponentFixture<TestSelectVirtualScrollComponent>;
    let selectOptions: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          KalSelectVirtualScrollModule
        ],
        declarations: [
          TestSelectVirtualScrollComponent,
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectVirtualScrollComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      trigger = fixture.debugElement.query(By.css('.kal-select-virtual-scroll__trigger')).nativeElement;
      overlayContainer = fixture.debugElement.injector.get(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should open the panel when trigger is clicked', (done) => {
      expect(component.selectVirtualScroll.panelOpen).toBeFalsy();
      trigger.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.selectVirtualScroll.panelOpen).toBeTruthy();
        done();
      });
    });

    it('should close the panel when a click occurs outside the panel', () => {
      trigger.click();
      fixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

      backdrop.click();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toEqual('');
      expect(fixture.componentInstance.selectVirtualScroll.panelOpen).toBeFalsy();
    });

    it('should set a default label', () => {
      fixture.detectChanges();
      const placeHolder = fixture.debugElement.query(By.css('.kal-select-virtual-scroll__input'));
      expect(placeHolder.nativeElement.placeholder).toEqual('');
    });

    it('should have 3 item in options with no search term', () => {
      expect(component.selectVirtualScroll.options.length).toBe(3);
    });

    it('should have 1 item in options with \'1\' as search term', () => {
      component.selectVirtualScroll.searchControl.patchValue('1');
      expect(component.selectVirtualScroll.options.length).toBe(1);
    });

    it('should have 0 item in options with \'aaa\' as search term', () => {
      component.selectVirtualScroll.searchControl.patchValue('aaa');
      expect(component.selectVirtualScroll.options.length).toBe(0);
    });

  });
});
