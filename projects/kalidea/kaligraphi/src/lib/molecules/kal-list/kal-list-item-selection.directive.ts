import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Directive({
  selector: '[kalListItemSelection]'
})
export class KalListItemSelectionDirective implements Highlightable {

  /**
   * Is a tab highlighted
   */
  highlighted: boolean;

  setActiveStyles(): void {
    this.highlighted = true;
    this.renderer.addClass(this.el.nativeElement, 'kal-list-item-highlighted');
  }

  setInactiveStyles(): void {
    this.highlighted = false;
    this.renderer.removeClass(this.el.nativeElement, 'kal-list-item-highlighted');
  }

  constructor(public el: ElementRef,
              private renderer: Renderer2) {
  }

}
