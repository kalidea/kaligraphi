import { Directive, ElementRef, HostBinding, Injector, Input, OnDestroy, Optional, Self, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { KalOverlayManager } from '../../utils/classes/kal-overlay-manager';

import { KalLoaderComponent } from './kal-loader.component';
import { KalLoaderData } from './kal-loader-data';

import { Coerce } from '../../utils/decorators/coerce';
import { KalThemeDirective } from '../../99-utility/directives/kal-theme/kal-theme.directive';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

@Directive({
  selector: '[kalLoading]',
  exportAs: 'kalLoading'
})
export class KalLoadingDirective extends KalOverlayManager implements OnDestroy {
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
              protected readonly overlay: Overlay,
              @Optional() @Self() private readonly kalTheme: KalThemeDirective) {
    super(overlay, 'loader');
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
    const injectionTokens = [{
      provide: KalLoaderData,
      useValue: {message: this.kalLoadingMessage}
    }];

    return Injector.create({providers: injectionTokens, parent: this.injector});
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
  private createPositionStrategy(): PositionStrategy {
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
    this.disposeIfExists(this.overlayRef);

    const {height, width}: ClientRect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();

    const overlayConfig = this.applyConfig(
      {height, width},
      this.createPositionStrategy(),
      this.overlay.scrollStrategies.reposition()
    );

    this.overlayRef = this.createOverlay(overlayConfig);
    this.overlayRef.backdropClick().subscribe(event => {
      this.detachOverlay(this.overlayRef);
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
    this.disposeIfExists(this.overlayRef);
  }


}
