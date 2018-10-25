import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalStepperComponent } from './kal-stepper.component';

describe('KalStepperComponent', () => {
  let component: KalStepperComponent;
  let fixture: ComponentFixture<KalStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
