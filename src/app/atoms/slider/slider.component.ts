import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent {
  themes = [];

  tick = 10;

  from = 0;

  to = 850;

  max = 620;

  min = 0;

  color = '';

  disabled = false;

  readonly = false;

  value = 120;

}
