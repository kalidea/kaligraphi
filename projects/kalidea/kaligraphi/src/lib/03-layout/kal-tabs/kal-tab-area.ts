import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectorRef, Directive, Input, ViewChild } from '@angular/core';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class KalTabArea implements AfterViewInit {

  /**
   * Content to display in template
   */
  @Input() content: TemplatePortal;

  /**
   * The reference to the cdk portal outlet
   */
  @ViewChild(CdkPortalOutlet, {static: false}) portalOutlet: CdkPortalOutlet;

  constructor(protected cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    if (this.content && this.portalOutlet) {
      this.portalOutlet.attachTemplatePortal(this.content);
      this.cdr.detectChanges();
    }
  }
}
