import type { InternalLaufsteg } from '../types/InternalLaufsteg';
import { getEventXPosition } from '../utils/getEventXPosition';
import { getOffset } from '../utils/getOffset';
import { isDragging } from '../utils/isDragging';
import { logSpeed } from './logSpeed';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';
import { setOffsetToDOM } from './setOffsetToDOM';

export const draggingMoved =
  (laufsteg: InternalLaufsteg) => (event: MouseEvent | TouchEvent) => {
    if (!isDragging(laufsteg)) {
      return;
    }

    const timeDeltaSinceLastMove =
      performance.now() - laufsteg._internal.lastMoveTimestamp;

    const lastMoveDragOffset = laufsteg._internal.currentDragTravel ?? 0;
    const dragXPosition = getEventXPosition(event);
    laufsteg._internal.currentDragTravel =
      dragXPosition - (laufsteg._internal.currentDragStartX ?? 0);

    laufsteg._internal.lastMoveTimestamp = performance.now();

    const travelSinceLastMove =
      lastMoveDragOffset - laufsteg._internal.currentDragTravel;

    logSpeed(laufsteg)(timeDeltaSinceLastMove, travelSinceLastMove);

    setOffsetToDOM(laufsteg)(getOffset(laufsteg));

    rearrangeCellsIfNeeded(laufsteg)();
  };
