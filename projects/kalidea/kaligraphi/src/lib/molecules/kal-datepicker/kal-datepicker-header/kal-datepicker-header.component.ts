import { ChangeDetectionStrategy, Component, forwardRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { KalDatepickerComponent } from '../kal-datepicker.component';

@Component({
  selector: 'kal-datepicker-header',
  templateUrl: './kal-datepicker-header.component.html',
  styleUrls: ['./kal-datepicker-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalDatepickerHeaderComponent implements OnInit {

  constructor(@Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent) {
  }

  get currentPeriodText(): string {
    return '';
    // return this.datepicker.
  }

  get isMonthView(): boolean {
    return this.datepicker.currentView === 'month';
  }

  changeView(): void {
    this.datepicker.currentView = this.datepicker.currentView === 'month' ? 'multi' : 'month';
  }

  ngOnInit() {
  }

}
