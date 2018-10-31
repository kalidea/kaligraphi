import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalDatepickerComponent } from './kal-datepicker.component';

describe('KalDatepickerComponent', () => {
  let component: KalDatepickerComponent;
  let fixture: ComponentFixture<KalDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
