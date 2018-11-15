import { ViewContainerRef } from '@angular/core';

// Counter for unique dialog ids.
let uniqueId = 0;

/**
 * @see https://github.com/angular/material2/blob/master/src/lib/dialog/dialog-config.ts
 */
export class KalDialogConfig<D = any> {

  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef ?: ViewContainerRef;

  /**
   * title for this Dialog
   */
  title ?: string;

  /**
   * ID for the dialog. If omitted, a unique one will be generated.
   */
  id ?: string;

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
   * Width of the dialog.
   */
  width ? = '';

  /**
   * Height of the dialog.
   */
  height ? = '';

  /**
   * Min-width of the dialog. If a number is provided, pixel units are assumed.
   */
  minWidth ?: number | string;

  /**
   * Min-height of the dialog. If a number is provided, pixel units are assumed.
   */
  minHeight ?: number | string;

  /**
   * Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw
   */
  maxWidth ?: number | string = '80vw';

  /**
   * Max-height of the dialog. If a number is provided, pixel units are assumed.
   */
  maxHeight ?: number | string;

  /**
   * Data being injected into the child component.
   */
  data ?: D | null = null;

  /**
   * Whether the dialog should closeDialog when the user goes backwards/forwards in history.
   */
  closeOnNavigation ? = true;

  constructor(config?: KalDialogConfig<D>) {
    if (config) {
      Object.keys(config)
        .filter(key => typeof config[key] !== 'undefined')
        .forEach(key => this[key] = config[key]);
    }

    // generate id of dialog here for consistency
    if (!this.id) {
      this.id = `kal-dialog-${uniqueId++}`;
    }
  }
}
