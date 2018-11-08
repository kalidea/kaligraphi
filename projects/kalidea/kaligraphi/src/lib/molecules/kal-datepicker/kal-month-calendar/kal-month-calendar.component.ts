import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DateObjectUnits, Info } from 'luxon';
import { KalDatepickerComponent } from '../kal-datepicker.component';
import { coerceKalDateProperty, KalDate } from '../kal-date';

@Component({
  selector: 'kal-month-calendar',
  templateUrl: './kal-month-calendar.component.html',
  styleUrls: ['./kal-month-calendar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalMonthCalendarComponent {

  /**
   * Returns an array of standalone narrowed weekdays.
   * @example ['L', 'M', ...]
   */
  readonly narrowWeekDays = Info.weekdays('narrow');

  /**
   * Emits when a new date is selected.
   */
  @Output() readonly datePicked = new EventEmitter<KalDate>();

  private displayedKalDate: KalDate;

  constructor(@Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent,
              private cdr: ChangeDetectorRef) {
  }

  @Input()
  get displayedDate(): KalDate {
    return this.displayedKalDate;
  }

  set displayedDate(date: KalDate) {
    if (!date) {
      date = new KalDate();
    } else {
      date = coerceKalDateProperty(date);
    }

    this.displayedKalDate = date;
    this.cdr.markForCheck();
  }

  /**
   * Getter to display dates of displayed month.
   */
  get datesList(): KalDate[] {
    const displayedDate = this.displayedDate ? this.displayedDate.getDate() : null;

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

  /**
   * Change displayed month according to which arrow was clicked on datepicker header.
   */
  updateMonth(amount: number) {
    this.displayedDate = this.displayedDate.add({months: amount});
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
    return this.datepicker.parentControlValidator({value: date}) !== null;
  }

  /**
   * Whether the day in the given date is the displayed day.
   */
  isDaySelected(date: KalDate): boolean {
    return this.displayedDate.getDay() === date.getDay();
  }

}
