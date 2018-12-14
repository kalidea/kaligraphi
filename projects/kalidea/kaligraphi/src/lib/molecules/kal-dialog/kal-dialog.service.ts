import { Injectable, Injector, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';

import { KAL_DIALOG_DATA } from './kal-dialog.injector';
import { KalDialogRef } from './kal-dialog-ref';
import { KalDialogConfig } from './kal-dialog-config';
import { KalDialogContainerComponent } from './dialog-container/kal-dialog-container.component';
import { KalOverlayManager } from '../../utils/classes/kal-overlay-manager';


@Injectable({
  providedIn: 'root'
})
export class KalDialogService extends KalOverlayManager {

  /**
   * list of opened dialogs
   */
  private dialogsList: KalDialogRef<any, any>[] = [];

  constructor(protected overlay: Overlay,
              private injector: Injector,
              @Optional() private location?: Location) {
    super(overlay);
  }

  /**
   * get dialogs list
   */
  getDialogsList() {
    return this.dialogsList;
  }


  /**
   * open Dialog
   */
  open<T, D>(component: ComponentType<T>,
             config?: KalDialogConfig<D>) {

    const overlayConfig = this.applyConfig(config, this.positionStrategy.centerVertically().centerHorizontally());

    const overlayRef = this.createOverlay(overlayConfig);
    const dialogContainer = this.attachDialogContainer(overlayRef, overlayConfig);
    const dialogRef = this.attachDialogContent<T, D>(component,
      dialogContainer,
      overlayRef,
      overlayConfig);

    dialogContainer.setDialogRef(dialogRef);

    // // register dialog
    this.dialogsList.push(dialogRef);

    return dialogRef;

  }

  /**
   * retrieve dialog by ID
   */
  getDialog(id: string) {
    return this.dialogsList.find(dialog => dialog.id === id);
  }

  /**
   * retrieve dialog by ID
   */
  close<T, D>(dialogRef: KalDialogRef<T, D>) {
    dialogRef.overlayRef.detach();
  }


  /**
   * Attach dialogContainer to overlay
   */
  private attachDialogContainer(overlay: OverlayRef, config: KalDialogConfig): KalDialogContainerComponent {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = new PortalInjector(userInjector || this.injector, new WeakMap([
      [KalDialogConfig, config]
    ]));
    const containerPortal = new ComponentPortal(KalDialogContainerComponent, config.viewContainerRef, injector);
    const containerRef = overlay.attach<KalDialogContainerComponent>(containerPortal);

    return containerRef.instance;
  }

  /**
   * attach dialog content to container
   */
  private attachDialogContent<T, D>(component: ComponentType<T>,
                                    dialogContainer: KalDialogContainerComponent,
                                    overlayRef: OverlayRef,
                                    config: KalDialogConfig<D>): KalDialogRef<T, D> {

    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and closeDialog it.
    const dialogRef = new KalDialogRef<T, D>(overlayRef, dialogContainer, this, config, this.location, config.id);

    // watch dialog close to remove from dialogsList
    dialogRef.afterClosed.subscribe(
      () => {
        const index = this.dialogsList.findIndex(dialog => dialog.id === dialogRef.id);
        if (index > -1) {
          this.dialogsList.splice(index, 1);
        }
      }
    );

    const injector = this.createInjector<T, D>(config, dialogRef, dialogContainer);
    const contentRef = dialogContainer.attachComponentPortal<T>(new ComponentPortal(component, undefined, injector));
    dialogRef.componentInstance = contentRef.instance;


    return dialogRef;
  }

  /**
   * create injector to share data between dialog and dialog's opener component
   */
  private createInjector<T, D>(config: KalDialogConfig<D>,
                               dialogRef: KalDialogRef<T, D>,
                               dialogContainer: KalDialogContainerComponent): PortalInjector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    // The DialogContainer is injected in the portal as the DialogContainer and the dialog's
    // content are created out of the same ViewContainerRef and as such, are siblings for injector
    // purposes. To allow the hierarchy that is expected, the DialogContainer is explicitly
    // added to the injection tokens.
    const injectionTokens = new WeakMap<any, any>([
      [KalDialogContainerComponent, dialogContainer],
      [KAL_DIALOG_DATA, config.data || {}],
      [KalDialogRef, dialogRef]
    ]);

    return new PortalInjector(userInjector || this.injector, injectionTokens);
  }
}
