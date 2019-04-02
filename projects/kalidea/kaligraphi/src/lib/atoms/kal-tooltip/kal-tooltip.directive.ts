import {
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, take } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalThemeDirective } from '../../utility/directives/kal-theme/kal-theme.directive';

export class KalTooltipConfig {
  content: string;

  theme?: string | string[];
}

@Directive({
  selector: '[kalTooltip]'
})
export class KalTooltipDirective implements OnDestroy {

  @Input() kalTooltip: string;

  private overlayRef: OverlayRef;

  private componentRef: ComponentRef<KalTooltipComponent>;

  @AutoUnsubscribe()
  private eventSubscription = Subscription.EMPTY;

  constructor(private readonly overlay: Overlay,
              private readonly injector: Injector,
              private readonly viewContainerRef: ViewContainerRef,
              private readonly elementRef: ElementRef<HTMLElement>,
              @Optional() private readonly theme: KalThemeDirective) {
  }

  @HostListener('mouseenter')
  @HostListener('touchstart')
  showTooltip(): void {
    if (!this.hasAttached()) {
      const injector = new PortalInjector(this.injector, new WeakMap([
        [KalTooltipConfig, {
          content: this.kalTooltip,
          theme: this.theme ? this.theme.rawThemes : ''
        }]
      ]));
      const portal = new ComponentPortal(KalTooltipComponent, this.viewContainerRef, injector);
      this.componentRef = this.getOverlayRef().attach(portal);
      this.manageClickOutside();
    }
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  hideTooltip(): void {
    if (this.overlayRef) {
      const instance: KalTooltipComponent = this.componentRef.instance;
      // wait for animation end before removing overlay
      if (instance) {
        instance.animationEnd$.subscribe(() => this.overlayRef.detach());
        instance.close();
      }
    }
  }

  /**
   * manage close with click outside
   */
  private manageClickOutside(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    this.eventSubscription = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const target = event.target as HTMLElement;
          return !this.elementRef.nativeElement.contains(target)
            && (!!this.overlayRef && !this.overlayRef.overlayElement.contains(target));
        }),
        take(1)
      ).subscribe(() => {
        this.overlayRef.detach();
      });
  }

  private getOverlayRef(): OverlayRef {
    if (!this.overlayRef) {
      const config: OverlayConfig = {
        hasBackdrop: false,
        disposeOnNavigation: true,
        positionStrategy: this.getPositionStrategy(),
        scrollStrategy: this.overlay.scrollStrategies.reposition()
      };
      this.overlayRef = this.overlay.create(config);
    }
    return this.overlayRef;
  }

  /**
   * does this directive has an attached template ?
   */
  private hasAttached(): boolean {
    return this.overlayRef && this.overlayRef.hasAttached();
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPush(false)
      .withPositions([
        {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
        {originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top'},
        {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'},
        {originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom'}
      ]);
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

}

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'kal-tooltip',
  template: `
    <div
      [kalTheme]="theme"
      [@slideContent]="animationState"
      (@slideContent.done)="animationDone($event)">
      {{ content }}
    </div>
  `,
  animations: [
    trigger('slideContent', [
      state('void', style({transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0})),
      state('enter', style({transform: 'none', opacity: 1})),
      state('leave', style({transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0})),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ])
  ]
})
export class KalTooltipComponent {
  animationState: 'void' | 'enter' | 'leave' = 'enter';

  private animationEndSubject$ = new Subject<boolean>();

  constructor(@Inject(KalTooltipConfig) private readonly config: KalTooltipConfig) {
  }

  get animationEnd$() {
    return this.animationEndSubject$.asObservable();
  }

  get content() {
    return this.config.content;
  }

  get theme() {
    return this.config.theme;
  }

  close() {
    this.animationState = 'leave';
  }

  animationDone({toState}) {
    if (toState === 'leave') {
      this.animationEndSubject$.next(true);
      this.animationEndSubject$.complete();
    }
  }
}
