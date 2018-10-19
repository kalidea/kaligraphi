import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkConnectedOverlay, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { Portal, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'kal-select',
  templateUrl: './kal-select.component.html',
  styleUrls: ['./kal-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KalSelectComponent implements OnInit, OnDestroy {


  overlayPosition: PositionStrategy;

  /** Overlay pane containing the options. */
  @ViewChild(CdkConnectedOverlay) overlayDir: CdkConnectedOverlay;

  /** All of the defined select options. */
 // @ContentChildren(KalOption, { descendants: true }) options: QueryList<KalOption>;

  @ViewChild('myTemplate') myTemplate: TemplatePortal<any>;
  portal: Portal<any>;
  private _overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {
  }

  // openSpaghettiPanel() {
  //   // TODO(jelbourn): separate overlay demo for connected positioning.
  //   const strategy = this.overlay.position()
  //     .connectedTo(
  //       this._overlayOrigin.elementRef,
  //       {originX: 'start', originY: 'bottom'},
  //       {overlayX: 'start', overlayY: 'top'} );
  //
  //   const config = new OverlayConfig({positionStrategy: strategy});
  //   const overlayRef = this.overlay.create(config);
  //
  //   overlayRef.attach(new ComponentPortal(SpagettiPanel, this.viewContainerRef));
  // }


  // getOverlayPosition(): PositionStrategy {
  //   this.overlayPosition = this.overlay.position()
  //     .connectedTo(
  //       this.buttonRef,
  //       {originX: 'start', originY: 'bottom'},
  //       {overlayX: 'start', overlayY: 'bottom'}
  //     )
  //
  //   return this.overlayPosition;
  // }

  toggleOverlay() {
    this._overlayRef.attach(this.myTemplate);
  }

  close() {
    this._overlayRef.detach();
  }


  ngOnInit() {

    // this.portal = new ComponentPortal(this.myTemplate);

    this._overlayRef = this.overlay.create();


    // Subscribe to a stream that emits when the backdrop was clicked
    this._overlayRef.backdropClick().subscribe(() => console.log('ok'));
    // const userProfilePortal = new ComponentPortal(this.myTemplate);


    // this.overlayRef = this.overlay.create({
    //   positionStrategy: this.getOverlayPosition(),
    //   width: 200,
    // });

  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }


}
