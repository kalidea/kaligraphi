import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Host,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { NgControl } from '@angular/forms';
import { filter, startWith } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';

import { KalOptionComponent } from '../kal-option/kal-option.component';
import { KalThemeDirective } from '../../99-utility/directives/kal-theme/kal-theme.directive';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';

@Component({
  selector: 'kal-select',
  templateUrl: './kal-select.component.html',
  styleUrls: ['./kal-select.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalSelectComponent)
})
export class KalSelectComponent
  extends FormElementComponent<any>
  implements OnInit, OnDestroy, AfterContentInit {

  /**
   * All of the defined select optionsComponent
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
  private selection: KalOptionComponent [];

  /**
   * Overlay Reference
   */
  private overlayRef: OverlayRef;

  /**
   * Manages keyboard events for optionsComponent in the panel
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

  /**
   * Store Subscriptions
   */
  private subscriptionsList: Subscription[] = [];

  constructor(private overlay: Overlay,
              private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef,
              private injector: Injector,
              @Optional() @Host() private themeDirective: KalThemeDirective) {
    super();
  }

  /**
   * Whether the component is in multiple selection mode
   */
  @Input()
  get multiple(): boolean {
    return this.isMultiple;
  }

  set multiple(multiple: boolean) {
    this.isMultiple = coerceBooleanProperty(multiple);
    // If mode change multiple to simple, we keep only one option
    if (this.selection && !this.isMultiple && this.selection.length > 1) {
      const keepOption = this.selection[0];
      this.reset();
      this.optionSelected(keepOption);
    }
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

    return (this.multiple) ?
      this.selection.map(option => option.getLabel()).join(', ') :
      this.selection[0].getLabel();
  }

  /**
   * The currently selected option
   */
  get selected(): KalOptionComponent | KalOptionComponent[] {
    if (!this.selection || this.selection.length === 0) {
      return null;
    }

    return (this.multiple) ? this.selection : this.selection[0];
  }

  /**
   * The currently selected value
   */
  get selectedValue(): any {
    if (!this.selection || this.selection.length === 0) {
      return null;
    }

    if (this.multiple) {
      const selectedValues = [];
      this.selection.map(option => selectedValues.push(option.value));

      return selectedValues;
    } else {
      return this.selection[0].value;
    }
  }

  /**
   * Whether the select is focused.
   */
  get focused(): boolean {
    return this.isFocused || this.isPanelOpen;
  }

  /**
   * get themes applied on host
   */
  get theme() {
    return this.themeDirective ? this.themeDirective.rawThemes : '';
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
  open(): void {
    if (this.disabled || !this.options || !this.options.length || this.isPanelOpen) {
      return;
    }

    this.focus();

    if (!this.overlayRef) {
      this.createOverlay();
    }

    this.overlayRef.attach(this.optionsPortal);
    this.isPanelOpen = true;
  }

  /**
   * Close the overlay select
   */
  close(): void {
    this.checkResetActiveItem();
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.isPanelOpen = false;
  }

  /**
   * Select an option by his value
   */
  select(value: any, withNotify = false): void {
    if (this.isMultiple && value instanceof Array) {
      const multipleOptions = this.options.filter((item) => value.indexOf(item.value) >= 0);
      this.multipleOptionSelected(multipleOptions, withNotify);
    } else {
      const optionSelect = this.options.find((item) => item.value === value);
      if (optionSelect) {
        this.keyManager.setActiveItem(optionSelect);
        this.optionSelected(this.keyManager.activeItem, withNotify);
      }
    }
  }

  /**
   * Reset selection
   */
  reset(): void {
    this.selection.map(o => o.active = false);
    this.selection = [];
    this.cdr.markForCheck();
  }

  /**
   * Focus the select element
   */
  @HostListener('focus')
  focus(): void {
    if (!this.disabled) {
      this.elementRef.nativeElement.focus();
      this.isFocused = true;
    }
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
    if (!this.focused) {
      return;
    }

    const {keyCode} = event;
    if (keyCode === ENTER || keyCode === SPACE) {
      this.handleSelectKeyEvent();
      return;
    }

    this.keyManager.onKeydown(event);

    // If panel is closed and is not the multiple mode ,the arrows change the selection
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    if (!this.multiple && !this.panelOpen && isArrowKey && this.keyManager.activeItem) {
      this.optionSelected(this.keyManager.activeItem);
    }
  }

  /**
   * @inheritDoc
   */
  writeValue(value: any) {
    Promise.resolve().then(() => {
      this.select(value);
      super.writeValue(value);
    });
  }

  /**
   * Handles enter ans space keydown events on the select
   */
  private handleSelectKeyEvent() {
    if (!this.panelOpen) {
      this.open();
    } else if (this.keyManager.activeItem) {
      this.optionSelected(this.keyManager.activeItem);
    }
  }

  /**
   * create overlayRef
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
      hasBackdrop: true,
      backdropClass: 'kal-overlay__transparent',
      width: this.elementRef.nativeElement.getBoundingClientRect().width,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.isFocused = false;
      this.close();
    });

    this.overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE))
      .subscribe(() => this.close());
  }

  /**
   * Event emitted when several optionsComponent are selected
   * Set the option as active
   */
  private multipleOptionSelected(options: KalOptionComponent[], withNotify = true) {
    if (!this.isMultiple) {
      return;
    }

    options.map((option) => {
      this.optionSelectedOnMultipleMode(option);
    });

    if (withNotify) {
      super.notifyUpdate(this.selectedValue);
      this.valueChanges.emit(this.selectedValue);
    }

    this.cdr.markForCheck();
  }

  /**
   * Event emitted when an option is selected
   * Set the option as active
   */
  private optionSelected(option: KalOptionComponent, withNotify = true) {
    if (this.multiple) {
      this.optionSelectedOnMultipleMode(option);
    } else {
      this.optionSelectedOnSimpleMode(option);
    }

    if (withNotify) {
      super.notifyUpdate(this.selectedValue);
      this.valueChanges.emit(this.selectedValue);
    }

    this.cdr.markForCheck();
  }

  /**
   * Select an option in simple mode
   */
  private optionSelectedOnSimpleMode(option: KalOptionComponent): void {
    const currentSelected = this.selection[0];
    if (currentSelected) {
      currentSelected.active = false;
    }

    option.active = true;
    this.selection = [option];
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
      // Multiple selection keep the option's order
      this.selection.sort((x, y) => {
        return this.options.toArray().indexOf(x) > this.options.toArray().indexOf(y) ? 1 : -1;
      });
    }

    this.checkResetActiveItem();
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

  /**
   * Reset the active item on a active option if it don't
   */
  private checkResetActiveItem(): void {
    if (this.selection.indexOf(this.keyManager.activeItem) < 0) {
      this.keyManager.setActiveItem(this.selection[this.selection.length - 1]);
    }
  }

  /**
   * Disposes the resources
   */
  private cleanSubscriptionsList(): void {
    this.subscriptionsList.forEach(
      subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });

    this.subscriptionsList = [];
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);
    this.selection = [];
  }

  ngAfterContentInit() {
    this.initKeyManager();

    this.options.changes
      .pipe(startWith(0))
      .subscribe(() => {
        if (this.ngControl) {
          this.select(this.ngControl.value);
        }

        this.cleanSubscriptionsList();
        this.subscriptionsList.push(
          merge<KalOptionComponent>(...this.options.map(option => option.selectionChange))
            .subscribe(event => {
              this.focus();
              this.optionSelected(event);
            })
        );
      });

    if (this.options.length === 1) {
      this.optionSelected(this.options.first);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    this.cleanSubscriptionsList();
  }
}
