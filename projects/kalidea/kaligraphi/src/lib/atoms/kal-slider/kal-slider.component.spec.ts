import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalSliderComponent } from './kal-slider.component';

describe('KalSliderComponent', () => {
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
});
