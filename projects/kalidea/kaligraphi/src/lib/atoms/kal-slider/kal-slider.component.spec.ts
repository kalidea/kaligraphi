import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Type } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { KalSliderComponent } from './kal-slider.component';
import { KalSliderModule } from './kal-slider.module';

describe('KalSliderComponent', () => {
  let sliderDebugElement: DebugElement;
  let sliderNativeElement: HTMLElement;
  let sliderInstance: KalSliderComponent;

  function createComponent<T>(component: Type<T>): ComponentFixture<T> {
    TestBed.configureTestingModule({
      imports: [
        KalSliderModule,
        ReactiveFormsModule
      ],
      declarations: [component]
    })
      .compileComponents();

    return TestBed.createComponent<T>(component);
  }

  describe('basic slider', () => {
    let fixture: ComponentFixture<BasicSliderComponent>;

    beforeEach(() => {
      fixture = createComponent(BasicSliderComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(KalSliderComponent));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
    });

    it('should set the default values', () => {
      expect(sliderInstance.limit).toBe(0);
      expect(sliderInstance.value).toBe(0);
      expect(sliderInstance.disabled).toBeFalsy();
      expect(sliderInstance.step).toBe(1);
      expect(sliderInstance.thumbLabel).toBeFalsy();
      expect(sliderInstance.tickInterval).toBe(0);
    });

    it('should display the thumb label', () => {
      sliderInstance.thumbLabel = true;
      fixture.detectChanges();

      const thumbLabelDiv = fixture.debugElement.query(By.css('.kal-slider-thumb-label'));
      expect(thumbLabelDiv).toBeTruthy();
    });

    it('should display the ticks interval', () => {
      sliderInstance.tickInterval = 25;
      fixture.detectChanges();

      const spans = fixture.debugElement.queryAll(By.css('span'));
      expect(spans.length).toEqual(4);
    });
  });

  describe('slider with reactive form', () => {
    let fixture: ComponentFixture<SliderReactiveFormComponent>;
    let sliderElement: DebugElement;

    beforeEach(() => {
      fixture = createComponent(SliderReactiveFormComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(KalSliderComponent));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
      sliderElement = fixture.debugElement.query(By.css('input[type=range]'));
    });

    it('should set a default value with reactive form', () => {
      expect(sliderInstance.value).toEqual(75);
      expect(sliderElement.properties.value).toEqual(75);

      fixture.componentInstance.control.patchValue(41);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual(41);
      expect(sliderElement.properties.value).toEqual(41);
    });

    it('should be disabled with reactive form', () => {
      expect(sliderInstance.disabled).toBeTruthy();
      expect(sliderElement.properties.disabled).toBeTruthy();

      fixture.componentInstance.control.enable();
      fixture.detectChanges();

      expect(sliderInstance.disabled).toBeFalsy();
      expect(sliderElement.properties.disabled).toBeFalsy();
    });

    it('should work with a limit value and a reactive form', () => {
      sliderInstance.limit = 35;
      fixture.componentInstance.control.patchValue(68);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual(35);
    });

  });

  describe('basic slider with events', () => {
    let fixture: ComponentFixture<SliderWithEventComponent>;
    let sliderElement: DebugElement;

    beforeEach(() => {
      fixture = createComponent(SliderWithEventComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(KalSliderComponent));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
      sliderElement = fixture.debugElement.query(By.css('input[type=range]'));
    });

    it('should set a default value with @Input', () => {
      expect(sliderInstance.value).toEqual(24);
      expect(sliderElement.properties.value).toEqual(24);

      sliderInstance.value = 52;
      fixture.detectChanges();
      expect(sliderInstance.value).toEqual(52);
      expect(sliderElement.properties.value).toEqual(52);
    });

    it('should be disabled with  @Input', () => {
      expect(sliderInstance.disabled).toBeFalsy();
      expect(sliderElement.properties.disabled).toBeFalsy();

      sliderInstance.disabled = true;
      fixture.detectChanges();

      expect(sliderInstance.disabled).toBeTruthy();
      expect(sliderElement.properties.disabled).toBeTruthy();
    });
  });
});

@Component({
  template: `
    <kal-slider></kal-slider>
  `
})
export class BasicSliderComponent {
}

@Component({
  template: `
    <kal-slider [formControl]="control"></kal-slider>
  `
})
export class SliderReactiveFormComponent {
  control = new FormControl({value: 75, disabled: true});
}

@Component({
  template: `
    <kal-slider [value]="24"></kal-slider>
  `
})
export class SliderWithEventComponent {
}
