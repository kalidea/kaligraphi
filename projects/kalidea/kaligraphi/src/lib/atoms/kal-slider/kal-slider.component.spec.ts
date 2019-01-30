import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalSliderComponent } from './kal-slider.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('KalSliderComponent logic', () => {
  let component: KalSliderComponent;
  let fixture: ComponentFixture<KalSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KalSliderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get closest value', () => {

    component.from = 0;
    component.to = 900;
    component.tick = 100;

    const positionsList = [
      {position: 10, expected: 0},
      {position: 49, expected: 0},
      {position: 51, expected: 100},
      {position: 99, expected: 100},
      {position: 101, expected: 100},
      {position: 149, expected: 100},
      {position: 151, expected: 200},
      {position: 249, expected: 200},
      {position: 251, expected: 300},
      {position: 349, expected: 300},
      {position: 351, expected: 400},
    ];

    positionsList.forEach(event => {
      component.value = event.position;
      expect(component.value).toEqual(event.expected);
    });
  });

  it('should manage min and max', () => {

    const min = 150;
    const max = 750;

    component.from = 0;
    component.to = 900;
    component.tick = 100;
    component.min = min;
    component.max = max;

    const positionsList = [
      {position: 50, expected: min},
      {position: 101, expected: min},
      {position: 149, expected: min},
      {position: 151, expected: 200},
      {position: 249, expected: 200},
      {position: 251, expected: 300},
      {position: 701, expected: 700},
      {position: 751, expected: max},
      {position: 800, expected: max},
      {position: 850, expected: max},
    ];

    positionsList.forEach(event => {
      component.value = event.position;
      expect(component.value).toBe(event.expected, `${event.position} should be transform to ${event.expected} (got ${component.value})`);
    });
  });

  it('should build styles for max container', () => {
    component.from = 0;
    component.to = 1000;
    expect(component.maxContainerStyles()['width.%']).toEqual(0);
    component.max = 900;
    expect(component.maxContainerStyles()['width.%']).toEqual(90);
  });

  it('should build styles for selection container', () => {
    component.from = 0;
    component.to = 1000;
    component.value = 800;
    expect(component.selectionContainerStyles()['width.%']).toEqual(80);
    component.value = 900;
    expect(component.selectionContainerStyles()['width.%']).toEqual(90);
  });

  it('should update value on writeValue', () => {
    component.from = 0;
    component.to = 10;
    component.tick = 1;
    component.writeValue(6);
    expect(component.value).toBe(6, 'component should store current value when sette with form control');
  });

  it('should manage `from` input', () => {
    component.from = 1;
    component.to = 11;
    component.tick = 1;
    expect(component.valueToPercent(6)).toEqual(50);
    expect(component.valueToPercent(11)).toEqual(100);
  });

  it('should not use max if max is undefined or null', () => {
    component.from = 0;
    component.to = 10;
    component.tick = 1;

    // 0
    component.max = 0;
    component.value = 5;
    expect(component.value).toBe(0, 'max(0) should be managed');

    // null
    component.max = null;
    component.value = 6;
    expect(component.value).toBe(6, 'max(null) should be managed');

    // undefined
    component.max = undefined;
    component.value = 7;
    expect(component.value).toBe(7, 'max(undefined) should be managed');

  });
});

@Component({
  selector: 'kal-test',
  template: `
    <kal-slider [formControl]="control" from="0" to="10" #slider></kal-slider>
  `
})
export class KalTestComponent {
  control = new FormControl();

  from = 0;

  to = 10;

  @ViewChild(KalSliderComponent) slider: KalSliderComponent;
}

describe('KalSliderComponent view', () => {
  let component: KalTestComponent;
  let fixture: ComponentFixture<KalTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [KalSliderComponent, KalTestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update view on writeValue ', () => {
    expect(component.slider.selectionContainerStyles()['width.%']).toBe(0, 'selection container should be 0% width');
    component.control.patchValue(4);
    expect(component.slider.selectionContainerStyles()['width.%']).toBe(40, 'selection container should be 40% width');
  });

});
