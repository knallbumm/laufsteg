import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const setAnimationDirection =
  (laufsteg: InternalLaufsteg) => (dragSpeed: number) => {
    if (dragSpeed < 0) {
      laufsteg.options.animationSpeed =
        Math.abs(laufsteg.options.animationSpeed) * -1;
    } else if (dragSpeed > 0) {
      laufsteg.options.animationSpeed = Math.abs(
        laufsteg.options.animationSpeed
      );
    }
  };
