import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[kalDialogHeader]'
})
export class KalDialogHeaderDirective {

  /**
   * auto binding class for dialog-header
   */
  @HostBinding('class.kal-dialog__header') header = true;

}
