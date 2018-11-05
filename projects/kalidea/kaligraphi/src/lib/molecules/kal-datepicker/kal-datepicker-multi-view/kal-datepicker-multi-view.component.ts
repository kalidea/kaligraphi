import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { DateObjectUnits, DateTime, Info } from 'luxon';

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

  constructor() {
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

}
