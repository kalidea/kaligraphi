import { Directive, HostBinding, Input } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Directive({
  selector: '[kalListItemSelection]'
})
export class KalListItemSelectionDirective implements Highlightable {

  @Input()
  kalListItemSelection = true;

  /**
   * Is the current item disabled
   */
  @Input() disabled: boolean;

  @HostBinding('class.kal-list__item--hover') hightlighted;

  constructor() {}

  /**
   * Add the kal-list-item-highlighted class to the current item when it is focus
   */
  setActiveStyles(): void {
    this.hightlighted = this.kalListItemSelection ? true : false;
  }

  /**
   * Remove the kal-list-item-highlighted class to the current item when it is unfocus
   */
  setInactiveStyles(): void {
    this.hightlighted = false;
  }

}
