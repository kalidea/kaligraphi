import { Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ESCAPE } from '@angular/cdk/keycodes';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';

import { KalMenuComponent } from './kal-menu.component';

@Directive({
  selector: '[kalMenuTriggerFor]'
})
export class KalMenuDirective {

  @Input('kalMenuTriggerFor') content: KalMenuComponent;

  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private elementRef: ElementRef,
              private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('click')
  toggle() {
    if (!this.overlayRef || !this.overlayRef.hasAttached()) {
      const portal = new TemplatePortal(this.content.templateRef, this.viewContainerRef);
      this.getOverlay().attach(portal);
    } else {
      this.getOverlay().detach();
    }
  }

  private closeOverlay() {
    this.overlayRef.detach();
  }

  private getHostWidth() {
    const size = this.elementRef.nativeElement.getBoundingClientRect();
    return size.width || 200;
  }

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
      hasBackdrop: false,
      minWidth: this.getHostWidth(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeOverlay();
    });

    this.overlayRef.keydownEvents()
      .pipe(
        filter(event => event.keyCode === ESCAPE)
      )
      .subscribe(() => this.closeOverlay());

  }

  private getOverlay() {
    if (!this.overlayRef) {
      this.createOverlay();
    }
    return this.overlayRef;
  }


}
