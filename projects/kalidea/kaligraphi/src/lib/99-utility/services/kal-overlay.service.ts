import { Injectable, ElementRef } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy, ConnectedPosition, OverlayConfig } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class KalOverlayService {

  private readonly defaultConfig: OverlayConfig = {
    backdropClass: 'kal-overlay__transparent',
    hasBackdrop: true,
    scrollStrategy: this.overlay.scrollStrategies.reposition(),
  };

  constructor(private overlay: Overlay) {

  }

  createOverlay(overlayConfig?: OverlayConfig): OverlayRef {
    return this.overlay.create(overlayConfig);
  }

  getFlexiblePositionStrategy(elementRef: ElementRef,
    positions: ConnectedPosition[] = [ {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'}] ): PositionStrategy {
      return this.overlay.position()
      .flexibleConnectedTo(elementRef)
      .withPositions(positions);
  }

  getOverlayConfig(positionStrategy: PositionStrategy, width: number): OverlayConfig {
   return {
      ...  this.defaultConfig,
      positionStrategy,
      width
    };
  }
}
