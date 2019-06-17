import { ConnectedPosition } from '@angular/cdk/overlay';

/**
 * definitions of positions for cdk
 */


export const kalPositions: { [key: string]: ConnectedPosition } = {
  bottom: {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
  top: {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'},
  left: {originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center'},
  right: {originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center'},
};
