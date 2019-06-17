import { Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { KalMenuComponent } from './kal-menu.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { kalPositions } from '../../utils/helpers/positions';

@Directive({
  selector: '[kalMenuTriggerFor]'
})
export class KalMenuTriggerForDirective implements OnDestroy {

  /**
   * private reference from menuComponent
   */
  private menu: KalMenuComponent;

  /**
   * local overlayref
   */
  private overlayRef: OverlayRef;

  /**
   * is the menu open ?
   */
  private menuOpen = false;

  @AutoUnsubscribe()
  private subscriptionsList: Subscription[] = [];

  constructor(private overlay: Overlay,
              private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef) {
  }

  @Input() set kalMenuTriggerFor(menu: KalMenuComponent) {
    this.menu = menu;
  }

  @HostListener('click')
  /**
   * Toggles the menu between the open and closed states.
   * */
  toggleMenu(): void {
    return this.menuOpen ? this.closeMenu() : this.openMenu();
  }

  /**
   * Closes the menu.
   */
  private closeMenu(): void {
    if (!this.menuOpen) {
      return;
    }
    this.menu.resetKeyManager();
    this.overlayRef.detach();
    this.menuOpen = false;
  }

  /**
   * Opens the menu.
   */
  private openMenu(): void {
    if (this.menuOpen) {
      return;
    }
    const portal = new TemplatePortal(this.menu.templateRef, this.viewContainerRef);

    this.getOverlay().attach(portal);

    const menuCloseSubscription = this.menu.closed.subscribe(() => {
      this.closeMenu();
    });

    // store subscription for futur unsubscribe
    this.subscriptionsList.push(menuCloseSubscription);

    this.menuOpen = true;
  }

  /**
   * return host width
   */
  private getHostWidth() {
    const size = this.elementRef.nativeElement.getBoundingClientRect();
    return size.width || 200;
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPush(true)
      .withFlexibleDimensions(false)
      .withPositions([
        kalPositions.bottom,
        kalPositions.top,
        kalPositions.left,
        kalPositions.right,
      ]);
  }

  /**
   * create overlay
   */
  private createOverlay() {

    this.overlayRef = this.overlay.create({
      positionStrategy: this.getPositionStrategy(),
      backdropClass: 'kal-menu__overlay-backdrop',
      panelClass: 'kal-menu__overlay',
      hasBackdrop: true,
      minWidth: this.getHostWidth(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    const backdropClickSubscription = this.overlayRef.backdropClick().subscribe(() => {
      this.closeMenu();
    });

    const keydownSubscription = this.overlayRef.keydownEvents()
      .pipe(
        tap(event => {
          if ([UP_ARROW, DOWN_ARROW, ENTER, SPACE].indexOf(event.keyCode) > -1) {
            this.menu.handleKeydown(event);
          }
        }),
        filter(event => event.keyCode === ESCAPE)
      )
      .subscribe(() => this.closeMenu());


    // store subscriptions for futur unsubscribe
    this.subscriptionsList.push(backdropClickSubscription, keydownSubscription);

  }

  /**
   * get previously created overlay or create new one
   */
  private getOverlay() {
    if (!this.overlayRef) {
      this.createOverlay();
    }
    return this.overlayRef;
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }


}
