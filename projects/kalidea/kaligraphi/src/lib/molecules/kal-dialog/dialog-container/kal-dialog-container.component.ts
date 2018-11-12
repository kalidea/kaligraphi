import { Component, ComponentRef, ViewChild } from '@angular/core';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

import { KalDialogConfig } from '../kal-dialog-config';
import { KalDialogRef } from '../kal-dialog-ref';

@Component({
  templateUrl: './kal-dialog-container.component.html'
})
export class KalDialogContainerComponent {

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  private dialogRef: KalDialogRef<any>;

  constructor(public config: KalDialogConfig) {
  }

  /**
   * set dialog ref for this container
   */
  setDialogRef<T>(dialogRef: KalDialogRef<T>) {
    this.dialogRef = dialogRef;
  }

  /**
   * close dialog
   */
  closeDialog() {
    this.dialogRef.close();
  }

  /**
   * attach component portal to this container
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throw Error('Attempting to attach dialog content after content is already attached');
    }
    return this.portalOutlet.attachComponentPortal(portal);
  }

}
