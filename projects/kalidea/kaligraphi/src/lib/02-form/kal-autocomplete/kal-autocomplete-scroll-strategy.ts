import { ScrollDispatcher, ScrollStrategy } from '@angular/cdk/overlay';
import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';
import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CdkScrollable } from '@angular/cdk/scrolling/scrollable';

import { KalAutocompleteComponent } from './kal-autocomplete.component';


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
    this._overlayRef = null; // null!
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


    // @todo add threshold later if needed.
    // when autocomplete is at bottom of the page: kal-autocomplete trigger a scroll event when positionning his overlay
    // and that event close the autocomplete overlay
    this._scrollSubscription = this._scrollDispatcher.scrolled().pipe(
      tap((event: CdkScrollable) => {
        if (event?.getElementRef()?.nativeElement.id !== KalAutocompleteComponent.id && this._overlayRef.hasAttached()) {
          this.disable();
          this._ngZone.run(() => this._overlayRef.detach());
        }

      })
    ).subscribe();
  }

}
