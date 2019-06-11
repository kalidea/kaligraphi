import { Component, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, flush, fakeAsync,  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { of, animationFrameScheduler } from 'rxjs';

import { KalSelectVirtualScrollComponent } from './kal-select-virtual-scroll.component';
import { KalSelectVirtualScrollModule } from './kal-select-virtual-scroll.module';


describe('TestSelectVirtualScrollComponent', () => {

  describe('KalSelectVirtualScrollComponent', () => {
    let component: TestSelectVirtualScrollComponent;
    let fixture: ComponentFixture<TestSelectVirtualScrollComponent>;
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
      expect(component.selectVirtualScroll.panelOpen).toBeTruthy();
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

    it('should have 3 item rendered in overlay', fakeAsync(() => {
      component.selectVirtualScroll.searchControl.patchValue('');
      component.selectVirtualScroll.open();
      finishInit(fixture);
      const options = overlayContainerElement.querySelectorAll('.kal-select-virtual-scroll__option');
      expect(options.length).toBe(3, 'it should have 3 option displayed');
    }));

    it('should have 1 item rendered in overlay with \'1\' as search term', fakeAsync(() => {
      component.selectVirtualScroll.searchControl.patchValue('1');
      component.selectVirtualScroll.open();
      finishInit(fixture);
      const options = overlayContainerElement.querySelectorAll('.kal-select-virtual-scroll__option');
      expect(options.length).toBe(1, 'it should have 1 option displayed');
    }));

    it('should have an option with a message for when there is no items in options', fakeAsync(() => {
      component.selectVirtualScroll.searchControl.patchValue('aaa');
      component.selectVirtualScroll.open();
      finishInit(fixture);
      const options = overlayContainerElement.querySelectorAll('.kal-select-virtual-scroll__option');
      expect(options.length).toBe(1, 'it should have 1 option displayed');
      expect(options.item(0).textContent).toContain('No results found');
    }));

    it('should update the overlay height if there is less than 10 item', fakeAsync(() => {
      component.selectVirtualScroll.searchControl.patchValue('');
      component.selectVirtualScroll.open();
      finishInit(fixture);
      const selectOverlay = overlayContainerElement.querySelector('.kal-select-virtual-scroll__overlay');
      expect(selectOverlay.clientHeight)
        .toBeLessThan(component.selectVirtualScroll.virtualScrollConfig.height, 'should be less than default height');
      expect(selectOverlay.clientHeight)
        .toBe(component.selectVirtualScroll.virtualScrollConfig.itemSize * 3, 'should be the height of 3 item');

      component.selectVirtualScroll.searchControl.patchValue('1');
      fixture.detectChanges();
      expect(selectOverlay.clientHeight)
        .toBe(component.selectVirtualScroll.virtualScrollConfig.itemSize, 'should be the height of 1 item');
    }));
  });
});

describe('TestSelectVirtualScrollComponent', () => {

  describe('KalSelectVirtualScrollComponent', () => {
    let component: TestSelectVirtualScrollLotsOfDataComponent;
    let fixture: ComponentFixture<TestSelectVirtualScrollLotsOfDataComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let trigger: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          KalSelectVirtualScrollModule
        ],
        declarations: [
          TestSelectVirtualScrollLotsOfDataComponent,
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectVirtualScrollLotsOfDataComponent);
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
      expect(component.selectVirtualScroll.panelOpen).toBeTruthy();
      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

      backdrop.click();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent).toEqual('');
      expect(fixture.componentInstance.selectVirtualScroll.panelOpen).toBeFalsy();
    });

    it('should have 500 options', () => {
      expect(component.selectVirtualScroll.options.length).toBe(500);
    });

    it('should only render 10 options when open (default height 270 divided by itemSize of 27)', fakeAsync(() => {
      trigger.click();
      finishInit(fixture);
      const optionsRendered = overlayContainerElement.querySelectorAll('.kal-select-virtual-scroll__option');
      expect(optionsRendered.length).toBe(10);
    }));

    it('should have an overlay height matching the default height', fakeAsync(() => {
      trigger.click();
      finishInit(fixture);
      const selectOverlay = overlayContainerElement.querySelector('.kal-select-virtual-scroll__overlay');
      expect(selectOverlay.clientHeight).toBe(component.selectVirtualScroll.virtualScrollConfig.height);
    }));

    it('should have an overlay height reduced if there is less than 10 item', fakeAsync(() => {
      component.selectVirtualScroll.searchControl.patchValue('aaa');
      component.selectVirtualScroll.open();
      finishInit(fixture);
      const selectOverlay = overlayContainerElement.querySelector('.kal-select-virtual-scroll__overlay');
      expect(selectOverlay.clientHeight)
        .toBeLessThan(component.selectVirtualScroll.virtualScrollConfig.height, 'should be less than default height');
      expect(selectOverlay.clientHeight)
        .toBe(component.selectVirtualScroll.virtualScrollConfig.itemSize, 'should be the height of 1 item');
    }));


  });
});


/**
 * Finish initializing the virtual scroll component at the beginning of a test.
 * Function from angular/components test on virtual-scroll-viewport
 */
function finishInit(fixture: ComponentFixture<any>) {
  // On the first cycle we render and measure the viewport.
  fixture.detectChanges();
  flush();

  // On the second cycle we render the items.
  fixture.detectChanges();
  flush();

  // Flush the initial fake scroll event.
  animationFrameScheduler.flush();
  flush();
  fixture.detectChanges();
}

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

@Component({
  template: `
    <kal-select-virtual-scroll
      [dataSource]="dataSource">
    </kal-select-virtual-scroll>
  `
})
class TestSelectVirtualScrollLotsOfDataComponent {

  @ViewChild(KalSelectVirtualScrollComponent) selectVirtualScroll: KalSelectVirtualScrollComponent<any>;

  dataSource = of(
    Array(500).fill(0).map((v, i) => {
      return {
        id: i,
        label: `item ${i}`
      };
    })
  );
}
