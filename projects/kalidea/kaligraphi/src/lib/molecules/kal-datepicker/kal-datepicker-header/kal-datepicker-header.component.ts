import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  ViewEncapsulation
} from '@angular/core';

import { KalDatepickerComponent } from '../kal-datepicker.component';

@Component({
  selector: 'kal-datepicker-header',
  templateUrl: './kal-datepicker-header.component.html',
  styleUrls: ['./kal-datepicker-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalDatepickerHeaderComponent {

  constructor(@Inject(forwardRef(() => KalDatepickerComponent)) public datepicker: KalDatepickerComponent,
              private cdr: ChangeDetectorRef) {
  }

  /**
   * Whether the current view is the `month` view.
   */
  get isMultiView(): boolean {
    return this.datepicker.isMultiView;
  }

  /**
   * Emit event with the new month that should be displayed.
   * @param amount The amount is `1` or `-1`
   */
  updateMonth(amount: number) {
    this.datepicker.updateView(this.isMultiView ? null : amount);
  }

  /**
   * Update component view
   */
  markForCheck() {
    this.cdr.markForCheck();
  }

}
