import { KalOverlayConfig } from '../../utils/classes/kal-overlay-config';

/**
 * @see https://github.com/angular/material2/blob/master/src/lib/dialog/dialog-config.ts
 */
export class KalDialogConfig<D = any> extends KalOverlayConfig {

  /**
   * title for this Dialog
   */
  title ?: string;

  /**
   * Whether the dialog has a backdrop.
   */
  hasBackdrop ? = true;

  /**
   * Custom class for the backdrop
   */
  backdropClass ? = 'dialog-backdrop';

  /**
   * Whether the user can use escape or clicking outside to closeDialog a modal.
   */
  disableClose ? = false;

  /**
   * Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw
   */
  maxWidth ?: number | string = '80vw';

  /**
   * Data being injected into the child component.
   */
  data ?: D | null;

  protected configName ? = 'dialog';

  constructor(config?: KalDialogConfig<D>) {
    super(config);

    if (config) {
      config = Object.assign(new KalDialogConfig(), config);
      Object.keys(config).forEach( key => {
        this[key] = config[key];
      });
    }
  }

}
