import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalCalendarComponent } from './kal-calendar.component';

describe('KalCalendarComponent', () => {
  let component: KalCalendarComponent;
  let fixture: ComponentFixture<KalCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
