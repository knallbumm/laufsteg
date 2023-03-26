import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export function getOffset(laufsteg: InternalLaufsteg) {
  return Math.round(
    laufsteg._internal.savedDragOffset +
      (laufsteg._internal.currentDragTravel ?? 0)
  );
}
