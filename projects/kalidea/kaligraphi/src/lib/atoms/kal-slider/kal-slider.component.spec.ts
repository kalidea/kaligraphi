import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalSliderComponent } from './kal-slider.component';
import { HammerInput } from 'projects/kalidea/kaligraphi/src/lib/utils/gestures/gesture-annotations';

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

  const slideToPosition = (position) => {
    const width = component.sliderDimensions;
    const x = component.sliderDimensions.left + position;
    const preventDefault = () => {
    };
    component.slide({center: {x, y: 10}, preventDefault} as HammerInput);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get closest value', () => {

    component.from = 0;
    component.to = 900;
    component.tick = 100;

    const positionsList = [
      {x: 10, expected: 0},
      {x: 49, expected: 0},
      {x: 51, expected: 100},
      {x: 99, expected: 100},
      {x: 101, expected: 100},
      {x: 149, expected: 100},
      {x: 151, expected: 200},
      {x: 249, expected: 200},
      {x: 251, expected: 300},
      {x: 349, expected: 300},
      {x: 351, expected: 400},
    ];

    positionsList.forEach(event => {
      component.value = event.x;
      expect(component.value).toEqual(event.expected);
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
