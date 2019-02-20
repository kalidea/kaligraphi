/* tslint:disable:max-line-length */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {

  elements = [
    {
      title: 'image 1',
      image: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAAABCAYAAAAo2wu9AAAAEklEQVR42mP8z/C/nmEUDBoAAOMkAn+dUf1PAAAAAElFTkSuQmCC'
    },
    {
      title: 'image 2',
      image: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RAQ0AAAQAMFppJzo1zP4Kz5jq4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3slKt97+l5oAAAAABJRU5ErkJggg=='
    },
    {
      title: 'image 3',
      image: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMDr7i04N57YKy6jp4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3ZssLttzj4IgAAAABJRU5ErkJggg=='
    },
    {
      title: 'image 4',
      image: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMJJ7yU0N57YKy+mo4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3+bsmRo2hARQAAAABJRU5ErkJggg=='
    },
    {
      title: 'image 5',
      image: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAoUlEQVR42u3RAQ0AMAgAoBvidaxmYjtYwzmoQPTPeqwRQoQgRAhChCBECEKECBGCECEIEYIQIQgRghCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQIUKEIEQIQoQg5LoBaUuvAe5Ayi0AAAAASUVORK5CYII='
    }
  ];

  vignetteVisible = 4;

  constructor() {
    this.elements = this.elements.map(({title, image}) => {
      return ({title, image: 'data:image/png;base64,' + image});
    });
  }

  isEndOfViewport(index) {
    return index + this.vignetteVisible >= this.elements.length;
  }

}
