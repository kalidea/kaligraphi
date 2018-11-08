import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';

import { KalMonthCalendarComponent } from './kal-month-calendar.component';
import { KalDatepickerComponent } from '../kal-datepicker.component';

describe('KalMonthCalendarComponent', () => {
  let component: KalMonthCalendarComponent;
  let fixture: ComponentFixture<KalMonthCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KalMonthCalendarComponent
      ],
      providers: [
        Overlay,
        KalDatepickerComponent
      ]
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
