import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[kalAutofocus]'
})
export class AutofocusDirective implements OnInit {

  @Input() kalAutofocus: boolean;

  constructor(private hostElement: ElementRef) {
  }

  ngOnInit() {
    if (this.kalAutofocus) {
      this.hostElement.nativeElement.focus();
    }
  }

}
