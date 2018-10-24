import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnInit,
  QueryList, ViewChild,
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
export class KalTabGroupComponent implements OnInit, AfterViewInit {

  contentTemplatePortal: TemplatePortal;

  @ContentChildren(KalTabComponent) tabs: QueryList<KalTabComponent>;

  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.tabs.forEach(
      tab => {
        this.contentTemplatePortal = tab.content;
      }
    );

    this.portalOutlet.attachTemplatePortal(this.contentTemplatePortal);
    this.cdr.markForCheck();

  }

}
