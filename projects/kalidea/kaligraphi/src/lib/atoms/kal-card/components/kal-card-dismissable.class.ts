import { ChangeDetectorRef, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export class KalCardDismissable {

  @Output()
  dismissed: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(forwardRef(() => ChangeDetectorRef)) protected cdr: ChangeDetectorRef) {
  }

  protected _dismissable = false;

  @Input()
  get dismissable(): boolean {
    return this._dismissable;
  }

  set dismissable(dismissable: boolean) {
    this._dismissable = coerceBooleanProperty(dismissable);
    this.cdr.markForCheck();
  }

}
