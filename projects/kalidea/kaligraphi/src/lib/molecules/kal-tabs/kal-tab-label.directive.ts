import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[kalTabLabel]'
})
export class KalTabLabelDirective extends CdkPortal {

}
