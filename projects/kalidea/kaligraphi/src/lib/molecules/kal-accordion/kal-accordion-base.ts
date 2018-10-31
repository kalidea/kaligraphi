import { InjectionToken } from '@angular/core';
import { CdkAccordion } from '@angular/cdk/accordion';

/**
 * Base interface for a `KalAccordion`.
 */
export interface KalAccordionBase extends CdkAccordion {
  /** Whether the expansion indicator should be hidden. */
  hideToggle: boolean;

  /** Handles keyboard events coming in from the panel headers. */
  handleHeaderKeydown: (event: KeyboardEvent) => void;

  /** Handles focus events on the panel headers. */
  handleHeaderFocus: (header: any) => void;
}

/**
 * Token used to provide a `KalAccordion` to `KalExpansionPanel`.
 * Used primarily to avoid circular imports between `KalAccordion` and `KalExpansionPanel`.
 */
export const KAL_ACCORDION = new InjectionToken<KalAccordionBase>('KAL_ACCORDION');
