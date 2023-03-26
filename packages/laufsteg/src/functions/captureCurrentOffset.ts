import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export const captureCurrentOffset = (laufsteg: InternalLaufsteg) => () => {
  if (!laufsteg._internal.domNodes.trolley) {
    throw new Error(
      'Cannot capture current offset because there is no trolley'
    );
  }

  const containerRect =
    laufsteg._internal.domNodes.container.getBoundingClientRect();
  const clientRect =
    laufsteg._internal.domNodes.trolley.getBoundingClientRect();
  laufsteg._internal.savedDragOffset = clientRect.x - containerRect.x;
};
