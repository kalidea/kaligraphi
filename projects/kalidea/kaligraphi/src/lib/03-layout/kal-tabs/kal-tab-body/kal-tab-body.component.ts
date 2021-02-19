import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { KalTabArea } from '../kal-tab-area';

@Component({
  selector: 'kal-tab-body',
  template: `
    <ng-template cdkPortalOutlet>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabBodyComponent extends KalTabArea implements AfterViewInit {
}
