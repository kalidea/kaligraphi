import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import dayjs, { UnitType } from 'dayjs';

import { KalDate } from '../kal-date';

export interface DateUnits {
  unit: UnitType;
  value: number;
}

@Component({
  selector: 'kal-datepicker-multi-view',
  templateUrl: './kal-datepicker-multi-view.component.html',
  styleUrls: ['./kal-datepicker-multi-view.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KalDatepickerMultiViewComponent implements AfterViewInit {

  @Input() displayedDate: KalDate;

  @Input() minYear: number;

  @Input() maxYear: number;

  /**
   * Emits event with which type of date was selected.
   * Its type is `DateUnits` but in this case we're only using `month` and `year` for `DateUnits.unit` property.
   */
  @Output() selectedDate = new EventEmitter<DateUnits>();

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
   * Returns an array of standalone short month names.
   * @example ['Jan', 'Feb', ...]
   */
  get shortMonths(): string[] {
    return dayjs().localeData().monthsShort();
  }

  /**
   * Emits selected date object.
   */
  selectDate(unit: DateUnits): void {
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
