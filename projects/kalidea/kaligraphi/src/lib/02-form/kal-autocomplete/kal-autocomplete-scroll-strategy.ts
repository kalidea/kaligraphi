import { ScrollDispatcher, ScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';
import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CdkScrollable } from '@angular/cdk/scrolling/scrollable';


export class KalAutocompleteScrollStrategy implements ScrollStrategy {
  private _scrollSubscription: Subscription|null = null;
  private _overlayRef: OverlayReference;

  constructor(private _scrollDispatcher: ScrollDispatcher,
              private _ngZone: NgZone) {
  }

  attach(overlayRef: OverlayReference): void {
    this._overlayRef = overlayRef;
  }

  detach(): void {
    this.disable();
    this._overlayRef = null; //null!
  }

  disable(): void {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
      this._scrollSubscription = null;
    }
  }

  enable(): void {
    if (this._scrollSubscription) {
      return;
    }

    this._scrollSubscription = this._scrollDispatcher.scrolled().pipe(
      tap((event: CdkScrollable) => {
        if (!event?.getElementRef()?.nativeElement.classList?.contains('kal-autocomplete-scroll-viewport') && this._overlayRef.hasAttached()) {
          this.disable();
          this._ngZone.run(() => this._overlayRef.detach());
        }

      })
    ).subscribe()
  }

}
