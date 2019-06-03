import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

/**
 * directive to catch tooltip content
 */
@Directive({
  selector: '[kalTooltipContent]'
})
export class KalTooltipContentDirective extends CdkPortal  {
}
