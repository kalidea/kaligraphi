import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { KalTabComponent } from '../kal-tab/kal-tab.component';

@Component({
  selector: 'kal-tab-group',
  templateUrl: './kal-tab-group.component.html',
  styleUrls: ['./kal-tab-group.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabGroupComponent implements OnInit, AfterContentInit {

  contentTemplatePortal: TemplatePortal;

  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  @ContentChildren(KalTabComponent) tabs: QueryList<KalTabComponent>;

  private selectedTabIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {
  }

  selectTabHeader(tab: KalTabComponent, tabIndex: number) {
    if (!tab.disabled) {
      this.selectedTabIndex = tabIndex;
    }
  }

  get selectedIndex(): number {
    return this.selectedTabIndex;
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
