import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  forwardRef,
  Optional, ViewChild, Injector, ChangeDetectorRef, Input, Output, EventEmitter
} from '@angular/core';
import { KalCalendarView, KalDatepickerComponent } from '../kal-datepicker.component';
import { buildProviders, Coerce } from '../../../utils';
import { NgControl } from '@angular/forms';
import { KalCalendarHeaderComponent } from '../kal-datepicker-header/kal-calendar-header.component';
import { KalDate } from '../kal-date';
import dayjs from 'dayjs';
import { capitalize } from '../../../utils/helpers/strings';
import { KalMonthCalendarComponent } from '../kal-month-calendar/kal-month-calendar.component';

@Component({
  selector: 'kal-calendar',
  templateUrl: './kal-calendar.component.html',
  styleUrls: ['./kal-calendar.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalCalendarComponent)
})
export class KalCalendarComponent implements OnInit {

  /**
   * Emits when a new date is selected.
   */
  @Output() readonly datePicked = new EventEmitter<KalDate>();


  /**
   * Reference to `KalDatepickerHeaderComponent`.
   */
  @ViewChild(forwardRef(() => KalCalendarHeaderComponent), {static: false}) datePickerHeader: KalCalendarHeaderComponent;

  /**
   * Reference to `KalMonthCalendarComponent`.
   */
  @ViewChild(KalMonthCalendarComponent, {static: false}) monthCalendar: KalMonthCalendarComponent;

  /**
   * Whether the calendar is in month view.
   */
  currentView: KalCalendarView = 'month';


  private _maxYear: number;

  private _minYear = 1940;

  private readonly yearsIncrement = 30;

  constructor(@Optional() @Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent,
              private cdr: ChangeDetectorRef,
              private injector: Injector) {
  }

  /**
   * Max year that should be displayed in year selection.
   */
  @Input()
  @Coerce('number')
  get maxYear(): number {
    if (this._maxYear) {
      return this._maxYear;
    } else {
      return dayjs().year() + this.yearsIncrement;
    }
  }

  set maxYear(maxYear: number) {
    // check if we have a value and year length is valid
    if (maxYear && ('' + maxYear).length !== 4) {
      return;
    }

    this._maxYear = maxYear;
    this.cdr.markForCheck();
  }

  @Input()
  @Coerce('number')
  get minYear(): number {
    return this._minYear;
  }

  set minYear(minYear: number) {
    // check if year length is valid
    if (('' + minYear).length !== 4) {
      return;
    }

    this._minYear = minYear;
    this.cdr.markForCheck();
  }

  /**
   * Returns the date stored in the datepicker if it's valid else the current date.
   * We should do this to still display something with the datepicker even if the given
   * date is invalid.
   */
  get currentDate(): KalDate {
    return this.datepicker?.currentDate?.valid ? this.datepicker?.currentDate : new KalDate('03/09/2020');
  }

  set currentDate(date: KalDate) {
    this.monthCalendar.currentDate = date;

    this.cdr.markForCheck();
  }

  /**
   * Display the current period : month as string + year.
   */
  get currentPeriod(): string {
    let date: KalDate = null;

    if (this.monthCalendar) {
      date = this.monthCalendar.displayedDate;
    } else if (this.currentDate.valid) {
      date = this.currentDate;
    } else {
      date = new KalDate();
    }

    const month = dayjs().localeData().months()[date.getMonth()];
    return month ? capitalize(month) + ' ' + date.getYear() : '';
  }

  /**
   * Whether the current view is the `multi` view.
   */
  get isMultiView(): boolean {
    return this.currentView === 'multi';
  }

  get parentControlValidator() {
    const parentControl = this.injector.get(NgControl, null);
    return parentControl.control.validator;
  }

  /**
   * Switch between views to display.
   */
  changeCurrentView() {
    this.currentView = this.isMultiView ? 'month' : 'multi';

    // We should manually trigger change detection because header arrows depends on `KalDatepickerComponent`
    // and header doesn't know when it should refresh itself.
    this.datePickerHeader.markForCheck();
  }

  /**
   * Handles when a new date is selected.
   */
  pickDate(date: KalDate): void {
    this.datePicked.emit(date);
  }

  /**
   * Action to do when used in datepicker and closing the overlay
   */
  datePickerClose(date: KalDate) {
    // Set the current view to `month` because if the datepicker is
    // closed then opened it will keep its last view.
    this.currentView = 'month';

    // Reset displayed date to avoid keeping selected month and year in multiview.
    if (this.monthCalendar) {
      this.monthCalendar.displayedDate = this.currentDate;
    }
  }

  /**
   * Update the view according to `$event` parameter.
   * If we receive a `null` value it means that we're currently displaying the `multi` view and
   * we wants to display the `month` view.
   */
  updateView($event: number | null): void {
    if ($event === null) {
      this.changeCurrentView();
    } else {
      this.monthCalendar.updateMonth($event);
    }
  }

  ngOnInit(): void {
  }

}
