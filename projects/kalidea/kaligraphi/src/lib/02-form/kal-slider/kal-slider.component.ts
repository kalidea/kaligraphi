import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { END, HOME, LEFT_ARROW, RIGHT_ARROW, } from '@angular/cdk/keycodes';
import { isNil } from 'lodash/isNil';

import { HammerInput } from '../../utils/gestures/gesture-annotations';
import { clamp } from '../../utils/helpers/numbers';
import { Coerce } from '../../utils/decorators/coerce';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';

@Component({
  selector: 'kal-slider',
  templateUrl: './kal-slider.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalSliderComponent)
})
export class KalSliderComponent extends FormElementComponent<number> implements OnChanges {

  // global expected required
  @Input()
  @Coerce('number')
  from = 0;

  @Input()
  @Coerce('number')
  to = 100;

  // range min max
  @Input()
  @Coerce('number', null)
  min: number;

  @Input()
  @Coerce('number', null)
  max: number;

  @Input()
  @Coerce('number')
  tick = 1;

  @Input()
  color: string;

  @Output()
  readonly valueChange: EventEmitter<number | null> = new EventEmitter<number | null>();

  @Output()
  readonly pointerDragging: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('sliderWrapper') private sliderWrapper: ElementRef;

  private _value = 0;

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

  get value() {
    return this._value;
  }

  @Coerce('number', 0)
  set value(value: number) {
    const closestValue = this.getClosestValue(value);

    // update only if value is different than previous
    if (this.value !== closestValue) {
      this._value = closestValue;
      super.notifyUpdate(this.value);
      this.valueChange.emit(this.value);
      this.cdr.markForCheck();
    }
  }

  get maxValue(): number {
    return isNil(this.max) ? this.to : this.max;
  }

  get minValue(): number {
    return isNil(this.min) ? this.from : this.min;
  }

  /**
   * Get the bounding client rect of the slider track element.
   * The track is used rather than the native element to ignore the extra space that the thumb can
   * take up.
   */
  get sliderDimensions(): ClientRect | null {
    return this.sliderWrapper ? this.sliderWrapper.nativeElement.getBoundingClientRect() : null;
  }

  /**
   * can we update this slider ?
   */
  private get isUpdatable() {
    return !this.disabled && !this.readonly;
  }

  @HostListener('mousedown', ['$event'])
  mouseDown($event: MouseEvent) {
    if (!this.isUpdatable) {
      return;
    }
    const offset = this.sliderDimensions.left;
    const position = $event.clientX - offset;
    this.value = this.positionInSliderToValue(position);
  }

  @HostListener('keydown', ['$event'])
  keyDown($event: KeyboardEvent) {
    if (!this.isUpdatable) {
      return;
    }

    // Manage fast backward / forward
    let numSteps = 1;
    if ($event.ctrlKey) {
      numSteps = 10;
    } else if ($event.shiftKey) {
      numSteps = 5;
    }

    switch ($event.keyCode) {
      case HOME:
        this.value = this.minValue;
        break;
      case END:
        this.value = this.maxValue;
        break;
      case LEFT_ARROW:
        this.increment(-numSteps);
        break;
      case RIGHT_ARROW:
        this.increment(numSteps);
        break;
    }
  }

  @HostListener('slide', ['$event'])
  slide($event: HammerInput & { isFinal: boolean }) {

    if (!this.isUpdatable) {
      return;
    }
    this.pointerDragging.emit(!$event.isFinal);

    // Prevent the slide from selecting anything else.
    $event.preventDefault();

    const offset = this.sliderDimensions.left;
    const position = $event.center.x - offset;

    this.value = this.positionInSliderToValue(position);
  }

  selectionContainerStyles(): { 'width.%': number, backgroundColor?: string } {
    const styles: { 'width.%': number, backgroundColor?: string } = {
      'width.%': this.valueToPercent(this.value),
    };

    if (this.color) {
      styles.backgroundColor = this.color;
    }

    return styles;
  }

  pointerStyles(): { 'left.%': number } {
    return {
      'left.%': this.valueToPercent(this.value),
    };
  }

  maxContainerStyles(): { 'width.%': number } {
    return {
      'width.%': this.max ? this.valueToPercent(this.max) : 0,
    };
  }

  minContainerStyles(): { 'width.%': number } {
    return {
      'width.%': this.min ? this.valueToPercent(this.min) : 0,
    };
  }

  writeValue(value) {
    this.value = value;
    super.writeValue(this.value);
  }

  valueToPercent(value: number): number {
    return ((value - this.from) / this.getSliderInterval()) * 100;
  }

  /**
   * get interval of this slider
   */
  getSliderInterval(): number {
    return this.to - this.from;
  }

  /**
   * convert slide position x to percent of the slider container width
   * if slider is 400px width, and @input to = 1200,
   * a slide event with x=200px should be a value of 600
   * a slide event with x=300px should be a value of 900
   * a slide event with x=400px should be a value of 1200
   **/
  private positionInSliderToValue(position: number): number {
    const percent = clamp(position, 0, this.sliderDimensions.width) / this.sliderDimensions.width;
    return percent * this.getSliderInterval() + this.from;
  }

  private getClosestValue(current: number): number {
    // manage min / max
    current = clamp(current, this.minValue, this.maxValue);
    if (current === this.minValue || current === this.maxValue) {
      return current;
    }

    const before = Math.floor(current / this.tick) * this.tick;
    let closest = before;
    if (before + (this.tick / 2) < current) {
      closest = before + this.tick;
    }
    return closest;
  }

  private increment(numSteps: number): void {
    this.value += numSteps * this.tick;
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // recalcul value according to last change
    this.value = this.getClosestValue(this.value);
  }

}
