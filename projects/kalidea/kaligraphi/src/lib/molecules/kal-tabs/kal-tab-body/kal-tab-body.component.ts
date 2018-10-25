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

  /**
   * Content to display in template
   */
  @Input() content: TemplatePortal<any>;

  /**
   * The reference to the cdk portal outlet
   */
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.attachTemplatePortal();
  }

  /**
   * Attach a template portal
   */
  private attachTemplatePortal() {
    if (this.content) {
      this.portalOutlet.attachTemplatePortal(this.content);
      this.cdr.markForCheck();
    }
  }
}
