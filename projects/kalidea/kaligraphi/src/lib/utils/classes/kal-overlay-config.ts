// Counter for unique snackbar ids.
import { OverlayConfig } from '@angular/cdk/overlay';
import { ViewContainerRef } from '@angular/core';

let kalOverlayManagerConfigUniqObjectId = 0;

export abstract class KalOverlayConfig extends OverlayConfig {

  protected configName ? = 'overlayConfig';

  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the attached component. This does not affect where the component
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;

  /**
   * uniq id
   */
  id ? = `kal-${this.configName}-config-${kalOverlayManagerConfigUniqObjectId++}`;

}
