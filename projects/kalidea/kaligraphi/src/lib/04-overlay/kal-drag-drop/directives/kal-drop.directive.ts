import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { coerceArray } from '@angular/cdk/coercion';

import { KalDragService } from '../services/kal-drag.service';
import { Memoize } from '../../../utils/decorators/memoize';

export enum KalDropPosition {
  Top = 'top',
  Bot = 'bot',
  Middle = 'middle'
}

export interface KalDroppedEvent {
  data: any;
  position: KalDropPosition;
}

interface KalDropPositionConfig {
  min: number;
  max: number;
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
  @Input() kalDropAllowed;

  /**
   * threshold to calculate top and bot interval
   */
  @Input() kalDropThreshold = 0.25;

  @HostBinding('class.kal-dropable') dropable = true;

  /**
   * current position for drop
   */
  private dropPosition: KalDropPosition = null;

  /**
   * list of positions availables
   */
  private _kalDropPositions = [KalDropPosition.Top, KalDropPosition.Bot, KalDropPosition.Middle];

  constructor(private draggingService: KalDragService) {
  }

  /**
   * return Allowed position to drop on
   */
  @Input('kalDropPositions')
  get positions() {
    return coerceArray(this._kalDropPositions);
  }

  /**
   * Allowed position to drop on
   */
  set positions(positions: KalDropPosition[]) {
    this._kalDropPositions = coerceArray(positions);
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
    const draggingElement = this.draggingService.dragging;

    if (this.kalDropAllowed && !this.kalDropAllowed(draggingElement)) {
      this.dropPosition = null;
    } else {
      this.dropPosition = this.getZoneHovered($event, this.positions);
    }

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
    return position && this.positions.indexOf(position) > -1;
  }

  /**
   * build positions config for each DropPosition available
   */
  @Memoize({
    resolver(targetHeight, positionsList) {
      return targetHeight + positionsList.sort().join('');
    }
  })
  private buildPositionsConfig(targetHeight: number, positionsList: KalDropPosition[]): KalDropPositionConfig[] {

    const positions: KalDropPositionConfig[] = [];

    const top = targetHeight * this.kalDropThreshold;
    const bot = targetHeight * (1 - this.kalDropThreshold);

    // list of defaut config
    const positionsConfig: { [key: string]: { min: number, max: number } } = {
      [KalDropPosition.Top]: {min: 0, max: top},
      [KalDropPosition.Middle]: {min: top, max: bot},
      [KalDropPosition.Bot]: {min: bot, max: targetHeight}
    };

    // build positions list
    positionsList.forEach(position => positions.push({...positionsConfig[position], position}));

    // update config if we have less than 3 positions
    if (positions.length === 1) {
      // if we have only one drop position available, set it as default on hover
      positions[0].min = 0;
      positions[0].max = targetHeight;
    } else if (positions.length === 2) {

      const getPosition = (position: KalDropPosition) => positions.find(config => config.position === position);

      // if we have two drop positions available, distribute remaining space
      if (!this.isPositionAvailable(KalDropPosition.Top)) {
        getPosition(KalDropPosition.Middle).min = 0;
      } else if (!this.isPositionAvailable(KalDropPosition.Middle)) {
        getPosition(KalDropPosition.Top).max = targetHeight / 2;
        getPosition(KalDropPosition.Bot).min = targetHeight / 2;
      } else if (!this.isPositionAvailable(KalDropPosition.Bot)) {
        getPosition(KalDropPosition.Middle).max = targetHeight;
      }
    }

    return positions;
  }

  @Memoize({
    resolver($event, positionsList) {
      return ($event.target as HTMLElement).offsetHeight + '-' + $event.offsetY + '-' + positionsList.sort().join('');
    }
  })
  private getZoneHovered($event: DragEvent, positionsList: KalDropPosition[]) {
    const targetHeight = ($event.target as HTMLElement).offsetHeight;
    const position = $event.offsetY;

    let dropPosition: KalDropPosition;

    if (this.positions.length === 1) {
      dropPosition = this.positions[0];
    } else {
      const positionFound = this
        .buildPositionsConfig(targetHeight, positionsList)
        .find(config => position < config.max && position > config.min);

      dropPosition = positionFound ? positionFound.position : null;
    }

    return dropPosition;

  }

  ngOnDestroy(): void {
    this.kalDrop.complete();
  }

}
