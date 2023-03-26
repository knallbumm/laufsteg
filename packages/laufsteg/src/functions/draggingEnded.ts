import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { applyCursors } from '../utils/applyCursors';
import { getOffset } from '../utils/getOffset';
import { getSpeedAvg } from '../utils/getSpeedAvg';
import { isDragging } from '../utils/isDragging';
import { beginDeceleration } from './beginDeceleration';
import { resetDrag } from './resetDrag';
import { setAnimationDirection } from './setAnimationDirection';
import { setOffsetToDOM } from './setOffsetToDOM';

export const draggingEnded = (laufsteg: InternalLaufsteg) => () => {
  if (!isDragging(laufsteg)) {
    return;
  }

  laufsteg._internal.savedDragOffset +=
    laufsteg._internal.currentDragTravel ?? 0;

  setOffsetToDOM(laufsteg)(laufsteg._internal.savedDragOffset);

  const dragReleaseSpeed = getSpeedAvg(laufsteg)();
  setAnimationDirection(laufsteg)(dragReleaseSpeed);
  laufsteg._internal.dragReleaseSpeed = dragReleaseSpeed;

  laufsteg.callbacks.onDragEnd?.(getOffset(laufsteg));

  laufsteg._internal.state = 'DECLERATING';
  laufsteg.callbacks.onDecelerationStart?.(
    getOffset(laufsteg),
    dragReleaseSpeed
  );
  beginDeceleration(laufsteg)(performance.now());

  resetDrag(laufsteg)();

  applyCursors(
    laufsteg._internal.domNodes.container,
    laufsteg.options.cursor,
    isDragging(laufsteg)
  );
};
