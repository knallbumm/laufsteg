import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const removeCSSTransition = (laufsteg: InternalLaufsteg) => () => {
  if (!laufsteg._internal.domNodes.trolley) {
    return;
  }
  laufsteg._internal.domNodes.trolley.style.transition = `none`;
};
