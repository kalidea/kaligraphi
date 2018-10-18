import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
export class KalRaterComponent extends FormControlAccessComponent implements OnInit {

  /**
   * List of rate values
   */
  rateValues: number[];

  /**
   * Event emitted when the user changed the rate
   */
  @Output() rateChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Default icon displayed
   */
  private icon = 'star_rate';

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

    // update view
    this.cdr.markForCheck();
  }

  /**
   * Name of an icon
   */
  @Input()
  get iconName(): string {
    return this.icon;
  }
  set iconName(icon: string) {
    this.icon = icon;
  }

  /**
   * Current rate value
   */
  get value() {
    return this.rateValue;
  }
  set value(value: number) {
    this.rateValue = value;
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    super.writeValue(value);
    this.value = value;
  }

  /**
   * Notify parent form of the new rate value
   */
  rate(rateValue: number): void {
    this.value = rateValue;
    super.notifyUpdate(rateValue);
  }

  ngOnInit() {
    // create an array from 1 indexed because we can't iterate on numbers in the template
    this.rateValues = Array.from(new Array(this.maxRate), (val, index) => index + 1);
  }

}
