import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { Coerce } from '../../../utils/decorators/coerce';

@Component({
  selector: 'kal-calendar-header',
  templateUrl: './kal-calendar-header.component.html',
  styleUrls: ['./kal-calendar-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCalendarHeaderComponent {

  @Coerce('boolean')
  @Input()
  isMultiView: boolean;

  @Output() updateMonth = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   * Emit event with the new month that should be displayed.
   * @param amount The amount is `1` or `-1`
   */
  updateMonthAmount(amount: number) {
    this.updateMonth.next(amount);
  }

  /**
   * Update component view
   */
  markForCheck() {
    this.cdr.markForCheck();
  }

}
