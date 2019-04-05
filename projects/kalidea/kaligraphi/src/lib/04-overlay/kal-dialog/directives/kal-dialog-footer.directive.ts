import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[kalDialogFooter]'
})
export class KalDialogFooterDirective {

  /**
   * auto binding class for dialog-footer
   */
  @HostBinding('class.kal-dialog__footer') footer = true;

}
