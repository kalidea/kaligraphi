import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { KalDate } from '../../99-utility/kal-date/kal-date';
import { KalCalendarView } from '../../02-form/kal-datepicker/kal-datepicker.component';
import { buildProviders, Coerce } from '../../utils';
import { capitalize } from '../../utils/helpers/strings';

import {
  KalCalendarMonthComponent,
  KalClassesListBuilderType
} from './kal-calendar-month/kal-calendar-month.component';
import { KalCalendarHeaderComponent } from './kal-calendar-header/kal-calendar-header.component';

@Component({
  selector: 'kal-calendar',
  templateUrl: './kal-calendar.component.html',
  styleUrls: ['./kal-calendar.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalCalendarComponent)
})
export class KalCalendarComponent implements AfterViewInit {

  /**
   * Dates to mark as Active
   */
  @Input() activatedDates: KalDate[] = [];

  @Input() selectedDate = new KalDate();

  /**
   * Emits when a new date is selected.
   */
  @Output() readonly datePicked = new EventEmitter<KalDate>();

  /**
   * Reference to `KalDatepickerHeaderComponent`.
   */
  @ViewChild(forwardRef(() => KalCalendarHeaderComponent), {static: false}) calendarHeader: KalCalendarHeaderComponent;

  /**
   * Reference to `KalMonthCalendarComponent`.
   */
  @ViewChild(KalCalendarMonthComponent, {static: false}) calendarMonth: KalCalendarMonthComponent;

  /**
   * Whether the calendar is in month view.
   */
  currentView: KalCalendarView = 'month';

  private readonly yearsIncrement = 30;

  constructor(private cdr: ChangeDetectorRef,
              private injector: Injector) {
  }

  private _maxYear: number;

  /**
   * Max year that should be displayed in year selection.
   */
  @Input()
  @Coerce('number')
  get maxYear(): number {
    if (this._maxYear) {
      return this._maxYear;
    } else {
      return new KalDate().getDate().year + this.yearsIncrement;
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

  private _minYear = 1940;

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
   * Display the current period : month as string + year.
   */
  get currentPeriod(): string {
    const date = this.calendarMonth?.currentDate ?? new KalDate();

    const month = date.getDate().toLocaleString({month: 'long'});
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
   * add specific classes for date
   */
  @Input() classesListBuilder: KalClassesListBuilderType = () => ({});

  /**
   * refresh calendar display
   */
  refresh(): void {
    this.calendarMonth.refresh();
    this.cdr.detectChanges();
  }

  /**
   * Switch between views to display.
   */
  changeCurrentView() {
    this.currentView = this.isMultiView ? 'month' : 'multi';

    // We should manually trigger change detection because header arrows depends on `KalDatepickerComponent`
    // and header doesn't know when it should refresh itself.
    this.calendarHeader.markForCheck();
  }

  /**
   * Handles when a new date is selected.
   */
  pickDate(date: KalDate): void {
    this.datePicked.emit(date);
  }

  /**
   * Update the view according to `$event` parameter.
   * If we receive a `null` value it means that we're currently displaying the `multi` view and
   * we wants to display the `month` view.
   */
  updateView($event: number | null): void {
    if (this.isMultiView) {
      this.changeCurrentView();
    } else {
      this.calendarMonth.updateMonth($event);
    }
  }

  ngAfterViewInit() {
    this.cdr.markForCheck();
  }

}
