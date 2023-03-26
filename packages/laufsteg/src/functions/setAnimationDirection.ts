import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const setAnimationDirection =
  (wrapper: LaufstegWrapper) => (dragSpeed: number) => {
    if (dragSpeed < 0) {
      wrapper.laufsteg.options.animationSpeed =
        Math.abs(wrapper.laufsteg.options.animationSpeed) * -1;
    } else if (dragSpeed > 0) {
      wrapper.laufsteg.options.animationSpeed = Math.abs(
        wrapper.laufsteg.options.animationSpeed
      );
    }
  };
