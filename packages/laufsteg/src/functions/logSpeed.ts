import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const logSpeed =
  (laufsteg: InternalLaufsteg) =>
  (timeDeltaSinceLastMove: number, travelSinceLastMove: number) => {
    const speedSinceLastMove = Math.round(
      (travelSinceLastMove / timeDeltaSinceLastMove) * 1000
    );
    laufsteg._internal.lastSpeeds.push(speedSinceLastMove);

    if (laufsteg._internal.lastSpeeds.length > 5) {
      laufsteg._internal.lastSpeeds.shift();
    }
  };
