import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalDatepickerMonthViewComponent } from './kal-datepicker-month-view.component';

describe('KalDatepickerMonthViewComponent', () => {
  let component: KalDatepickerMonthViewComponent;
  let fixture: ComponentFixture<KalDatepickerMonthViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalDatepickerMonthViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalDatepickerMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
