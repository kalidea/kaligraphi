import { Directive, HostBinding, Input } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Directive({
  selector: '[kalListItemSelection]'
})
export class KalListItemSelectionDirective implements Highlightable {

  /**
   * Is the current item disabled
   */
  @Input() disabled: boolean;

  @HostBinding('class.kal-list__item--highlighted') hightlight;

  constructor() {}

  /**
   * Add the kal-list-item-highlighted class to the current item when it is focus
   */
  setActiveStyles(): void {
    this.hightlight = true;
  }

  /**
   * Remove the kal-list-item-highlighted class to the current item when it is unfocus
   */
  setInactiveStyles(): void {
    this.hightlight = false;
  }

}
