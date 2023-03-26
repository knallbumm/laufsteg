import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const getSpeedAvg = (wrapper: LaufstegWrapper) => () => {
  return (
    wrapper.internal.lastSpeeds.reduce((p, c) => p + c, 0) /
    wrapper.internal.lastSpeeds.length
  );
};
