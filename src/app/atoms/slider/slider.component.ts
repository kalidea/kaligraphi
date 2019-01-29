import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent {
  tick = 10;

  from = 0;

  to = 850;

  max = 620;
  min = 100;

  color = '#21C0D9';

  disabled = false;

}
