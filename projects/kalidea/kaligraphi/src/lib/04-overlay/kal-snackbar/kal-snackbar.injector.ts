import { InjectionToken } from '@angular/core';
import { KalSnackbarConfig } from './kal-snackbar-config';

/**
 * token to inject to retrieve data from dialog
 */
export const KAL_SNACKBAR_CONFIG = new InjectionToken<unknown>('KalSnackbarConfig');
