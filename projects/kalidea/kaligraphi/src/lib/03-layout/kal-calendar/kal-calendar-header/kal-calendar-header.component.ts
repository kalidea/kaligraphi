import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { KalCalendarComponent } from '../kal-calendar.component';

@Component({
  selector: 'kal-calendar-header',
  templateUrl: './kal-calendar-header.component.html',
  styleUrls: ['./kal-calendar-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCalendarHeaderComponent {

  constructor(@Inject(forwardRef(() => KalCalendarComponent)) public calendar: KalCalendarComponent,
              private cdr: ChangeDetectorRef) {
  }

  /**
   * Whether the current view is the `month` view.
   */
  get isMultiView(): boolean {
    return this.calendar.isMultiView;
  }

  /**
   * Emit event with the new month that should be displayed.
   * @param amount The amount is `1` or `-1`
   */
  updateMonth(amount: number) {
    this.calendar.updateView(this.isMultiView ? null : amount);
  }

  /**
   * Update component view
   */
  markForCheck() {
    this.cdr.markForCheck();
  }

}
