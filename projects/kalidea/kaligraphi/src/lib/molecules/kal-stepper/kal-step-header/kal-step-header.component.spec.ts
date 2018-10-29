import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalStepHeaderComponent } from './kal-step-header.component';

describe('KalStepHeaderComponent', () => {
  let component: KalStepHeaderComponent;
  let fixture: ComponentFixture<KalStepHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalStepHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalStepHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
