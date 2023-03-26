import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const resetDrag = (laufsteg: InternalLaufsteg) => () => {
  laufsteg._internal.currentDragStartX = undefined;
  laufsteg._internal.currentDragTravel = undefined;
  laufsteg._internal.lastSpeeds = [];
};
