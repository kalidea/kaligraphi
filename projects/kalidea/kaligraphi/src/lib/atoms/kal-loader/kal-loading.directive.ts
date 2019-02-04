import { Directive, ElementRef, Input } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { Coerce } from '../../utils/decorators/coerce';
import { KalLoaderComponent } from './kal-loader.component';

@Directive({
  selector: '[kalLoading]'
})
export class KalLoadingDirective {

  private overlayRef: OverlayRef;

  private _loading;

  constructor(private elementRef: ElementRef,
              private overlay: Overlay) {
  }

  @Input('kalLoading')
  @Coerce('boolean')
  set loading(loading: boolean) {
    if (loading === true) {
      this.attachLoader();
    } else if (this._loading === true) {
      this.getOverlayRef().detach();
    }
    this._loading = loading;
  }

  private attachLoader() {
    const portal = new ComponentPortal(KalLoaderComponent);
    this.getOverlayRef().attach(portal);
  }

  private getPositions(): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withGrowAfterOpen(false)
      .withLockedPosition(true)
      .withPush(false)
      .withPositions([
        {
          overlayY: 'top',
          overlayX: 'start',
          originY: 'top',
          originX: 'start'
        }
      ]);

  }

  private getOverlayRef(): OverlayRef {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    const clientRect: ClientRect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();

    const config: OverlayConfig = {
      positionStrategy: this.getPositions(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      height: clientRect.height,
      width: clientRect.width,
      panelClass: 'kal-loader-panel',
    };

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.backdropClick().subscribe(event => {
      this.overlayRef.detach();
    });

    this.overlayRef.detach();
    return this.overlayRef;
  }


}
