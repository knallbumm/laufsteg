import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export const captureCurrentOffset = (wrapper: LaufstegWrapper) => () => {
  if (!wrapper.internal.domNodes.trolley) {
    throw new Error(
      'Cannot capture current offset because there is no trolley'
    );
  }

  const containerRect =
    wrapper.internal.domNodes.container.getBoundingClientRect();
  const clientRect = wrapper.internal.domNodes.trolley.getBoundingClientRect();
  wrapper.internal.savedDragOffset = clientRect.x - containerRect.x;
};
