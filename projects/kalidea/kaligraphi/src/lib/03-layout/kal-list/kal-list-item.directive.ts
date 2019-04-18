import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kalListItem]'
})
export class KalListItemDirective {

  /**
   * Add class to kal list item
   */
  @Input() ngClass: any;

  constructor(public view: TemplateRef<any>) {
  }

}
