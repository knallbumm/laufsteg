import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const logSpeed =
  (wrapper: LaufstegWrapper) =>
  (timeDeltaSinceLastMove: number, travelSinceLastMove: number) => {
    const speedSinceLastMove = Math.round(
      (travelSinceLastMove / timeDeltaSinceLastMove) * 1000
    );
    wrapper.internal.lastSpeeds.push(speedSinceLastMove);

    if (wrapper.internal.lastSpeeds.length > 5) {
      wrapper.internal.lastSpeeds.shift();
    }
  };
