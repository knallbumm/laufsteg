import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const resetDecelerating = (laufsteg: InternalLaufsteg) => () => {
  laufsteg._internal.dragReleaseSpeed = 0;
  laufsteg._internal.decelerationStart = undefined;
  laufsteg._internal.lastDelecerationFrameTimestamp = undefined;
};
