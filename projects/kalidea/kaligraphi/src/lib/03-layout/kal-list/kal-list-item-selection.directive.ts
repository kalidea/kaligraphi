import { Directive, HostBinding, Input } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { Coerce } from '../../utils';

@Directive({
  selector: '[kalListItemSelection]'
})
export class KalListItemSelectionDirective implements Highlightable {

  @Coerce('boolean')
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
    this.hightlighted = this.kalListItemSelection;
  }

  /**
   * Remove the kal-list-item-highlighted class to the current item when it is unfocus
   */
  setInactiveStyles(): void {
    this.hightlighted = false;
  }

}
