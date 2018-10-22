import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { KalOptionComponent } from '../../atoms/kal-option/kal-option.component';
import { filter } from 'rxjs/operators';
import { ESCAPE } from '@angular/cdk/keycodes';

@Component({
  selector: 'kal-select',
  templateUrl: './kal-select.component.html',
  styleUrls: ['./kal-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KalSelectComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() disabled: boolean;
  @Input() placeHolder: string;
  @Input() multiple: boolean;
  @Output() selectedChange = new EventEmitter<KalOptionComponent | KalOptionComponent []>();
  /** All of the defined select options. */
  @ContentChildren(KalOptionComponent, {descendants: true}) options: QueryList<KalOptionComponent>;
  @ViewChild('myTemplate') myTemplate: TemplatePortal<any>;

  private _panelOpen: boolean;
  private _selection: KalOptionComponent[];
  private _overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private connectedTo: ElementRef<HTMLElement>) {
  }

  get triggerValue(): string {
    if (!this._selection || this._selection.length === 0) {
      return '';
    }

    if (this.multiple) {
      const selectedOptions = this._selection.map(option => option.viewValue);
      return selectedOptions.join(', ');
    }

    return this._selection[0].viewValue;
  }

  get selected(): KalOptionComponent | KalOptionComponent[] {
    return this.multiple ? this._selection : this._selection[0];
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

    if (this.multiple) {
      if (option.isActive) {
        option.active = false;
        this._selection.splice(this._selection.indexOf(option), 1);
      } else {
        option.active = true;
        this._selection.push(option);
      }

      this.selectedChange.emit(this._selection);
    }

    if (!this.multiple) {
      option.active = true;
      this._selection = [option];
      this.selectedChange.emit(option);
      this.close();
    }
  }

  ngOnInit() {
    this._selection = [];
    this._overlayRef = this.overlay.create({
      hasBackdrop: true
    });

    this._overlayRef.backdropClick().subscribe(() => console.log('ok'));
    this._overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE))
      .subscribe(() => this.close());
    // const userProfilePortal = new ComponentPortal(this.myTemplate);
  }

  ngAfterContentInit() {
    this.options.map(o => {
      o.selectionChange.subscribe(event => this.optionSelected(event));
    });

    if (this.options.length === 1) {
      this.optionSelected(this.options.first);
    }
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

}


//https://github.com/angular/material2/blob/master/src/lib/select/select.html
//https://github.com/angular/material2/blob/master/src/lib/select/select.ts
