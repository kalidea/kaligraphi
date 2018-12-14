import { ViewContainerRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { KalOverlayConfig } from '../../utils/classes/kal-overlay-config';


export class KalSnackbarConfig<D = any> extends KalOverlayConfig {

  active ? = false;

  title ?: string;

  overlayRef ?: OverlayRef;

  action ?: {
    label: string,
    callback: () => void
  };

  data ?: D;

  duration ? = 4;

  viewContainerRef ?: ViewContainerRef;

  protected configName ? = 'snackbar';

  constructor(config?: KalSnackbarConfig) {
    super();

    if (config) {
      Object.keys(config)
        .filter(key => typeof config[key] !== 'undefined')
        .forEach(key => this[key] = config[key]);
    }
  }

}
