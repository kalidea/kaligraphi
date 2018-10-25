import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { filter } from 'rxjs/operators';
import { FormElementComponent } from '../../utils';
import { KalOptionComponent } from '../../atoms/kal-option/kal-option.component';

@Component({
  selector: 'kal-select',
  templateUrl: './kal-select.component.html',
  styleUrls: ['./kal-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalSelectComponent extends FormElementComponent<any> implements OnInit, OnDestroy, AfterContentInit {

  /**
   * Whether the component is in multiple selection mode
   */
  @Input()
  get multiple(): boolean {
    return this.isMultiple;
  }

  set multiple(multiple: boolean) {
    this.isMultiple = coerceBooleanProperty(multiple);
  }

  /**
   * Event emitted when selection change
   */
  @Output() selectedChange = new EventEmitter<KalOptionComponent | KalOptionComponent []>();

  /**
   * All of the defined select options
   */
  @ContentChildren(KalOptionComponent, {descendants: true}) options: QueryList<KalOptionComponent>;

  /**
   * Overlay Portal Options
   */
  @ViewChild('optionsPortal') optionsPortal: TemplatePortal<any>;

  /**
   * Whether the component is in multiple selection mode
   */
  private isMultiple: boolean;

  /**
   * The currently selected option
   */
  private selection: KalOptionComponent[];

  /**
   * Overlay Reference
   */
  private overlayRef: OverlayRef;

  /**
   * Manages keyboard events for options in the panel
   */
  private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;

  /**
   * Whether or not the select is focus
   */
  private isFocused: boolean;

  /**
   * Whether or not the overlay panel is open
   */
  private isPanelOpen: boolean;

  constructor(private overlay: Overlay,
              private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef) {
    super();
  }

  /**
   * Whether or not the overlay panel is open
   */
  get panelOpen(): boolean {
    return this.isPanelOpen;
  }

  /**
   * Get the value to display on the change selection
   */
  get triggerValue(): string {
    if (!this.selection || this.selection.length === 0) {
      return null;
    }

    if (this.multiple) {
      const selectedOptions = this.selection.map(option => option.viewValue);
      return selectedOptions.join(', ');
    }

    return this.selection[0].viewValue;
  }

  /**
   * The currently selected option
   */
  get selected(): KalOptionComponent | KalOptionComponent[] {
    return this.multiple ? this.selection : this.selection[0];
  }

  /**
   * Whether the select is focused.
   */
  get focused(): boolean {
    return this.isFocused || this.isPanelOpen;
  }

  /**
   * Toggles the overlay panel open or closed
   */
  toggleOverlay() {
    if (!this.isPanelOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  /**
   * Open the overlay select
   */
  open() {
    if (this.disabled || !this.options || !this.options.length || this.isPanelOpen) {
      return;
    }

    this.focus();
    this.overlayRef.attach(this.optionsPortal);
    this.isPanelOpen = true;
  }

  /**
   * Close the overlay select
   */
  close() {
    if (this.selection.indexOf(this.keyManager.activeItem) < 0) {
      this.keyManager.setActiveItem(this.selection[0]);
    }

    this.overlayRef.detach();
    this.isPanelOpen = false;
  }

  /**
   * Focuse the select element
   */
  @HostListener('focus')
  focus(): void {
    this.elementRef.nativeElement.focus();
    this.isFocused = true;
  }

  /**
   * Blur the select element
   */
  @HostListener('blur')
  blur() {
    if (!this.panelOpen) {
      this.isFocused = false;
      this.close();
    }
  }

  /**
   * Handles all keydown events on the select
   */
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const {keyCode} = event;

    const isOpenKey = keyCode === ENTER || keyCode === SPACE;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;

    if (this.focused) {
      if (isOpenKey) {
        if (!this.panelOpen) {
          event.preventDefault();
          this.open();
        } else if (this.keyManager.activeItem) {
          event.preventDefault();
          this.optionSelected(this.keyManager.activeItem);
        }
      } else {
        this.keyManager.onKeydown(event);

        if (!this.panelOpen && isArrowKey && !this.multiple && this.keyManager.activeItem) {
          event.preventDefault();
          this.optionSelected(this.keyManager.activeItem);
        }
      }
    }
  }

  /**
   * Event emitted when an option is selected
   * Set the option as active
   * @param option KalOptionComponent
   */
  private optionSelected(option: KalOptionComponent) {
    if (this.multiple) {
      this.optionSelectedOnMultipleMode(option);
    } else {
      this.optionSelectedOnSimpleMode(option);
    }

    this.cdr.markForCheck();
  }

  /**
   * Select an option in simple mode
   */
  private optionSelectedOnSimpleMode(option: KalOptionComponent): void {
    const currentSelected = this.selected as KalOptionComponent;
    if (currentSelected) {
      currentSelected.active = false;
    }

    option.active = true;
    this.selection = [option];
    this.selectedChange.emit(option);
    this.close();
  }

  /**
   * Select an option in multiple mode
   */
  private optionSelectedOnMultipleMode(option: KalOptionComponent): void {
    if (option.active) {
      option.active = false;
      this.selection.splice(this.selection.indexOf(option), 1);
    } else {
      option.active = true;
      this.selection.push(option);
    }

    this.selectedChange.emit(this.selection);
  }

  /**
   Sets up a key manager to listen to keyboard events on the overlay panel.
   */
  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<KalOptionComponent>(this.options).withVerticalOrientation();

    this.keyManager.tabOut.subscribe(() => {
      this.close();
    });
  }

  ngOnInit() {
    this.selection = [];

    this.overlayRef = this.overlay.create({
      hasBackdrop: true
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.isFocused = false;
      this.close();
    });

    this.overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE))
      .subscribe(() => this.close());
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
