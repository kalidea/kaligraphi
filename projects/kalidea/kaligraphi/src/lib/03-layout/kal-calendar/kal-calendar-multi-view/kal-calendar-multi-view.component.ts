import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { KalDurationUnit, KalDate } from '../../../99-utility/kal-date/kal-date';


export interface DateUnits {
  unit: KalDurationUnit;
  value: number;
}

@Component({
  selector: 'kal-calendar-multi-view',
  templateUrl: './kal-calendar-multi-view.component.html',
  styleUrls: ['./kal-calendar-multi-view.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KalCalendarMultiViewComponent implements AfterViewInit {

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
    return ['', ...KalDate.months('short')];
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
    return this.displayedDate && (this.displayedDate.getMonth()) === month;
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
