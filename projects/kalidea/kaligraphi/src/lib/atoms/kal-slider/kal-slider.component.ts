import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { END, HOME, LEFT_ARROW, RIGHT_ARROW, } from '@angular/cdk/keycodes';
import { buildProviders, FormElementComponent } from '../../utils/index';
import { HammerInput } from '../../utils/gestures/gesture-annotations';

@Component({
  selector: 'kal-slider',
  templateUrl: './kal-slider.component.html',
  styleUrls: ['./kal-slider.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalSliderComponent)
})
export class KalSliderComponent extends FormElementComponent<number> {

  // global expected required
  @Input()
  from = 0;

  @Input()
  to = 1200;

  // range min max
  @Input()
  min: number;

  @Input()
  max: number;

  @Input()
  tick = 100;

  @Input()
  color: string;

  @Output()
  readonly valueChange: EventEmitter<number | null> = new EventEmitter<number | null>();

  @ViewChild('sliderWrapper') private sliderWrapper: ElementRef;

  private _value = 0;

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = this.getClosestValue(value);
    this.valueChange.emit(this.value);
    super.notifyUpdate(this.value);
  }

  get maxValue(): number {
    return this.max > 0 ? this.max : this.to;
  }

  get minValue(): number {
    return this.min > 0 ? this.min : this.from;
  }

  /**
   * Get the bounding client rect of the slider track element.
   * The track is used rather than the native element to ignore the extra space that the thumb can
   * take up.
   */
  get sliderDimensions(): ClientRect | null {
    return this.sliderWrapper ? this.sliderWrapper.nativeElement.getBoundingClientRect() : null;
  }

  @HostListener('mousedown', ['$event'])
  mouseDown($event: MouseEvent) {
    if (this.disabled) {
      return;
    }
    const offset = this.sliderDimensions.left;
    const position = $event.clientX - offset;
    this.value = this.positionInSliderToValue(position);
  }

  @HostListener('keydown', ['$event'])
  keyDown($event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }
    const numSteps = $event.ctrlKey ? 10 : 1;
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
  slide($event: HammerInput) {

    if (this.disabled) {
      return;
    }

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
      'width.%': this.max > 0 ? this.valueToPercent(this.max) : 0,
    };
  }

  minContainerStyles(): { 'width.%': number } {
    return {
      'width.%': this.min > 0 ? this.valueToPercent(this.min) : 0,
    };
  }

  writeValue(value) {
    value = this.getClosestValue(value);
    super.writeValue(value);
  }

  /**
   * convert slide position x to percent of the slider container width
   * if slider is 400px width, and @input to = 1200,
   * a slide event with x=200px should be a value of 600
   * a slide event with x=300px should be a value of 900
   * a slide event with x=400px should be a value of 1200
   **/
  private positionInSliderToValue(position) {
    const percent = this.clamp(position, 0, this.sliderDimensions.width) / this.sliderDimensions.width;
    return percent * this.to;
  }

  private getClosestValue(current) {
    // manage min / max
    current = this.clamp(current, this.minValue, this.maxValue);
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

  private increment(numSteps: number) {
    this.value = this.value + numSteps * this.tick;
  }

  private valueToPercent(value: number) {
    return (value / this.to) * 100;
  }

  /** Return a number between two numbers. */
  private clamp(value: number, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
  }

}
