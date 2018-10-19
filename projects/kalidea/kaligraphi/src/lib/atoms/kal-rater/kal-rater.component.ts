import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { buildProviders, FormControlAccessComponent } from '../../utils/index';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'kal-rater',
  templateUrl: './kal-rater.component.html',
  styleUrls: ['./kal-rater.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [buildProviders(KalRaterComponent)]
})
export class KalRaterComponent extends FormControlAccessComponent<number> implements OnInit, OnChanges {

  /**
   * List of rate values
   */
  rateValues: number[];

  /**
   * Default icon displayed
   */
  private iconName = 'star_rate';

  /**
   * Max rate value
   */
  private maxRateValue = 5;

  /**
   * Default rate value
   */
  private rateValue = 0;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  /**
   * Max rate value
   */
  @Input()
  get maxRate(): number {
    return this.maxRateValue;
  }
  set maxRate(rate: number) {
    this.maxRateValue = coerceNumberProperty(rate);
  }

  /**
   * Name of an icon
   */
  @Input()
  get icon(): string {
    return this.iconName;
  }
  set icon(icon: string) {
    this.iconName = icon;
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    super.writeValue(value);
    this.rateValue = value;
  }

  /**
   * Add `active` class to current element
   */
  isActive(arrayIndex: number): boolean {
    return this.rateValue > arrayIndex;
  }

  /**
   * Notify parent form of the new rate value
   */
  rate(rateValue: number): void {
    // increase rateValue by 1 because we are passing the current array index and it's 0 indexed whereas our rating starts from 1
    rateValue += 1;

    this.rateValue = rateValue;
    super.notifyUpdate(rateValue);
  }

  ngOnInit() {
    // create an array because we can't iterate on numbers in the template
    this.rateValues = Array(this.maxRate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // update view
    this.cdr.markForCheck();
  }

}
