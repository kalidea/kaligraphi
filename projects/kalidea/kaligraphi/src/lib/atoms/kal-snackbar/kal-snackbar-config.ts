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

  protected configName ? = 'snackbar';

  constructor(config?: KalSnackbarConfig) {
    super();

    if (config) {
      config = Object.assign(new KalSnackbarConfig(), config);
      this.active = config.active;
      this.title = config.title;
      this.overlayRef = config.overlayRef;
      this.action = config.action;
      this.data = config.data;
      this.duration = config.duration;
      this.viewContainerRef = config.viewContainerRef;
    }
  }

}
