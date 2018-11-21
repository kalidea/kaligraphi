import { Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, tap } from 'rxjs/operators';

import { KalMenuComponent } from './kal-menu.component';

@Directive({
  selector: '[kalMenuTriggerFor]'
})
export class KalMenuTriggerForDirective implements OnDestroy {

  @Input('kalMenuTriggerFor') menu: KalMenuComponent;

  private overlayRef: OverlayRef;

  private menuOpen = false;

  constructor(private overlay: Overlay,
              private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef) {
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

    this.menu.closed.subscribe(() => {
      this.closeMenu();
    });

    this.menuOpen = true;
  }

  /**
   * return host width
   */
  private getHostWidth() {
    const size = this.elementRef.nativeElement.getBoundingClientRect();
    return size.width || 200;
  }

  /**
   * create overlay
   */
  private createOverlay() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'}
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: 'kal-menu__overlay',
      hasBackdrop: true,
      minWidth: this.getHostWidth(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeMenu();
    });

    this.overlayRef.keydownEvents()
      .pipe(
        tap(event => {
          const keyCode = event.keyCode;
          if ([UP_ARROW, DOWN_ARROW, ENTER, SPACE].indexOf(keyCode) > -1) {
            this.menu.handleKeydown(event);
          }
        }),
        filter(event => event.keyCode === ESCAPE)
      )
      .subscribe(() => this.closeMenu());

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
