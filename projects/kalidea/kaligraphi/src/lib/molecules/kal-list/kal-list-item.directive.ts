import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kalListItem]'
})
export class KalListItemDirective {

  constructor(public view: TemplateRef<any>) {
  }

}
