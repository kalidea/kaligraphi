import { Directive, ElementRef, HostBinding, Injector, Input, OnDestroy, Optional, Self, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { KalLoaderComponent } from './kal-loader.component';
import { KalLoaderData } from './kal-loader-data';

import { Coerce } from '../../utils/decorators/coerce';
import { KalThemeDirective } from '../../99-utility/directives/kal-theme/kal-theme.directive';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

@Directive({
  selector: '[kalLoading]',
  exportAs: 'kalLoading'
})
export class KalLoadingDirective implements OnDestroy {
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

  /**
   * delay before display loader ( in ms )
   */
  @Input()
  @Coerce('number')
  kalLoadingDelay = 300;

  /**
   * add class to element while loading
   */
  @HostBinding('class.kal-loading-is-loading')
  _loading = false;

  private overlayRef: OverlayRef;

  @AutoUnsubscribe()
  private subscription = Subscription.EMPTY;

  constructor(private readonly elementRef: ElementRef,
              private readonly viewContainerRef: ViewContainerRef,
              private readonly injector: Injector,
              private readonly overlay: Overlay,
              @Optional() @Self() private readonly kalTheme: KalThemeDirective) {
  }

  @Input('kalLoading')
  @Coerce('boolean')
  set loading(loading: boolean) {

    if (this._loading) {  // currently loading

      // new state is "not loading", we should remove overlay
      if (!loading) {
        this.getOverlayRef().detach();
        this._loading = false;
      }

    } else { // not loading

      if (loading) {
        // schedule display
        this.scheduleLoaderDisplay();
      } else {
        // remove scheduled display
        this.subscription.unsubscribe();
      }

    }
  }

  /**
   * create injector for loader portal
   */
  private createInjector() {
    const injectionTokens = new WeakMap<any, any>([
      [KalLoaderData, {message: this.kalLoadingMessage}]
    ]);
    return new PortalInjector(this.injector, injectionTokens);
  }

  /**
   * attach portal to overlay
   */
  private attachLoaderContent() {
    const injector = this.createInjector();
    const portal = new ComponentPortal(KalLoaderComponent, this.viewContainerRef, injector);
    const attachment = this.getOverlayRef().attach(portal);
    if (this.kalTheme) {
      attachment.instance.classes = this.kalTheme.kalThemeAsClassNames.join(' ');
    }
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

    return this.overlayRef;
  }

  private scheduleLoaderDisplay() {
    this.subscription.unsubscribe();
    this.subscription = timer(this.kalLoadingDelay)
      .pipe(
        tap(() => {
          this.attachLoaderContent();
          this._loading = true;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }


}
