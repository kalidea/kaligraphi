import { Directive, HostBinding, HostListener, Input } from '@angular/core';

import { KalDragService } from '../services/kal-drag.service';

@Directive({
  selector: '[kalDrag]'
})
export class KalDragDirective {

  @Input() kalDrag;

  @HostBinding('draggable') draggable = true;

  @HostBinding('class.kal-drag-dragging') dragging = false;

  constructor(private draggingService: KalDragService) {
  }

  @HostListener('dragstart', ['$event'])
  dragStart($event) {
    this.draggingService.dragging = this.kalDrag;
    this.dragging = true;
    $event.dataTransfer.setData('text/plain', JSON.stringify(this.kalDrag));
  }

  @HostListener('dragend')
  dragEnd() {
    this.draggingService.dragging = null;
    this.dragging = false;
  }


}
