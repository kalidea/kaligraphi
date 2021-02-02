import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { KalSnackbarConfig } from './kal-snackbar-config';
import { KalSnackbarComponent } from './kal-snackbar.component';
import { KAL_SNACKBAR_CONFIG } from './kal-snackbar.injector';
import { KalOverlayManager } from '../../utils/classes/kal-overlay-manager';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KalSnackbarService extends KalOverlayManager {

  /**
   * active snackbar
   */
  private activeSnackbar: ComponentRef<KalSnackbarComponent>;

  /**
   * snackbars list waiting for display
   */
  private waitingSnackbarsList: KalSnackbarConfig[] = [];

  constructor(protected overlay: Overlay,
              private injector: Injector) {
    super(overlay, 'snackbar');
  }

  /**
   * open Snackbar
   */
  open<D>(config?: KalSnackbarConfig<D>) {

    config = new KalSnackbarConfig(config);

    if (!this.activeSnackbar) {
      const overlayConfig = this.applyConfig(config, this.positionStrategy.bottom().centerHorizontally());

      const overlayRef = this.createOverlay(overlayConfig);
      config.overlayRef = overlayRef;
      config.active = true;

      const snackbarRef = this.attachSnackbar<D>(overlayRef, config);

      // wait for time end, we do not need to store subscription
      // because: only one exist at a time ( take(1) here + complete from component )
      snackbarRef.instance.timeEnd.pipe(
        take(1),
        tap($event => this.close($event))
      ).subscribe();

      // // register snackbarRef
      this.activeSnackbar = snackbarRef;
    } else {
      this.waitingSnackbarsList.push(config);
    }
  }

  close(config: KalSnackbarConfig) {

    this.activeSnackbar = null;

    this.disposeIfExists(config.overlayRef);

    // check for snackbar waiting
    if (this.waitingSnackbarsList.length > 0) {
      this.open(this.waitingSnackbarsList.shift());
    }
  }

  /**
   * get active snackbar list
   */
  getActiveSnackBar(): ComponentRef<KalSnackbarComponent> {
    return this.activeSnackbar;
  }


  /**
   * attach snackbar content to container
   */
  private attachSnackbar<D>(overlayRef: OverlayRef, config: KalSnackbarConfig<D>): ComponentRef<KalSnackbarComponent> {

    const injector = this.createInjector<D>(config);
    const portal = new ComponentPortal(KalSnackbarComponent, undefined, injector);

    return overlayRef.attach(portal);
  }

  /**
   * create injector to share data between snackbar and dialog's opener component
   */
  private createInjector<D>(config: KalSnackbarConfig<D>): PortalInjector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    const injectionTokens = new WeakMap<any, any>([
      [KAL_SNACKBAR_CONFIG, config],
    ]);

    return new PortalInjector(userInjector || this.injector, injectionTokens);
  }


}
