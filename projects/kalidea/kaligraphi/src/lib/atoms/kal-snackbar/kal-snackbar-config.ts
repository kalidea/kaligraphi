
import { ViewContainerRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

// Counter for unique snackbar ids.
let kalUniqSnackbarId = 0;

export class KalSnackbarConfig<D = any> {

  active ?= false;

  id ?: string;

  title ?: string;

  overlayRef ?: OverlayRef;

  action ?: {
    label: string,
    callback: () => void
  };

  data ?: D;

  duration ?= 4;

  viewContainerRef ?: ViewContainerRef;

  constructor(config?: KalSnackbarConfig<D>) {
    if (config) {
      Object.keys(config)
        .filter(key => typeof config[key] !== 'undefined')
        .forEach(key => this[key] = config[key]);
    }

    // generate id of dialog here for consistency
    if (!this.id) {
      this.id = `kal-snackbar-${kalUniqSnackbarId++}`;
    }
  }
}
