import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { KalDate } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  date: KalDate;

  selectedDates = [
    new KalDate('02/09/2020'),
    new KalDate('20/09/2020')
  ];
  newdate: KalDate;

  constructor() {
  }

  datePicked($event: KalDate) {
    this.date = $event;
  }

  ngOnInit(): void {
  }


}
