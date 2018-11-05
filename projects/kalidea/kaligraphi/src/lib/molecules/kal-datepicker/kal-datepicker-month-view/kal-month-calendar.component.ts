import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Info } from 'luxon';
import { coerceKalDateProperty, KalDate } from '../kal-date';

@Component({
  selector: 'kal-month-calendar',
  templateUrl: './kal-month-calendar.component.html',
  styleUrls: ['./kal-month-calendar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalMonthCalendarComponent implements OnInit {

  /**
   * Emits when a new date is selected.
   */
  @Output() readonly datePicked = new EventEmitter<KalDate>();

  private readonly narrowWeekDays = Info.weekdays('narrow');

  private selectedKalDate: KalDate;

  constructor(private cdr: ChangeDetectorRef) {
  }

  get weekDays(): string[] {
    return this.narrowWeekDays;
  }

  @Input()
  get selectedDate(): KalDate {
    return this.selectedKalDate;
  }

  set selectedDate(date: KalDate) {
    if (!date) {
      date = new KalDate();
    } else {
      date = coerceKalDateProperty(date);
    }

    this.selectedKalDate = date;
    this.cdr.markForCheck();
  }

  /**
   * getter for displayed dates of current month
   */
  get datesList(): KalDate[] {
    const displayedDate = this.selectedDate ? this.selectedDate.getDate() : null;

    if (!displayedDate) {
      return [];
    }

    const startMonth = displayedDate.startOf('month');

    const datesList: KalDate[] = [];

    // create an array with all days in selected date month
    for (let i = 0; i < startMonth.daysInMonth; i++) {
      datesList.push(new KalDate(startMonth.plus({days: i})));
    }

    return datesList;
  }

  updateMonth(amount: number) {
    this.selectedDate = this.selectedDate.add({months: amount});
    this.cdr.markForCheck();
  }

  /**
   * Handles when a new date is selected.
   */
  pickDate(date: KalDate): void {
    this.datePicked.emit(date);
  }

  ngOnInit() {
  }

}
