import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {
  step = 1;
  isDisabled = false;
  thumbLabel = true;
  tickInterval = 25;
  limit = 30;

  updateStep($event) {
    this.step = $event.target.value;
  }

  toggle(value) {
    this.isDisabled = value;
  }

  toggleThumbLabel(value) {
    this.thumbLabel = value;
  }

  updateTickInterval($event) {
    this.tickInterval = $event.target.value;
  }

  updateLimit($event) {
    this.limit = $event.target.value;
  }
}
