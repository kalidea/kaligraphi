import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { DateObjectUnits, Info } from 'luxon';

import { KalDate } from '../kal-date';

@Component({
  selector: 'kal-datepicker-multi-view',
  templateUrl: './kal-datepicker-multi-view.component.html',
  styleUrls: ['./kal-datepicker-multi-view.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KalDatepickerMultiViewComponent implements AfterViewInit {

  /**
   * Returns an array of standalone short month names.
   * @example ['Jan', 'Feb', ...]
   */
  readonly shortMonths = Info.months('short');

  @Input() displayedDate: KalDate;

  @Input() minYear: number;

  @Input() maxYear: number;

  /**
   * Emits event with which type of date was selected.
   * Its type is `DateObjectUnits` but we're only using `month` and `year` in this type.
   */
  @Output() selectedDate = new EventEmitter<DateObjectUnits>();

  /**
   * Years to display.
   */
  get years(): number[] {
    const years = [];

    for (let i = this.maxYear; i >= this.minYear; i--) {
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

  /**
   * Whether the month is the displayed month.
   */
  isMonthSelected(month: number): boolean {
    return this.displayedDate && this.displayedDate.getMonth() === month;
  }

  /**
   * Whether the year is the displayed year.
   */
  isYearSelected(year: number): boolean {
    return this.displayedDate && this.displayedDate.getYear() === year;
  }

  ngAfterViewInit(): void {
    const selectedYear = document.getElementsByClassName('selected-year')[0];

    // scroll to selected year
    if (selectedYear) {
      selectedYear.scrollIntoView();
    }
  }

}
