import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef, PositionStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

export abstract class KalOverlayManager {

  protected constructor(protected overlay: Overlay) {
  }

  /**
   * create overlay for dialog
   */
  createOverlay(config: OverlayConfig) {
    return this.overlay.create(config);
  }

  detachOverlay(overlayRef: OverlayRef) {
    overlayRef.detach();
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
  protected applyConfig(Type, config, positionStrategy: PositionStrategy) {
    const scrollStrategy = this.scrollStrategies.block();
    return Object.assign(new Type(), {positionStrategy, scrollStrategy}, config);
  }

}
