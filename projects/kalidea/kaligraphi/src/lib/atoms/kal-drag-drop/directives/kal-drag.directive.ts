import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { KalDraggingService } from '../services/kal-dragging.service';

@Directive({
  selector: '[kalDrag]'
})
export class KalDragDirective {

  @Input() kalDrag;

  @HostBinding('draggable') draggable = true;

  @HostBinding('class.kal-drag-dragging') dragging = false;

  constructor(private draggingService: KalDraggingService) {
  }

  @HostListener('dragstart', ['$event'])
  dragStart($event) {
    this.draggingService.dragging = this.kalDrag;
    this.dragging = true;
    $event.dataTransfer.setData('text/plain', JSON.stringify(this.kalDrag));
  }

  @HostListener('dragend', ['$event'])
  dragEnd($event) {
    this.draggingService.dragging = null;
    this.dragging = false;
  }


}
