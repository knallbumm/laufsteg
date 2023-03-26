import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const resetDecelerating = (wrapper: LaufstegWrapper) => () => {
  wrapper.internal.dragReleaseSpeed = 0;
  wrapper.internal.decelerationStart = undefined;
  wrapper.internal.lastDelecerationFrameTimestamp = undefined;
};
