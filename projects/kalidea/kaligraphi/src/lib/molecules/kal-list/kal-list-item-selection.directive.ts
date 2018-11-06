import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Directive({
  selector: '[kalListItemSelection]'
})
export class KalListItemSelectionDirective implements Highlightable {

  /**
   * Is the current item disabled
   */
  @Input() disabled: boolean;

  /**
   * Add the kal-list-item-highlighted class to the current item when it is focus
   */
  setActiveStyles(): void {
    this.renderer.addClass(this.el.nativeElement, 'kal-list-item-highlighted');
  }

  /**
   * Remove the kal-list-item-highlighted class to the current item when it is unfocus
   */
  setInactiveStyles(): void {
    this.renderer.removeClass(this.el.nativeElement, 'kal-list-item-highlighted');
  }

  constructor(public el: ElementRef,
              private renderer: Renderer2) {
  }

}
