import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kalSelectPlaceholder]'
})
export class KalSelectPlaceholderDirective {

  constructor(public view: TemplateRef<any>) {
  }

}
