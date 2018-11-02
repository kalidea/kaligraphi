import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalMonthCalendarComponent } from './kal-month-calendar.component';

describe('KalMonthCalendarComponent', () => {
  let component: KalMonthCalendarComponent;
  let fixture: ComponentFixture<KalMonthCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalMonthCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalMonthCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
