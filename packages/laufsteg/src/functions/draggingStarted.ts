import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { applyCursors } from '../utils/applyCursors';
import { getEventXPosition } from '../utils/getEventXPosition';
import { getOffset } from '../utils/getOffset';
import { isDragging } from '../utils/isDragging';
import { resetDecelerating } from './resetDecelerating';
import { stopCSSAnimation } from './stopCSSAnimation';

export const draggingStarted =
  (wrapper: LaufstegWrapper) => (event: MouseEvent | TouchEvent) => {
    if (isDragging(wrapper)) {
      return;
    }

    stopCSSAnimation(wrapper)();
    wrapper.internal.state = 'DRAGGING';
    resetDecelerating(wrapper)();

    wrapper.internal.currentDragStartX = getEventXPosition(event);
    wrapper.internal.currentDragTravel = 0;
    wrapper.internal.lastMoveTimestamp = performance.now();
    applyCursors(
      wrapper.internal.domNodes.container,
      wrapper.laufsteg.options.cursor,
      isDragging(wrapper)
    );
    wrapper.laufsteg.callbacks.onDragStart?.(getOffset(wrapper));
  };
