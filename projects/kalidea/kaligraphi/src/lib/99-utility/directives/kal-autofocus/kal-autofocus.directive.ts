import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Coerce } from './../../../utils';

@Directive({
  selector: '[kalAutofocus]'
})
export class KalAutofocusDirective implements AfterViewInit {

  @Coerce('boolean')
  @Input() kalAutofocus: boolean;

  constructor(private hostElement: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.kalAutofocus) {
      this.hostElement.nativeElement.focus();
    }
  }

}
