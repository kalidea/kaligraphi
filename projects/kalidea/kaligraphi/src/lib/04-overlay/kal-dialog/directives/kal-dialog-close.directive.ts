import { Directive, HostListener, Input, Optional } from '@angular/core';
import { KalDialogRef } from '../kal-dialog-ref';
import { KalDialogService } from '../kal-dialog.service';

@Directive({
  selector: '[kalDialogClose]'
})
export class KalDialogCloseDirective {

  /**
   * if provided, should refer to dialogRefId
   */
  @Input() private kalDialogClose: string;

  constructor(@Optional() private dialogRef: KalDialogRef<any>,
              private dialogService: KalDialogService) {
  }

  @HostListener('click')
  close() {

    const dialogRef = this.dialogRef || this.dialogService.getDialog(this.kalDialogClose);

    if (dialogRef && !dialogRef.config.disableClose) {
      dialogRef.close();
    }
  }
}
