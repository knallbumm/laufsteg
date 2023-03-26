import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { applyCursors } from '../utils/applyCursors';
import { getOffset } from '../utils/getOffset';
import { getSpeedAvg } from '../utils/getSpeedAvg';
import { isDragging } from '../utils/isDragging';
import { beginDeceleration } from './beginDeceleration';
import { resetDrag } from './resetDrag';
import { setAnimationDirection } from './setAnimationDirection';
import { setOffsetToDOM } from './setOffsetToDOM';

export const draggingEnded = (wrapper: LaufstegWrapper) => () => {
  if (!isDragging(wrapper)) {
    return;
  }

  wrapper.internal.savedDragOffset += wrapper.internal.currentDragTravel ?? 0;

  setOffsetToDOM(wrapper)(wrapper.internal.savedDragOffset);

  const dragReleaseSpeed = getSpeedAvg(wrapper)();
  setAnimationDirection(wrapper)(dragReleaseSpeed);
  wrapper.internal.dragReleaseSpeed = dragReleaseSpeed;

  wrapper.laufsteg.callbacks.onDragEnd?.(getOffset(wrapper));

  wrapper.internal.state = 'DECLERATING';
  wrapper.laufsteg.callbacks.onDecelerationStart?.(
    getOffset(wrapper),
    dragReleaseSpeed
  );
  beginDeceleration(wrapper)(performance.now());

  resetDrag(wrapper)();

  applyCursors(
    wrapper.internal.domNodes.container,
    wrapper.laufsteg.options.cursor,
    isDragging(wrapper)
  );
};
