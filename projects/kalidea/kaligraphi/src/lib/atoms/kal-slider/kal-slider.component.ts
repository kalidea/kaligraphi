import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { buildProviders, FormControlAccessComponent } from '../../utils/index';

@Component({
  selector: 'kal-slider',
  templateUrl: './kal-slider.component.html',
  styleUrls: ['./kal-slider.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalSliderComponent)
})
export class KalSliderComponent extends FormControlAccessComponent<number> implements OnInit, OnDestroy {

  /**
   * Emits when the value of the slider changes.
   */
  @Output() readonly valueChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Control related to the `input`
   */
  control = new FormControl(0);

  private sliderValue = 0;

  private limitSliderValue = 0;

  private isDisabled = false;

  private sliderStep = 1;

  private displayThumbLabel = false;

  private tickIntervalValue = 0;

  private minSliderValue = 0;

  private maxSliderValue = 100;

  private valueChangeSubscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  @Input()
  get min(): number {
    return this.minSliderValue;
  }
  set min(minValue: number) {
    this.minSliderValue = coerceNumberProperty(minValue);

    if (this.value < this.min) {
      this.value = minValue;
      this.writeValue(this.value);
    }

    this.cdr.markForCheck();
  }

  @Input()
  get max(): number {
    return this.maxSliderValue;
  }
  set max(maxValue: number) {
    this.maxSliderValue = coerceNumberProperty(maxValue);

    if (this.value > this.max) {
      this.value = maxValue;
      this.writeValue(this.value);
    }

    this.cdr.markForCheck();
  }

  /**
   * Limit value for the slider.
   * If the limit is less than the current value, set the current value to the limited value.
   */
  @Input()
  get limit(): number {
    return this.limitSliderValue;
  }
  set limit(value: number) {
    this.limitSliderValue = coerceNumberProperty(value);

    if (this.limit !== 0 && this.limit < this.value) {
      this.writeValue(this.limit);
    }
  }

  /**
   * Slider value.
   * If a limit value has been defined and is less than the given value, sets the value to the limit.
   */
  @Input()
  get value(): number {
    return this.sliderValue;
  }
  set value(sliderValue: number) {
    this.sliderValue = this.getLimitValue(coerceNumberProperty(sliderValue));
    this.control.patchValue(this.sliderValue, {emitEvent: false});
    this.cdr.markForCheck();
  }

  /**
   * Whether the slider should be disabled.
   */
  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }
  set disabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    this.toggle();
  }

  /**
   * Whether the slider should be disabled.
   */
  @Input()
  get step(): number {
    return this.sliderStep;
  }
  set step(step: number) {
    this.sliderStep = step;
    this.cdr.markForCheck();
  }

  /** Whether or not to show the thumb label. */
  @Input()
  get thumbLabel(): boolean {
    return this.displayThumbLabel;
  }
  set thumbLabel(value: boolean) {
    this.displayThumbLabel = coerceBooleanProperty(value);
    this.cdr.markForCheck();
  }

  /**
   * How often to show ticks. Relative to the step so that a tick always appears on a step.
   * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
   */
  @Input()
  get tickInterval(): number {
    return this.tickIntervalValue;
  }
  set tickInterval(value: number) {
    this.tickIntervalValue = coerceNumberProperty(value);
    this.cdr.markForCheck();
  }

  /**
   * @inheritDoc
   */
  writeValue(newValue: number): void {
    if (newValue !== this.value) {
      // get the limit value
      this.value = this.getLimitValue(newValue);
      this.control.patchValue(this.value, {emitEvent: false});

      // notify parent
      super.writeValue(this.value);

      // update the view when we get a new value from parent component
      this.cdr.markForCheck();
    }
  }

  /**
   * @inheritDoc
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;

    this.toggle();

    // update the view when `disabled` property change
    this.cdr.markForCheck();
  }

  /**
   * Defines the value to use (given vale or limit value) then send it to parent form
   */
  notifyUpdate(value: number): void {
    this.value = this.getLimitValue(value);
    super.notifyUpdate(this.value);
  }

  /**
   * Toggle `disabled` state of the input.
   */
  toggle(): void {
    if (this.disabled) {
      this.control.disable({emitEvent: false});
    } else {
      this.control.enable({emitEvent: false});
    }
  }

  /**
   * Count the ticks interval to display.
   * We're returning an array because we can't iterate over numbers in template.
   */
  countTicksInterval(): any[] {
    return Array(100 / this.tickInterval);
  }

  /**
   * Get the value to use.
   * It's the limit if the limit is defined and greater than the given value.
   */
  getLimitValue(value: number): number {
    return this.limit !== 0 ? Math.min(this.limit, value) : value;
  }

  ngOnInit() {
    this.valueChangeSubscription = this.control.valueChanges.subscribe(
      value => {
        if (this.disabled) {
          return;
        }

        this.notifyUpdate(value);
        this.valueChange.emit(this.getLimitValue(value));
      }
    );
  }

  ngOnDestroy(): void {
    this.valueChangeSubscription.unsubscribe();
  }

}
