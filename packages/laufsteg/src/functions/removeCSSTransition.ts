import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const removeCSSTransition = (wrapper: LaufstegWrapper) => () => {
  if (!wrapper.internal.domNodes.trolley) {
    return;
  }
  wrapper.internal.domNodes.trolley.style.transition = `none`;
};
