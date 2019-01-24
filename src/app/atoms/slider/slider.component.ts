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
  min = 0;
  max = 300;
}
