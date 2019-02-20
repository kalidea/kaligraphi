import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {

  elements = [];

  vignetteVisible  = 4;

  constructor() {
    for (let i = 1; i < 6; i++) {
      this.elements.push(
        {
          title: 'image ' + i,
          image: 'http://6tech.net/img/test/' + i + '.jpg'
        }
      );
    }
  }

  isEndOfViewport(index) {
    return index + this.vignetteVisible >= this.elements.length;
  }

}
