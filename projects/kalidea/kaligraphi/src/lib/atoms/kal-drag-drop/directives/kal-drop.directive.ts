import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { KalDragService } from '../services/kal-drag.service';

export enum KalDropPosition {
  Top = 'top',
  Bot = 'bot',
  Middle = 'middle'
}

export interface KalDroppedEvent {
  data: any;
  position: KalDropPosition;
}

@Directive({
  selector: '[kalDrop]'
})
export class KalDropDirective implements OnDestroy {

  /**
   * event emitted when user drop element
   */
  @Output() readonly kalDrop: EventEmitter<KalDroppedEvent> = new EventEmitter<KalDroppedEvent>();

  /**
   * callback to detect if element could be dropped on the current item
   */
  @Input() kalDropAllowed = undefined;

  @HostBinding('class.kal-dropable') dropable = true;

  /**
   * current position for drop
   */
  private dropPosition: KalDropPosition = null;

  constructor(private draggingService: KalDragService) {
  }

  private _kalDropPositions = [KalDropPosition.Top, KalDropPosition.Bot, KalDropPosition.Middle];

  /**
   * Allowed position to drop on
   */
  @Input()
  set kalDropPositions(positions: KalDropPosition[]) {
    this._kalDropPositions = positions;
  }

  @HostBinding('class.kal-drop-hovered-bot')
  get botHovered() {
    return this.dropPosition === KalDropPosition.Bot;
  }

  @HostBinding('class.kal-drop-hovered-middle')
  get middleHovered() {
    return this.dropPosition === KalDropPosition.Middle;
  }

  @HostBinding('class.kal-drop-hovered-top')
  get topHovered() {
    return this.dropPosition === KalDropPosition.Top;
  }

  @HostListener('dragleave')
  resetDropPosition() {
    this.dropPosition = null;
  }

  @HostListener('dragover', ['$event'])
  dragOver($event: DragEvent) {
    // dragover DOES NOT HAVE THE RIGHTS to see the data in the drag event.
    this.getZoneHovered($event);
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#Define_a_drop_zone
    $event.stopPropagation();
    $event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  drop($event) {
    $event.stopPropagation();
    $event.preventDefault();
    const data = JSON.parse($event.dataTransfer.getData('text/plain'));
    const position = this.dropPosition;

    // we can drop only if position has been successfully calculated
    if (position) {
      this.kalDrop.emit({data, position});
      this.resetDropPosition();
    }
  }

  private isPositionAvailable(position: KalDropPosition) {
    return position && Array.isArray(this._kalDropPositions) && this._kalDropPositions.indexOf(position) > -1;
  }

  private getZoneHovered($event: DragEvent) {
    const targetHeight = ($event.target as HTMLElement).offsetHeight;
    const position = $event.offsetY;

    const threshold = 0.25;

    const top = targetHeight * threshold;
    const bot = targetHeight * (1 - threshold);

    const draggingElement = this.draggingService.dragging;

    if (this.kalDropAllowed && !this.kalDropAllowed(draggingElement)) {
      this.dropPosition = null;
    } else if (this.isPositionAvailable(KalDropPosition.Top) && position < top) {
      this.dropPosition = KalDropPosition.Top;
    } else if (this.isPositionAvailable(KalDropPosition.Bot) && position > bot) {
      this.dropPosition = KalDropPosition.Bot;
    } else if (this.isPositionAvailable(KalDropPosition.Middle)) {
      this.dropPosition = KalDropPosition.Middle;
    } else {
      this.dropPosition = null;
    }
  }

  ngOnDestroy(): void {
    this.kalDrop.complete();
  }

}
