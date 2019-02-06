import { Directive, ElementRef, HostBinding, Injector, Input, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { KalLoaderComponent } from './kal-loader.component';
import { KalLoaderData } from './kal-loader-data';

import { Coerce } from '../../utils/decorators/coerce';

@Directive({
  selector: '[kalLoading]'
})
export class KalLoadingDirective {

  /**
   * message to display in overlay
   */
  @Input()
  kalLoadingMessage: string;

  /**
   * add utility class to manage min-height
   */
  @HostBinding('class.kal-loading-could-change')
  readonly couldBeInLoadingState = true;

  private overlayRef: OverlayRef;

  /**
   * add class to element while loading
   */
  @HostBinding('class.kal-loading-is-loading')
  _loading = false;

  constructor(private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef,
              private injector: Injector,
              private overlay: Overlay) {
  }

  @Input('kalLoading')
  @Coerce('boolean')
  set loading(loading: boolean) {
    if (loading === true) {
      this.attachLoaderContent();
    } else if (this._loading === true) {
      // remove previous overlay to rebuild positions list according to new size of HtmlElement
      // in case of resize
      this.getOverlayRef().detach();
    }
    this._loading = loading;
  }

  /**
   * create injector for loader portal
   */
  private createInjector() {
    const injectionTokens = new WeakMap<any, any>([
      [KalLoaderData, {message: this.kalLoadingMessage}],
    ]);
    return new PortalInjector(this.injector, injectionTokens);
  }

  /**
   * attach portal to overlay
   */
  private attachLoaderContent() {
    const injector = this.createInjector();
    const portal = new ComponentPortal(KalLoaderComponent, this.viewContainerRef, injector);
    this.getOverlayRef().attach(portal);
  }

  /**
   * build positions for this loader
   */
  private createPositionsList(): PositionStrategy {
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
      positionStrategy: this.createPositionsList(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      height: clientRect.height,
      width: clientRect.width,
    };

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.backdropClick().subscribe(event => {
      this.overlayRef.detach();
    });

    this.overlayRef.detach();
    return this.overlayRef;
  }


}
