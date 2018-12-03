// Counter for unique snackbar ids.
let kalOverlayManagerConfigUniqObjectId = 0;

export abstract class KalOverlayConfig {

  protected configName ?= 'overlayConfig';

  /**
   * uniq id
   */
  id ?: string;

  constructor(config) {
    if (config) {
      Object.keys(config)
        .filter(key => typeof config[key] !== 'undefined')
        .forEach(key => this[key] = config[key]);
    }

    // generate id of dialog here for consistency
    if (!this.id) {
      this.id = `kal-${this.configName}-config-${kalOverlayManagerConfigUniqObjectId++}`;
    }
  }

}
