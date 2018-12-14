import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[kalDrag]'
})
export class KalDragDirective {

  @HostBinding('draggable') draggable = true;

  @Input() kalDrag;

  constructor() {
  }

  @HostListener('dragstart', ['$event'])
  dragStart($event) {
    $event.dataTransfer.setData('text/plain', JSON.stringify(this.kalDrag));
  }

}
