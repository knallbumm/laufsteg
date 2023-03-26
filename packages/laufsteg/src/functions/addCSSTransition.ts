import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const addCSSTransition =
  (wrapper: LaufstegWrapper) => (duration?: number) => {
    if (!wrapper.internal.domNodes.trolley) {
      return;
    }
    wrapper.internal.domNodes.trolley.style.transition = `transform ${
      duration ?? 1
    }s linear`;
  };
