import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kalSelectTriggerValue]'
})
export class KalSelectTriggerValueDirective {

  constructor(public view: TemplateRef<any>) {
  }

}
