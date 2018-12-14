// Counter for unique snackbar ids.
import { OverlayConfig } from '@angular/cdk/overlay';

let kalOverlayManagerConfigUniqObjectId = 0;

export abstract class KalOverlayConfig extends OverlayConfig {

  protected configName ? = 'overlayConfig';

  /**
   * uniq id
   */
  id ? = `kal-${this.configName}-config-${kalOverlayManagerConfigUniqObjectId++}`;

}
