import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { addCSSTransition } from './addCSSTransition';
import { setNewAnimationPosition } from './setNewAnimationPosition';

export const startCSSAnimation = (laufsteg: InternalLaufsteg) => () => {
  // TODO: Handle state when is decelerating
  laufsteg._internal.state = 'CSS_ANIMATING';

  const animationDuration =
    laufsteg._internal.cellSize.width /
    Math.abs(laufsteg.options.animationSpeed);
  addCSSTransition(laufsteg)(animationDuration);

  setNewAnimationPosition(laufsteg)();
};
