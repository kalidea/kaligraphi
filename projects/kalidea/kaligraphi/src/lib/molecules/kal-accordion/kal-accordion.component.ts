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
  styleUrls: ['./kal-accordion.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: KAL_ACCORDION,
    useExisting: KalAccordionComponent
  }],
})
export class KalAccordionComponent extends CdkAccordion implements KalAccordionBase, AfterContentInit {

  /**
   * Allow to have multiple panels opened at the same time.
   */
  private allowMultiple = false;

  /**
   * Allow to have multiple panels opened at the same time.
   */
  @Input()
  get multi() {
    return this.allowMultiple;
  }
  set multi(allowMultiple: boolean) {
    this.allowMultiple = coerceBooleanProperty(allowMultiple);
  }

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

    if (keyCode === HOME) {
      manager.setFirstItemActive();
      event.preventDefault();
    } else if (keyCode === END) {
      manager.setLastItemActive();
      event.preventDefault();
    } else {
      this.keyManager.onKeydown(event);
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
