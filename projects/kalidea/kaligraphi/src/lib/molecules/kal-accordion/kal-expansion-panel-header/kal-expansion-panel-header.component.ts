import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { merge, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { KalExpansionPanelComponent } from '../kal-expansion-panel/kal-expansion-panel.component';
import { kalExpansionAnimations } from '../expansion-animations';

@Component({
  selector: 'kal-expansion-panel-header',
  templateUrl: './kal-expansion-panel-header.component.html',
  styleUrls: ['./kal-expansion-panel-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [kalExpansionAnimations.indicatorRotate]
})
export class KalExpansionPanelHeaderComponent implements OnDestroy, FocusableOption {

  /**
   * Set panel role to `button` so users can use the keyboard to activate the expansion panel header
   * to switch between expanded state and collapsed state.
   */
  @HostBinding('attr.role') readonly panelHeadRole = 'button';

  /**
   * Set the relation between panel header and panel.
   */
  @HostBinding('attr.id') readonly headerId = this.panelHeaderId;

  /**
   * Indicate that the panel header controls the panel state.
   */
  @HostBinding('attr.aria-controls') readonly ariaControls = this.panelId;

  /**
   * Tab index attribute set according to `disabled` state of panel.
   */
  @HostBinding('attr.tabindex') tabIndex;

  /**
   * Indicate to screen reader users whether the collapsable content is in the expanded or in the collapsed state.
   */
  @HostBinding('attr.aria-expanded') ariaExpanded;

  /**
   * Indicates that the element is visible but disabled.
   */
  @HostBinding('attr.aria-disabled') ariaDisabled;

  /**
   * Subscription to parent events to manually refresh the view.
   */
  private parentChangeSubscription: Subscription;

  constructor(
    @Host() public panel: KalExpansionPanelComponent,
    private element: ElementRef,
    private fm: FocusMonitor,
    private cdr: ChangeDetectorRef) {

    // Since the toggle state depends on an @Input on the panel, we
    // need to subscribe and trigger change detection manually.
    this.parentChangeSubscription = merge(
      panel.opened,
      panel.closed,
      panel.inputChanges.pipe(filter(changes => !!(changes.hideToggle || changes.disabled)))
    )
      .subscribe(() => {
        // Update bindings
        this.updateBindings();
        this.cdr.markForCheck();
      });

    fm.monitor(element.nativeElement).subscribe(origin => {
      if (origin && panel.accordion) {
        panel.accordion.handleHeaderFocus(this);
      }
    });

    // Init binding
    this.updateBindings();
  }

  /**
   * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
   */
  private get isPanelDisabled() {
    return this.panel.disabled;
  }

  /**
   * Gets panel header id.
   */
  private get panelHeaderId(): string {
    return this.panel.headerId;
  }

  /**
   * Gets the panel id.
   */
  private get panelId(): string {
    return this.panel.id;
  }

  /**
   * Gets whether the panel is expanded.
   */
  private get isPanelExpanded(): boolean {
    return this.panel.expanded;
  }

  /**
   * Listen to `keydown` event to toggle the panel.
   */
  @HostListener('keydown', ['$event']) keydown($event) {
    this.handleKeydown($event);
  }

  /**
   * Listen to `click` event on the header to toggle the panel.
   */
  @HostListener('click') click() {
    this.toggle();
  }

  /**
   * Gets the expanded state string of the panel.
   */
  getExpandedState(): string {
    return this.panel.getExpandedState();
  }

  /** Gets whether the expand indicator should be shown. */
  showToggle(): boolean {
    return !this.panel.hideToggle && !this.isPanelDisabled;
  }

  /**
   * Focuses the panel header. Implemented as a part of `FocusableOption`.
   * @param origin Origin of the action that triggered the focus.
   */
  focus(origin: FocusOrigin = 'program') {
    this.fm.focusVia(this.element.nativeElement, origin);
  }

  ngOnDestroy() {
    this.parentChangeSubscription.unsubscribe();
    this.fm.stopMonitoring(this.element.nativeElement);
  }

  /**
   * Update all `HostBinding` values according to panel state.
   */
  private updateBindings(): void {
    this.tabIndex = this.isPanelDisabled ? -1 : 0;
    this.ariaExpanded = this.isPanelExpanded;
    this.ariaDisabled = this.isPanelDisabled;
  }

  /**
   * Toggles the expanded state of the panel.
   */
  private toggle(): void {
    this.panel.toggle();
  }

  /**
   * Handle keydown event calling to toggle() if appropriate.
   */
  private handleKeydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      // Toggle for space and enter keys.
      case SPACE:
      case ENTER:
        event.preventDefault();
        this.toggle();
        break;
      default:
        if (this.panel.accordion) {
          this.panel.accordion.handleHeaderKeydown(event);
        }

        return;
    }
  }

}
