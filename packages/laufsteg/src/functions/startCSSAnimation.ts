import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { addCSSTransition } from './addCSSTransition';
import { setNewAnimationPosition } from './setNewAnimationPosition';

export const startCSSAnimation = (laufsteg: InternalLaufsteg) => () => {
  // TODO: Handle state when is decelerating
  laufsteg._internal.state = 'CSS_ANIMATING';

  const animationDuration = 60;

  addCSSTransition(laufsteg)(animationDuration);

  setNewAnimationPosition(laufsteg)();
};
