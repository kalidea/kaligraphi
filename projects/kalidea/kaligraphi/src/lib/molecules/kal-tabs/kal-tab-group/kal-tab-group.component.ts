import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { KalTabComponent } from '../kal-tab/kal-tab.component';

export class KalTabChange {
  constructor(public tab: KalTabComponent, public index: number) {
  }
}

@Component({
  selector: 'kal-tab-group',
  templateUrl: './kal-tab-group.component.html',
  styleUrls: ['./kal-tab-group.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabGroupComponent implements OnInit, AfterContentInit {

  /**
   * This event is emitted when a tab is selected
   */
  @Output() selectedTab = new EventEmitter<KalTabChange>();

  /**
   * List of kal tab component
   */
  @ContentChildren(KalTabComponent) tabs: QueryList<KalTabComponent>;

  /**
   * The index of the selected tab
   */
  private selectedTabIndex = 0;

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
      this.selectedTab.emit(new KalTabChange(tab, tabIndex));
    }
  }

  ngOnInit() {
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

}
