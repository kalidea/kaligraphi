import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';

import { KalTabGroupComponent } from '../kal-tab-group/kal-tab-group.component';

@Component({
  selector: 'kal-tab-body',
  template: `
    <ng-template cdkPortalOutlet>
    </ng-template>
  `,
  styleUrls: ['./kal-tab-body.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabBodyComponent implements AfterViewInit {

  /**
   * Content to display in template
   */
  @Input() content: TemplatePortal<any>;

  /**
   * The reference to the cdk portal outlet
   */
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  constructor(private cdr: ChangeDetectorRef,
              @Optional() @Inject(forwardRef(() => KalTabGroupComponent)) public tabGroup: KalTabGroupComponent) {
  }

  ngAfterViewInit() {
    if (this.tabGroup) {
      this.tabGroup.attachTemplatePortal(this.portalOutlet, this.content, this.cdr);
    }
  }
}
