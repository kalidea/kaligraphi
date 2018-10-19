import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkConnectedOverlay, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { Portal, TemplatePortal } from '@angular/cdk/portal';
import { KalOptionComponent } from '../../atoms/kal-option/kal-option.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'kal-select',
  templateUrl: './kal-select.component.html',
  styleUrls: ['./kal-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KalSelectComponent implements OnInit, OnDestroy, AfterContentInit {

  /** Manages keyboard events for options in the panel. */
  _keyManager: ActiveDescendantKeyManager<KalOptionComponent>;

  overlayPosition: PositionStrategy;

  /** Overlay pane containing the options. */
  @ViewChild(CdkConnectedOverlay) overlayDir: CdkConnectedOverlay;

  /** All of the defined select options. */
  @ContentChildren(KalOptionComponent, {descendants: true}) options: QueryList<KalOptionComponent>;

  @ViewChild('myTemplate') myTemplate: TemplatePortal<any>;

  @Input() disabled: boolean; //Voir pour seulement l'attribut

@Input()placeHolder: string;

  portal: Portal<any>;
  _panelOpen: boolean;
  private _overlayRef: OverlayRef;

  constructor(private overlay: Overlay,  private _changeDetectorRef: ChangeDetectorRef) {
  }

  toggleOverlay() {
    if (!this._panelOpen) {

      this.open();
    } else {
      this.close();
    }
  }

  open() {
    if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
      return;
    }

    this._overlayRef.attach(this.myTemplate);
    this._panelOpen = true;
  }

  close() {
    this._overlayRef.detach();
    this._panelOpen = false;
  }

  optionSelected(option: KalOptionComponent) {
    this._changeDetectorRef.markForCheck();
    this.placeHolder = option.getValueText();
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

  ngAfterContentInit() {

    this.options.map(o => {
      o.selectionChange.subscribe(event => this.optionSelected(event));
    });
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

}


//https://github.com/angular/material2/blob/master/src/lib/select/select.html
//https://github.com/angular/material2/blob/master/src/lib/select/select.ts
