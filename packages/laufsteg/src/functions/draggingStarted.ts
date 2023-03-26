import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { applyCursors } from '../utils/applyCursors';
import { getEventXPosition } from '../utils/getEventXPosition';
import { getOffset } from '../utils/getOffset';
import { isDragging } from '../utils/isDragging';
import { resetDecelerating } from './resetDecelerating';
import { stopCSSAnimation } from './stopCSSAnimation';

export const draggingStarted =
  (laufsteg: InternalLaufsteg) => (event: MouseEvent | TouchEvent) => {
    if (isDragging(laufsteg)) {
      return;
    }

    stopCSSAnimation(laufsteg)();
    laufsteg._internal.state = 'DRAGGING';
    resetDecelerating(laufsteg)();

    laufsteg._internal.currentDragStartX = getEventXPosition(event);
    laufsteg._internal.currentDragTravel = 0;
    laufsteg._internal.lastMoveTimestamp = performance.now();
    applyCursors(
      laufsteg._internal.domNodes.container,
      laufsteg.options.cursor,
      isDragging(laufsteg)
    );
    laufsteg.callbacks.onDragStart?.(getOffset(laufsteg));
  };
