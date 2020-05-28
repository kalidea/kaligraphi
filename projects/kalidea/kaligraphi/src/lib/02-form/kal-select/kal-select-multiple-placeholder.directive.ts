import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kalSelectMultiplePlaceholder]'
})
export class KalSelectMultiplePlaceholderDirective {

  constructor(public view: TemplateRef<any>) {
  }

}
