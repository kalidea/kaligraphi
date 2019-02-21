import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DateObjectUnits, Info } from 'luxon';
import { KalDatepickerComponent } from '../kal-datepicker.component';
import { KalDate } from '../kal-date';

@Component({
  selector: 'kal-month-calendar',
  templateUrl: './kal-month-calendar.component.html',
  styleUrls: ['./kal-month-calendar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalMonthCalendarComponent implements OnInit {

  /**
   * Returns an array of standalone narrowed weekdays.
   * @example ['L', 'M', ...]
   */
  readonly narrowWeekDays = Info.weekdays('narrow');

  /**
   * Emits when a new date is selected.
   */
  @Output() readonly datePicked = new EventEmitter<KalDate>();

  displayedDate: KalDate;

  constructor(@Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent,
              private cdr: ChangeDetectorRef) {
  }

  /**
   * Getter to display dates of displayed month.
   */
  get datesList(): KalDate[] {
    const startMonth = this.displayedDate.getDate().startOf('month');
    const datesList: KalDate[] = [];
    const startWeekOfMonth = startMonth.startOf('week');
    const endWeek = startWeekOfMonth.endOf('month');

    // Count days between the first weekday of the first monthday and the first monthday.
    // We should add 1 because we want to include the last day in the computation
    const countWeekDays = startMonth.weekday !== 1 ? (endWeek.day - startWeekOfMonth.day) + 1 : 0;

    // create an array with all days in selected date month
    for (let i = 0; i < (countWeekDays + startMonth.daysInMonth); i++) {
      datesList.push(new KalDate(startWeekOfMonth.plus({days: i})));
    }

    return datesList;
  }

  /**
   * Whether we should add a `hidden` class to our button.
   * It allows us to hide the days of the previous month.
   */
  isDateHidden(date: KalDate): boolean {
    return date.getMonth() !== this.displayedDate.getMonth();
  }

  /**
   * Change displayed month according to which arrow was clicked on datepicker header.
   */
  updateMonth(amount: number) {
    this.displayedDate = this.displayedDate.add({months: amount});
    this.cdr.markForCheck();
  }

  /**
   * Change displayed month according to the selected month and the selected year.
   */
  updateDate(dateUnit: DateObjectUnits) {
    this.displayedDate = this.displayedDate.set(dateUnit);
    this.cdr.markForCheck();
  }

  /**
   * Handles when a new date is selected.
   */
  pickDate(date: KalDate): void {
    this.datePicked.emit(date);
  }

  /**
   * Whether the given date is valid according to validator.
   * It allows us to enable and disable the buttons.
   */
  shouldDisable(date: KalDate) {
    const parentValidator = this.datepicker.parentControlValidator;
    return parentValidator ? parentValidator({value: date} as AbstractControl) !== null : false;
  }

  /**
   * Whether the day in the given date is the displayed day.
   */
  isDaySelected(date: KalDate): boolean {
    return this.datepicker.currentDate.getDay() === date.getDay() &&
      this.datepicker.currentDate.getMonth() === date.getMonth() &&
      this.datepicker.currentDate.getYear() === date.getYear();
  }

  ngOnInit(): void {
    // avoid reference
    this.displayedDate = new KalDate(this.datepicker.currentDate || null);
  }
}
