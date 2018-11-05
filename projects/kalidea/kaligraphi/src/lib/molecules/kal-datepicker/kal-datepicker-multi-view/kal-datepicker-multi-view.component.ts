import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DateObjectUnits, DateTime, Info } from 'luxon';
import { coerceKalDateProperty, KalDate } from '../kal-date';

@Component({
  selector: 'kal-datepicker-multi-view',
  templateUrl: './kal-datepicker-multi-view.component.html',
  styleUrls: ['./kal-datepicker-multi-view.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalDatepickerMultiViewComponent {

  readonly shortMonths = Info.months('short');
  @Output() selectedDate = new EventEmitter<DateObjectUnits>();
  private displayedKalDate: KalDate;

  constructor(private cdr: ChangeDetectorRef) {
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
   * Years to display.
   */
  get years(): number[] {
    const years = [];

    for (let i = DateTime.local().year; i >= 1940; i--) {
      years.push(i);
    }

    return years;
  }

  /**
   * Emits selected date object.
   */
  selectDate(unit: DateObjectUnits): void {
    this.selectedDate.emit(unit);
  }

  isMonthSelected(month: number): boolean {
    return this.displayedDate.getMonth() === month;
  }

  isYearSelected(year: number): boolean {
    return this.displayedDate.getYear() === year;
  }

}
