import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const setOffsetToDOM =
  (laufsteg: InternalLaufsteg) => (offset: number) => {
    if (laufsteg._internal.domNodes.trolley) {
      laufsteg._internal.domNodes.trolley.style.setProperty(
        'transform',
        `translateX(${offset}px)`
      );
    }
  };
