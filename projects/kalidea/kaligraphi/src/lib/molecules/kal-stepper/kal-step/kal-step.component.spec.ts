import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalStepComponent } from './kal-step.component';

describe('KalStepComponent', () => {
  let component: KalStepComponent;
  let fixture: ComponentFixture<KalStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
