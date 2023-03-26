import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { addCSSTransition } from './addCSSTransition';
import { setNewAnimationPosition } from './setNewAnimationPosition';

export const startCSSAnimation = (wrapper: LaufstegWrapper) => () => {
  // TODO: Handle state when is decelerating
  wrapper.internal.state = 'CSS_ANIMATING';

  const animationDuration =
    wrapper.internal.cellSize.width /
    Math.abs(wrapper.laufsteg.options.animationSpeed);
  addCSSTransition(wrapper)(animationDuration);

  setNewAnimationPosition(wrapper)();
};
