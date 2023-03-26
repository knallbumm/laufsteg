import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const getSpeedAvg = (laufsteg: InternalLaufsteg) => () => {
  return (
    laufsteg._internal.lastSpeeds.reduce((p, c) => p + c, 0) /
    laufsteg._internal.lastSpeeds.length
  );
};
