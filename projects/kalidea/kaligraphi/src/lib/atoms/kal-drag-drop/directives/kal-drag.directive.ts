import { Directive, HostBinding, HostListener, Input } from '@angular/core';

/**
 * store current dragging element
 */
export let draggingElement;

@Directive({
  selector: '[kalDrag]'
})
export class KalDragDirective {

  @HostBinding('draggable') draggable = true;

  @Input() kalDrag;

  @HostBinding('class.kal-drag-dragging')
  dragging = false;

  constructor() {
  }

  @HostListener('dragstart', ['$event'])
  dragStart($event) {
    draggingElement = this.kalDrag;
    this.dragging = true;
    $event.dataTransfer.setData('text/plain', JSON.stringify(this.kalDrag));
  }

  @HostListener('dragend', ['$event'])
  dragEnd($event) {
    draggingElement = null;
    this.dragging = false;
  }


}
