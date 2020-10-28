import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export enum KalCarouselItemStatus {
  Init = 'init', // init value
  Shift = 'shift', // remove from start
  Append = 'append' // add to end
}

@Component({
  selector: 'kal-carousel',
  exportAs: 'kalCarousel',
  template: '<ng-content></ng-content>'
})
export class KalCarouselComponent<T> implements OnInit {

  @HostBinding('attr.tabIndex') tabIndex = 2;

  @Input()
  currentItem = 0;

  @Input()
  items: T[] = [];

  private updateViewSubject = new ReplaySubject<KalCarouselItemStatus>();

  get updateView$() {
    return this.updateViewSubject.asObservable();
  }

  get length() {
    return this.items.length;
  }

  get isFirst() {
    return this.currentItem === 0;
  }

  get isLast() {
    return this.currentItem === this.length - 1;
  }

  next() {
    this.currentItem = (this.currentItem + 1) % this.items.length;
    this.updateViewSubject.next(KalCarouselItemStatus.Append);
  }

  previous() {
    this.currentItem = (this.currentItem - 1 + this.items.length) % this.items.length;
    this.updateViewSubject.next(KalCarouselItemStatus.Shift);
  }

  ngOnInit() {
    this.updateViewSubject.next(KalCarouselItemStatus.Init);
  }

}
