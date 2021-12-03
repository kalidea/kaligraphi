import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { KalCalendarComponent, KalDate } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

  @ViewChild(KalCalendarComponent) calendar: KalCalendarComponent;

  date: KalDate;

  selectedDates = [
    new KalDate('02/09/2020'),
    new KalDate('20/09/2020')
  ];

  newdate: KalDate;

  list = [
    'green',
    'blue',
    'red',
    'yellow'
  ];

  updateColors(){
    const [first, ...rest] = this.list;
    this.list = [...rest, first];
    this.calendar.refresh();
    console.log(this.list);
  }

  buildClassForDate = (date: KalDate) => {
    const day = date.getDay();
    if (day > 8 && day < 18) {
      return {[this.list[0]]: true};
    } else if (day > 20 && day < 25) {
      return {[this.list[1]]: true};
    }
    return {};
  };

  datePicked($event: KalDate) {
    this.date = $event;
  }


}
