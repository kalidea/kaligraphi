import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

import {KalDatepickerComponent} from '../kal-datepicker.component';
import {KalDate} from '../kal-date';
import {DateUnits} from '../kal-datepicker-multi-view/kal-datepicker-multi-view.component';
import {move} from '../../../utils/helpers/arrays';

/**
 * Configure DayJS
 */
dayjs.extend(weekday);

@Component({
  selector: 'kal-month-calendar',
  templateUrl: './kal-month-calendar.component.html',
  styleUrls: ['./kal-month-calendar.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalMonthCalendarComponent implements OnInit {

  /**
   * Emits when a new date is selected.
   */
  @Output() readonly datePicked = new EventEmitter<KalDate>();

  /**
   * Date to mark as Selected
   */
  @Input() selectedDate: KalDate = new KalDate();

  /**
   * Dates to mark as active
   */
  @Input() activatedDates: KalDate[] = [];

  monthDatesList: KalDate[] = [];

  constructor(@Optional() @Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent,
              public cdr: ChangeDetectorRef) {
  }

  private _currentDate: KalDate;

  /**
   * Returns the date stored in the datepicker if it's valid else the current date.
   * We should do this to still display something with the datepicker even if the given
   * date is invalid.
   */
  get currentDate(): KalDate {
    // return this.datepicker?.currentDate?.valid ? this.datepicker?.currentDate : new KalDate();
    return this._currentDate;
  }

  set currentDate(date: KalDate) {
    this._currentDate = date?.valid ? date : new KalDate();
    this.refreshMonthDatesList();
    this.cdr.markForCheck();
  }

  /**
   * Returns an array of standalone narrowed weekdays.
   * @example ['M', 'T', ...]
   */
  get narrowWeekDays(): string[] {
    const days: string[] = dayjs().localeData().weekdaysMin().map(day => day.charAt(0).toLocaleUpperCase());
    const firstDayOfWeek: number = dayjs().localeData().firstDayOfWeek();

    // Handle the display depending on the beginning of the week.
    // On european countries the week starts on `Monday` but on DayJS, days array starts with `Sunday`.
    // We move `Sunday` at the end of the array if needed.
    return firstDayOfWeek > 0 ? move(days, 0, days.length - 1) : days;
  }

  /**
   * Getter to display dates of displayed month.
   */
  refreshMonthDatesList(): void {
    this.monthDatesList = [];
    const firstDayOfCurrentMonth = this._currentDate.getDate().startOf('month');
    const firstDayOfLastWeekOfPreviousMonth = firstDayOfCurrentMonth.startOf('week');
    const lastDayOfNextWeekOfNextMonth = firstDayOfCurrentMonth.add(5, 'week').endOf('week');

    // number of days with float part to not miss a day
    const numberOfDays = lastDayOfNextWeekOfNextMonth.diff(firstDayOfLastWeekOfPreviousMonth, 'day', true);

    // create an array with all days in selected date month
    for (let i = 0; i < (numberOfDays); i++) {
      this.monthDatesList.push(new KalDate(firstDayOfLastWeekOfPreviousMonth.add(i, 'day')));
    }
  }

  /**
   * Whether we should add a `gray` class to our button.
   * It allows us to gray the days of the previous month.
   */
  isDateFromAnotherMonth(date: KalDate): boolean {
    return date.getMonth() !== this.currentDate.getMonth();
  }

  /**
   * Change displayed month according to which arrow was clicked on datepicker header.
   */
  updateMonth(amount: number) {
    this.currentDate = this.currentDate.add(amount, 'month');
    this.cdr.markForCheck();
  }

  /**
   * Change displayed month according to the selected month and the selected year.
   */
  updateDate({unit, value}: DateUnits) {
    this.currentDate = this.currentDate.set(unit, value);
    this.cdr.markForCheck();
  }

  /**
   * Handles when a new date is selected.
   */
  pickDate($event: MouseEvent, date: KalDate): void {
    $event.stopPropagation();
    this.currentDate = date;
    this.datePicked.emit(date);
  }

  /**
   * Whether the given date is valid according to validator.
   * It allows us to enable and disable the buttons.
   */
  shouldDisable(date: KalDate) {
    const parentValidator = this.datepicker?.parentControlValidator;
    return parentValidator ? parentValidator({value: date} as AbstractControl) !== null : false;
  }

  /**
   * Whether the day in the given date is the displayed day.
   */
  isDayActivated(date: KalDate): boolean {
    return !!this.activatedDates.find(d => date.isSame(d));
  }

  ngOnInit(): void {
    // avoid reference
    this.currentDate = this.selectedDate;
  }
}
