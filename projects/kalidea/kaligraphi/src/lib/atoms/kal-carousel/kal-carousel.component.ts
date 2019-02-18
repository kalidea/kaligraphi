import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export enum KalCarouselItemStatus {
  Init = 'init', // init value
  Shift = 'shift', // remove from start
  Append = 'append' // add to end
}

const prefix = 'kalCarousel';

@Component({
  selector: 'kal-carousel',
  template: '<ng-content></ng-content>',
  exportAs: 'kal-carousel'
})
export class KalCarouselComponent<T> implements OnInit {

  @Input(prefix + 'Start')
  start = 0;

  @Input()
  items: T[] = [];

  private updateViewSubject = new ReplaySubject<KalCarouselItemStatus>();

  get updateView$() {
    return this.updateViewSubject.asObservable();
  }

  constructor() {
  }

  private get length() {
    return this.items.length;
  }

  next() {
    this.updateViewSubject.next(KalCarouselItemStatus.Append);
  }

  previous() {
    this.updateViewSubject.next(KalCarouselItemStatus.Shift);
  }

  ngOnInit() {
    this.updateViewSubject.next(KalCarouselItemStatus.Init);
  }

}
