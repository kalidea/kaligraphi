import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

import { KalMonthCalendarComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component';
import { KalDatepickerModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.module';

fdescribe('KalMonthCalendarComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalDatepickerModule
      ],
      declarations: [
        TestComponent,
      ],
      providers: [
        Overlay,
        KalDatepickerComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should')
});

@Component({
  selector: 'kal-test-month-calendar',
  template: `
    <kal-month-calendar></kal-month-calendar>
  `
})
export class TestComponent {
}
