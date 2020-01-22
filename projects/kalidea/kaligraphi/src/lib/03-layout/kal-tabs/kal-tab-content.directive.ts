import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kalTabContent]'
})
export class KalTabContentDirective {

  constructor(public template: TemplateRef<any>) {
  }

}
