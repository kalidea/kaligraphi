import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[kalVirtualScroll]'
})
export class KalVirtualScrollDirective {

  @Input() height = 500;

  @Input() itemSize = 50;

  constructor() {
  }

}
