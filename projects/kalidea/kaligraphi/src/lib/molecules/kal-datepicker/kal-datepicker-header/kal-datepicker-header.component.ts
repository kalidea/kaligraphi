import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { KalDatepickerComponent } from '../kal-datepicker.component';

@Component({
  selector: 'kal-datepicker-header',
  templateUrl: './kal-datepicker-header.component.html',
  styleUrls: ['./kal-datepicker-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalDatepickerHeaderComponent implements OnInit {

  @Output() updatedMonth = new EventEmitter<number>();

  constructor(@Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent) {
  }

  get isMonthView(): boolean {
    return this.datepicker.currentView === 'month';
  }

  updateMonth(amount: number) {
    this.updatedMonth.emit(amount);
  }

  ngOnInit() {
  }

}
