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
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';

@Component({
  selector: 'kal-rater',
  templateUrl: './kal-rater.component.html',
  styleUrls: ['./kal-rater.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [buildProviders(KalRaterComponent)]
})
export class KalRaterComponent extends FormElementComponent<number> implements OnInit, OnChanges {

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

  @Input()
  get value(): number {
    return this.rateValue;
  }

  set value(value: number) {
    this.rateValue = value;
    this.cdr.markForCheck();
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

    if (this.rateValue > this.maxRate) {
      this.notifyUpdate(this.maxRate);
    }

    this.calculateRateValues();
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
   * @inheritDoc
   */
  notifyUpdate(newValue: number): void {
    super.notifyUpdate(newValue);
    this.valueChanges.emit(newValue);
    this.rateValue = newValue;
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
    this.notifyUpdate(rateValue);
  }

  /**
   * Create an array of empty elements because we
   * can't iterate on numbers in the template
   */
  private calculateRateValues(): void {
    this.rateValues = Array(this.maxRate);
  }

  ngOnInit() {
    this.calculateRateValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // update view
    this.cdr.markForCheck();
  }

}
