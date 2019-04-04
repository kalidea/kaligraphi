import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { END, HOME } from '@angular/cdk/keycodes';
import { CdkAccordion } from '@angular/cdk/accordion';

import { KAL_ACCORDION, KalAccordionBase } from './kal-accordion-base';
import { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';

@Component({
  selector: 'kal-accordion',
  templateUrl: './kal-accordion.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: KAL_ACCORDION,
    useExisting: KalAccordionComponent
  }],
})
export class KalAccordionComponent extends CdkAccordion implements KalAccordionBase, AfterContentInit {

  /**
   * Headers list used to manage focus.
   */
  @ContentChildren(KalExpansionPanelHeaderComponent, {descendants: true})

  panelsHeaders: QueryList<KalExpansionPanelHeaderComponent>;

  /**
   * Allows us to manage navigation between headers.
   */
  private keyManager: FocusKeyManager<KalExpansionPanelHeaderComponent>;

  /**
   * Whether the expansion indicator should be hidden.
   */
  private shouldHideToggle = false;

  /**
   * Allow to have multiple panels opened at the same time.
   */
  @Input()
  get multiple() {
    return this.multi;
  }

  set multiple(allowMultiple: boolean) {
    this.multi = coerceBooleanProperty(allowMultiple);
  }

  /**
   * Whether the expansion indicator should be hidden.
   */
  @Input()
  get hideToggle(): boolean {
    return this.shouldHideToggle;
  }

  set hideToggle(show: boolean) {
    this.shouldHideToggle = coerceBooleanProperty(show);
  }

  /**
   * Handles keyboard events coming in from the panel headers.
   */
  handleHeaderKeydown(event: KeyboardEvent) {
    const {keyCode} = event;
    const manager = this.keyManager;

    switch (keyCode) {
      case HOME:
        manager.setFirstItemActive();
        event.preventDefault();
        break;
      case END :
        manager.setLastItemActive();
        event.preventDefault();
        break;
      default:
        this.keyManager.onKeydown(event);
        break;
    }
  }

  /**
   * Set focused header.
   */
  handleHeaderFocus(header: KalExpansionPanelHeaderComponent) {
    this.keyManager.updateActiveItem(header);
  }

  ngAfterContentInit() {
    this.keyManager = new FocusKeyManager(this.panelsHeaders).withWrap();
  }

}
