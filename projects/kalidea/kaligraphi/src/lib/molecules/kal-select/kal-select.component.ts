import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
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
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

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
  private selection: KalOptionComponent[];
  private overlayRef: OverlayRef;
  /** Manages keyboard events for options in the panel. */
  private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;

  constructor(private overlay: Overlay,
              private connectedTo: ElementRef<HTMLElement>) {
  }

  private _panelOpen: boolean;

  get panelOpen(): boolean {
    return this._panelOpen;
  }

  get triggerValue(): string {
    if (!this.selection || this.selection.length === 0) {
      return '';
    }

    if (this.multiple) {
      const selectedOptions = this.selection.map(option => option.viewValue);
      return selectedOptions.join(', ');
    }

    return this.selection[0].viewValue;
  }

  get selected(): KalOptionComponent | KalOptionComponent[] {
    return this.multiple ? this.selection : this.selection[0];
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

    this.overlayRef.attach(this.myTemplate);
    this._panelOpen = true;
  }

  close() {
    this.overlayRef.detach();
    this._panelOpen = false;
  }

  optionSelected(option: KalOptionComponent) {
    if (this.multiple) {
      if (option.active) {
        option.active = false;
        this.selection.splice(this.selection.indexOf(option), 1);
      } else {
        option.active = true;
        this.selection.push(option);
      }

      this.selectedChange.emit(this.selection);
    }

    if (!this.multiple) {
      option.active = true;
      this.selection = [option];
      this.selectedChange.emit(option);
      this.close();
    }
  }

  /** Handles all keydown events on the select. */

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW ||
      keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
    const isOpenKey = keyCode === ENTER || keyCode === SPACE;

    if (this.panelOpen) {
      this.keyManager.onKeydown(event);

      if ((keyCode === ENTER || keyCode === SPACE) && this.keyManager.activeItem) {
        event.preventDefault();
        this.optionSelected(this.keyManager.activeItem);
      }
    }
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<KalOptionComponent>(this.options)
      .withVerticalOrientation();

    this.keyManager.tabOut.subscribe(() => {
      // Restore focus to the trigger before closing. Ensures that the focus
      // position won't be lost if the user got focus into the overlay.

      this.close();
    });

    this.keyManager.change.subscribe(() => {
      console.log('change');
    });
  }

  ngOnInit() {
    this.selection = [];
    this.overlayRef = this.overlay.create({
      hasBackdrop: true
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE))
      .subscribe(() => this.close());
    // const userProfilePortal = new ComponentPortal(this.myTemplate);
  }

  ngAfterContentInit() {
    this.initKeyManager();

    this.options.map(o => {
      o.selectionChange.subscribe(event => this.optionSelected(event));
    });

    if (this.options.length === 1) {
      this.optionSelected(this.options.first);
    }
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }

}


//https://github.com/angular/material2/blob/master/src/lib/select/select.html
//https://github.com/angular/material2/blob/master/src/lib/select/select.ts
