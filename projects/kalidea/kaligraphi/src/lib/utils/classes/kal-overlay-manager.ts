import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategyOptions
} from '@angular/cdk/overlay';
import { ScrollStrategy } from '@angular/cdk/overlay';

export abstract class KalOverlayManager {

  protected constructor(
    protected overlay: Overlay,
    private type: string) {
  }

  /**
   * create overlay for dialog
   */
  createOverlay(config: OverlayConfig): OverlayRef {
    const overlayRef = this.overlay.create(config);
    // add custom class on overlay wrapper
    overlayRef.hostElement.classList.add('kal-overlay--' + this.type);
    return overlayRef;
  }

  detachOverlay(overlayRef: OverlayRef) {
    overlayRef.detach();
  }

  disposeIfExists(overlayRef: OverlayRef) {
    if (overlayRef) {
      overlayRef.dispose();
      overlayRef = null;
    }
  }

  protected get positionStrategy(): GlobalPositionStrategy {
    return this.overlay.position().global();
  }

  protected get scrollStrategies(): ScrollStrategyOptions {
    return this.overlay.scrollStrategies;
  }

  /**
   * set default config
   */
  protected applyConfig(config, positionStrategy: PositionStrategy, scrollStrategy: ScrollStrategy = this.scrollStrategies.block()) {
    return Object.assign({positionStrategy, scrollStrategy}, config);
  }

}
