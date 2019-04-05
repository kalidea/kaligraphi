import { ChangeDetectorRef, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { Coerce } from '../../../utils/decorators/coerce';

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
  @Coerce('boolean')
  get dismissable(): boolean {
    return this._dismissable;
  }

  set dismissable(dismissable: boolean) {
    this._dismissable = dismissable;
    this.cdr.markForCheck();
  }

}
