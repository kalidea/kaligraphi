import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[kalDialogContent]'
})
export class KalDialogContentDirective {

  /**
   * auto binding class for dialog-content
   */
  @HostBinding('class.kal-dialog__content') content = true;

}
