import { animate, AnimationTriggerMetadata, state, style, transition, trigger, } from '@angular/animations';

/**
 * Time and timing curve for expansion panel animations.
 */
export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const kalExpansionAnimations: {
  readonly indicatorRotate: AnimationTriggerMetadata;
  readonly bodyExpansion: AnimationTriggerMetadata;
} = {
  /** Animation that rotates the indicator arrow. */
  indicatorRotate: trigger('indicatorRotate', [
    state('collapsed, void', style({transform: 'rotate(0deg)'})),
    state('expanded', style({transform: 'rotate(180deg)'})),
    transition('expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ]),

  /** Animation that expands and collapses the panel content. */
  bodyExpansion: trigger('bodyExpansion', [
    state('collapsed, void', style({height: '0px', visibility: 'hidden', overflow: 'hidden'})),
    state('expanded', style({height: '*', visibility: 'visible', overflow: 'visible'})),
    transition('expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ])
};
