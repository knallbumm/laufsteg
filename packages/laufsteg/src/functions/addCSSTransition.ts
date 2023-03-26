import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const addCSSTransition =
  (laufsteg: InternalLaufsteg) => (duration?: number) => {
    if (!laufsteg._internal.domNodes.trolley) {
      return;
    }
    laufsteg._internal.domNodes.trolley.style.transition = `transform ${
      duration ?? 1
    }s linear`;
  };
