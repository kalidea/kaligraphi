import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { clamp } from '../../utils/helpers/numbers';

@Component({
  selector: 'kal-progress-bar',
  templateUrl: './kal-progress-bar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalProgressBarComponent implements OnChanges {

  /**
   * Progress bar default value
   */
  private progressValue = 0;

  /**
   * Progress bar color
   */
  private progressBarColor = '';

  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   * Progress-bar color
   */
  @Input()
  get color(): string {
    return this.progressBarColor;
  }

  set color(color: string) {
    this.progressBarColor = color;
  }

  /**
   * Value of the progress-bar. Defaults to zero. Max to 100
   */
  @Input()
  get value(): number {
    return this.progressValue;
  }

  set value(newValue: number) {
    this.progressValue = clamp(coerceNumberProperty(newValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // update view
    this.cdr.markForCheck();
  }

}
