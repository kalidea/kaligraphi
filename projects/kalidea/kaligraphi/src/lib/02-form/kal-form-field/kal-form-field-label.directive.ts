import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[kalFormFieldLabel]'
})
export class KalFormFieldLabelDirective extends CdkPortal {


}
