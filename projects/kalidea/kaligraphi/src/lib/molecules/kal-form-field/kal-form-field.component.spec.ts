import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalFormFieldComponent } from './kal-form-field.component';

describe('KalFormFieldComponent', () => {
  let component: KalFormFieldComponent;
  let fixture: ComponentFixture<KalFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
