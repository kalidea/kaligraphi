import { ChangeDetectorRef, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export class KalCardDismissable {

  /**
   * event triggered for card dismission
   */
  @Output()
  dismissed: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(forwardRef(() => ChangeDetectorRef)) protected cdr: ChangeDetectorRef) {
  }

  protected _dismissable = false;

  /**
   * getset for dismissable property
   * true if card is dismissable
   */
  @Input()
  get dismissable(): boolean {
    return this._dismissable;
  }

  set dismissable(dismissable: boolean) {
    this._dismissable = coerceBooleanProperty(dismissable);
    this.cdr.markForCheck();
  }

}
