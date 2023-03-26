import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const resetDrag = (wrapper: LaufstegWrapper) => () => {
  wrapper.internal.currentDragStartX = undefined;
  wrapper.internal.currentDragTravel = undefined;
  wrapper.internal.lastSpeeds = [];
};
