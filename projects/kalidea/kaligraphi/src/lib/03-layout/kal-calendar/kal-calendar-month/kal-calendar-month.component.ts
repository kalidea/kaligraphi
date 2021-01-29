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

import { KalDate } from '../../../02-form/kal-date/kal-date';
import { KalDatepickerComponent } from '../../../02-form/kal-datepicker/kal-datepicker.component';
import { DateUnits } from '../kal-calendar-multi-view/kal-calendar-multi-view.component';

@Component({
  selector: 'kal-calendar-month',
  templateUrl: './kal-calendar-month.component.html',
  styleUrls: ['./kal-calendar-month.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCalendarMonthComponent implements OnInit {

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
    return KalDate.days().map(day => day.charAt(0).toLocaleUpperCase());
  }

  /**
   * Getter to display dates of displayed month.
   */
  refreshMonthDatesList(): void {
    this.monthDatesList = [];
    const firstDayOfCurrentMonth = this._currentDate.startOf('months');
    const firstDayOfLastWeekOfPreviousMonth = firstDayOfCurrentMonth.startOf('weeks');
    const lastDayOfNextWeekOfNextMonth = firstDayOfCurrentMonth.add(5, 'weeks').endOf('weeks');

    // number of days with float part to not miss a day
    const numberOfDays = lastDayOfNextWeekOfNextMonth.diff(firstDayOfLastWeekOfPreviousMonth.getDate(), 'days');

    // create an array with all days in selected date month
    for (let i = 0; i < (numberOfDays); i++) {
      this.monthDatesList.push(new KalDate(firstDayOfLastWeekOfPreviousMonth.add(i, 'days')));
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
    this.currentDate = this.currentDate.add(amount, 'months');
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
