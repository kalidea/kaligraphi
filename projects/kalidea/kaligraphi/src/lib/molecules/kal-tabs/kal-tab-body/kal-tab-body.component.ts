import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'kal-tab-body',
  templateUrl: './kal-tab-body.component.html',
  styleUrls: ['./kal-tab-body.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabBodyComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  @Input() content: TemplatePortal<any>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.attachTemplatePortal();
  }

  private attachTemplatePortal() {
    if (this.content) {
      this.portalOutlet.attachTemplatePortal(this.content);
      this.cdr.markForCheck();
    }
  }
}
