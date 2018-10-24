import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { KAL_ACCORDION, KalAccordionBase } from '../kal-accordion-base';
import { kalExpansionAnimations } from '../expansion-animations';
import { uniqid } from '../../../utils';

/** KalExpansionPanel's states. */
export type KalExpansionPanelState = 'expanded' | 'collapsed';

@Component({
  selector: 'kal-expansion-panel',
  templateUrl: './kal-expansion-panel.component.html',
  styleUrls: ['./kal-expansion-panel.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [kalExpansionAnimations.bodyExpansion],
  providers: [
    // Provide KalAccordion as undefined to prevent nested expansion panels from registering
    // to the same accordion.
    {provide: KAL_ACCORDION, useValue: undefined},
  ]
})
export class KalExpansionPanelComponent extends CdkAccordionItem implements OnChanges, OnDestroy {

  /**
   * Stream that emits for changes in `@Input` properties.
   */
  readonly inputChanges = new Subject<SimpleChanges>();

  /**
   * ID for the associated header element. Used for a11y labelling.
   */
  readonly headerId = uniqid('kal-expansion-panel-header-');

  /**
   * Optionally defined accordion the expansion panel belongs to.
   */
  accordion: KalAccordionBase;

  /**
   * Element containing the panel's user-provided content.
   */
  @ViewChild('body') panelBody: ElementRef<HTMLElement>;

  /**
   * DOM
   */
  private readonly document: Document;

  /**
   * Whether the toggle indicator should be hidden.
   */
  private hideToggleIcon = false;

  constructor(@Optional() @SkipSelf() @Inject(KAL_ACCORDION) accordion: KalAccordionBase,
              changeDetectorRef: ChangeDetectorRef,
              uniqueSelectionDispatcher: UniqueSelectionDispatcher,
              viewContainerRef: ViewContainerRef,
              @Inject(DOCUMENT) document: any) {
    super(accordion, changeDetectorRef, uniqueSelectionDispatcher);
    this.accordion = accordion;
    this.document = document;
  }

  /**
   * Whether the toggle indicator should be hidden.
   */
  @Input()
  get hideToggle(): boolean {
    return this.hideToggleIcon || (this.accordion && this.accordion.hideToggle);
  }
  set hideToggle(value: boolean) {
    this.hideToggleIcon = coerceBooleanProperty(value);
  }

  /**
   * Gets the expanded state string.
   */
  getExpandedState(): KalExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.inputChanges.next(changes);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.inputChanges.complete();
  }

}
