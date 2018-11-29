import { ComponentRef, Injectable, Injector, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { KalSnackbarConfig } from './kal-snackbar-config';
import { KalSnackbarComponent } from './kal-snackbar.component';
import { KAL_SNACKBAR_CONFIG } from './kal-snackbar.injector';

@Injectable({
  providedIn: 'root'
})
export class KalSnackbarService {

  private snackbarsList: ComponentRef<KalSnackbarComponent>[] = [];

  private waitingSnackbarsList: KalSnackbarConfig[] = [];

  constructor(private overlay: Overlay,
              private injector: Injector,
              @Optional() private location?: Location) {
  }

  /**
   * open Dialog
   */
  open<D>(config?: KalSnackbarConfig<D>) {
    if (this.snackbarsList.length === 0) {

      config = this.applyConfig(config);

      const overlayRef = this.createOverlay(config);
      config.overlayRef = overlayRef;
      config.active = true;

      const snackbarRef = this.attachSnackbar<D>(overlayRef, config);

      // // register dialog
      this.snackbarsList.push(snackbarRef);

      return snackbarRef;
    } else {
      this.waitingSnackbarsList.push(config);
    }
  }

  close(config: KalSnackbarConfig) {
    const activeSnackbar = this.snackbarsList.find(s => s.instance.config.id === config.id).instance;
    this.snackbarsList = this.snackbarsList.filter(s => s.instance.config.id !== config.id);

    config.overlayRef.dispose();

    // check for snackbar waiting
    if (this.waitingSnackbarsList.length > 0) {
      this.open(this.waitingSnackbarsList.shift());
    }
  }

  isASnackbarActive() {
    return this.snackbarsList.length > 0;
  }

  /**
   * get dialogs list
   */
  getSnackbarsList() {
    return this.snackbarsList;
  }


  /**
   * attach dialog content to container
   */
  private attachSnackbar<D>(overlayRef: OverlayRef, config: KalSnackbarConfig<D>): ComponentRef<KalSnackbarComponent> {

    const injector = this.createInjector<D>(config);
    const portal = new ComponentPortal(KalSnackbarComponent, undefined, injector);

    return overlayRef.attach(portal);
  }

  /**
   * create injector to share data between dialog and dialog's opener component
   */
  private createInjector<D>(config: KalSnackbarConfig<D>): PortalInjector {

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    const injectionTokens = new WeakMap<any, any>([
      [KAL_SNACKBAR_CONFIG, config],
    ]);

    return new PortalInjector(userInjector || this.injector, injectionTokens);
  }

  /**
   * set default config
   */
  private applyConfig(config) {
    // default config
    const positionStrategy = this.overlay.position().global().bottom().centerHorizontally();
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return Object.assign(new KalSnackbarConfig(), {positionStrategy, scrollStrategy}, config);
  }


  /**
   * create overlay for dialog
   */
  private createOverlay(config) {

    return this.overlay.create(config);
  }

}
