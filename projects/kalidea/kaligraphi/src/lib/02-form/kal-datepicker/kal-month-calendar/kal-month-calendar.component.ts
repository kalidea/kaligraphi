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
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

import { KalDatepickerComponent } from '../kal-datepicker.component';
import { KalDate } from '../kal-date';
import { capitalize } from '../../../utils/helpers/strings';
import { move } from '../../../utils/helpers/arrays';

/**
 * Configure DayJS
 */
dayjs.extend(localeData);
dayjs.extend(weekday);

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

  displayedDate: KalDate;

  constructor(@Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent,
              private cdr: ChangeDetectorRef) {
  }

  /**
   * Getter to display dates of displayed month.
   */
  get datesList(): KalDate[] {
    const datesList: KalDate[] = [];
    const firstDayOfCurrentMonth = this.displayedDate.getDate().startOf('month');
    const firstDayOfLastWeekOfPreviousMonth = firstDayOfCurrentMonth.startOf('week');

    // create an array with all days in selected date month
    for (let i = 0; i < (firstDayOfCurrentMonth.weekday() + firstDayOfCurrentMonth.daysInMonth()); i++) {
      datesList.push(new KalDate(firstDayOfLastWeekOfPreviousMonth.add(i, 'day')));
    }

    return datesList;
  }

  /**
   * Returns an array of standalone narrowed weekdays.
   * @example ['M', 'T', ...]
   */
  get narrowWeekDays(): string[] {
    const days: string[] = dayjs().localeData().weekdaysMin().map(day => capitalize(day).charAt(0));
    const firstDayOfWeek: number = dayjs().localeData().firstDayOfWeek();

    // Handle the display depending on the beginning of the week.
    // On european countries the week starts on `Monday` but on DayJS, days array starts with `Sunday`.
    // We move `Sunday` at the end of the array if needed.
    return firstDayOfWeek > 0 ? move(days, 0, days.length - 1) : days;
  }

  /**
   * Returns the date stored in the datepicker if it's valid else the current date.
   * We should do this to still display something with the datepicker even if the given
   * date is invalid.
   */
  get currentDate(): KalDate {
    return this.datepicker.currentDate.valid ? this.datepicker.currentDate : new KalDate();
  }

  set currentDate(date: KalDate) {
    this.displayedDate = date;
    this.cdr.markForCheck();
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
  pickDate($event: MouseEvent, date: KalDate): void {
    $event.stopPropagation();
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
    return this.currentDate.getDay() === date.getDay() &&
      this.currentDate.getMonth() === date.getMonth() &&
      this.currentDate.getYear() === date.getYear();
  }

  ngOnInit(): void {
    // avoid reference
    this.displayedDate = new KalDate(this.currentDate || null);
  }
}
