import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KalCalendarComponent, KalCalendarModule } from './kal-calendar.module';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import range from 'lodash-es/range';
import { KalDate } from 'projects/kalidea/kaligraphi/src/lib/99-utility/kal-date/kal-date';

describe('KalCalendarComponent', () => {
  let component: KalCalendarComponent;
  let fixture: ComponentFixture<KalCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KalCalendarModule]
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

const statusList = [
  {className: 'status-yellow', numbers: range(1, 10)},
  {className: 'status-red', numbers: range(10, 20)},
  {className: 'status-green', numbers: range(20, 30)},
];

describe('TestCalendarComponent', () => {
  let component: TestCalendarComponent;
  let fixture: ComponentFixture<TestCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCalendarComponent
      ],
      imports: [
        KalCalendarModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add specific class to days', () => {

    const daysButtonElementList = fixture.debugElement.queryAll(By.css('kal-calendar-month button'));
    const getButtonValue = (b: HTMLButtonElement) => +(b.textContent.trim());

    for (const button of daysButtonElementList) {
      const value = +(button.nativeElement.textContent.trim());
      // find status
      const className = statusList.find(s => s.numbers.includes(value))?.className;
      if (className) {
        expect((button.nativeElement as HTMLButtonElement).classList.contains(className))
          .withContext(`day ${value} should have class ${className}`)
          .toBeTrue();
      }
    }

  });
});

@Component({
  selector: 'kal-calendar-test',
  template: `
    <kal-calendar-month [classesListBuilder]="classesListBuilder"></kal-calendar-month>
  `,
})
export class TestCalendarComponent {
  classesListBuilder: (date: KalDate) => Record<string, boolean>;

  constructor() {
    this.classesListBuilder = date => {
      const className = statusList.find(s => s.numbers.includes(date.getDay()))?.className;
      if (className) {
        return {[className]: true};
      } else {
        return {};
      }
    };
  }
}
