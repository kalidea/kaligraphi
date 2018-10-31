import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Info } from 'luxon';
import { coerceKalDateProperty, KalDate } from '../kal-date';
import { KalDatepickerHeaderComponent } from '../kal-datepicker-header/kal-datepicker-header.component';

@Component({
  selector: 'kal-datepicker-month-view',
  templateUrl: './kal-datepicker-month-view.component.html',
  styleUrls: ['./kal-datepicker-month-view.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalDatepickerMonthViewComponent implements OnInit {

  /**
   * Emits when a new date is selected.
   */
  @Output() readonly datePicked = new EventEmitter<KalDate>();
  private readonly narrowWeekDays = Info.weekdays('narrow');
  private selectedKalDate: KalDate;

  constructor(@Inject(forwardRef(() => KalDatepickerHeaderComponent)) public datePickerHeaderComponent: KalDatepickerHeaderComponent,
              private cdr: ChangeDetectorRef) {
  }

  get weekDays(): string[] {
    return this.narrowWeekDays;
  }

  @Input()
  get selectedDate(): KalDate {
    return this.selectedKalDate;
  }

  set selectedDate(date: KalDate) {
    if (!date) {
      date = new KalDate();
    } else {
      date = coerceKalDateProperty(date);
    }

    this.selectedKalDate = date;
    this.cdr.markForCheck();
  }

  /**
   * getter for displayed dates of current month
   */
  get datesList(): KalDate[] {
    const displayedDate = this.selectedDate ? this.selectedDate.getDate() : null;

    if (!displayedDate) {
      return [];
    }

    const startMonth = displayedDate.startOf('month').startOf('week').plus({months: -2});
    console.log(startMonth.monthLong);
    const datesList: KalDate[] = [];

    // create an array with all days in selected date month
    for (let i = 0; i < startMonth.daysInMonth; i++) {
      datesList.push(new KalDate(startMonth.plus({days: i})));
    }

    return datesList;
  }

  /**
   * Handles when a new date is selected.
   */
  pickDate(date: KalDate): void {
    this.datePicked.emit(date);
  }

  ngOnInit() {
  }

}
