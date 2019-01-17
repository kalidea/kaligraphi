import { ChangeDetectorRef, Directive, Input } from '@angular/core';

@Directive({
  selector: '[kalVirtualScroll]'
})
export class KalVirtualScrollDirective {

  @Input()
  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this.cdr.markForCheck();
  }

  @Input()
  get itemSize() {
    return this._itemSize;
  }

  set itemSize(value) {
    this._itemSize = value;
    this.cdr.markForCheck();
  }

  private _height = 500;

  private _itemSize = 50;

  constructor(private cdr: ChangeDetectorRef) {
  }

}
