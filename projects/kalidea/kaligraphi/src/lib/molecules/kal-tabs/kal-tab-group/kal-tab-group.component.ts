import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { KalTabComponent } from '../kal-tab/kal-tab.component';
import { KalTabChange } from '../kal-tab-change';
import { KalTabHeaderComponent } from '../kal-tab-header/kal-tab-header.component';

@Component({
  selector: 'kal-tab-group',
  templateUrl: './kal-tab-group.component.html',
  styleUrls: ['./kal-tab-group.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabGroupComponent implements AfterContentInit, AfterViewInit {

  /**
   * This event is emitted when a tab is selected
   */
  @Output() selectedTab = new EventEmitter<KalTabChange>();

  /**
   * List of kal tab component
   */
  @ContentChildren(KalTabComponent) tabs: QueryList<KalTabComponent>;

  /**
   * List of kal tab header component
   */
  @ViewChildren(KalTabHeaderComponent) headers: QueryList<KalTabHeaderComponent>;

  /**
   * The index of the selected tab
   */
  private selectedTabIndex = 0;

  /**
   * Manages keyboard events for options in the panel
   */
  private keyManager: ActiveDescendantKeyManager<KalTabHeaderComponent>;

  /**
   * Whether or not the select is focus
   */
  private isFocused: boolean;

  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   * Return index of selected tab
   */
  get selectedIndex(): number {
    return this.selectedTabIndex;
  }

  /**
   * Select a tab and emit an event with the index of the selected tab
   */
  selectTabHeader(tab: KalTabComponent, tabIndex: number) {
    if (!tab.disabled) {
      this.selectedTabIndex = tabIndex;
      this.keyManager.setActiveItem(this.selectedIndex);
      this.selectedTab.emit(new KalTabChange(tab, tabIndex));
    }
  }

  /**
   * Attach a template portal
   */
  attachTemplatePortal(portalOutlet: CdkPortalOutlet, content: TemplatePortal, cdr: ChangeDetectorRef) {
    if (content) {
      portalOutlet.attachTemplatePortal(content);
      cdr.detectChanges();
    }
  }

  /**
   * Focus the tab element
   */
  @HostListener('focus')
  focus(): void {
    this.isFocused = true;
    this.keyManager.setActiveItem(this.selectedIndex);
  }

  /**
   * Blur the tab element
   */
  @HostListener('blur')
  blur() {
    this.isFocused = false;
    this.keyManager.setActiveItem(this.selectedIndex);
  }

  /**
   * Handles all keydown events on the tab
   */
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const {keyCode} = event;

    const isOpenKey = keyCode === ENTER || keyCode === SPACE;

    if (!this.isFocused) {
      return;
    }

    if (isOpenKey && this.keyManager.activeItem) {
      event.preventDefault();
      const tabToSelect = this.tabs.find((item, i) => i === this.keyManager.activeItemIndex);
      this.selectTabHeader(tabToSelect, this.keyManager.activeItemIndex);
    } else {
      this.keyManager.onKeydown(event);
    }
  }

  ngAfterContentInit() {
    this.tabs.forEach(
      (tab, index) => {
        if (tab.selected) {
          this.selectedTabIndex = index;
          return;
        }
      }
    );

    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager<KalTabHeaderComponent>(this.headers).withHorizontalOrientation('ltr');
  }

}
