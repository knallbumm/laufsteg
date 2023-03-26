import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export function getOffset(wrapper: LaufstegWrapper) {
  return Math.round(
    wrapper.internal.savedDragOffset + (wrapper.internal.currentDragTravel ?? 0)
  );
}
