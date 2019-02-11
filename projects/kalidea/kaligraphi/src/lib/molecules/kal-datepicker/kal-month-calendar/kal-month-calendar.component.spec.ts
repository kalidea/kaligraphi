import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

import { KalMonthCalendarComponent } from './kal-month-calendar.component';

import { KalDatepickerComponent } from '../kal-datepicker.component';
import { KalDatepickerModule } from '../kal-datepicker.module';

describe('KalMonthCalendarComponent', () => {
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
});

@Component({
  selector: 'kal-test-month-calendar',
  template: `
    <kal-datepicker></kal-datepicker>
  `
})
export class TestComponent {
}
