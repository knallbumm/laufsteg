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
  const x = clientRect.x - containerRect.x;
  const y = clientRect.y - containerRect.y;

  const hypotenuse = Math.sign(x) * Math.sqrt(x**2 + y**2);
  
  laufsteg._internal.savedDragOffset = hypotenuse;
};
