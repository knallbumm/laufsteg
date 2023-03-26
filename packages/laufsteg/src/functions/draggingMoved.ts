import type { LaufstegWrapper } from '../types/LaufstegWrapper';
import { getEventXPosition } from '../utils/getEventXPosition';
import { getOffset } from '../utils/getOffset';
import { isDragging } from '../utils/isDragging';
import { logSpeed } from './logSpeed';
import { rearrangeCellsIfNeeded } from './rearrangeCellsIfNeeded';
import { setOffsetToDOM } from './setOffsetToDOM';

export const draggingMoved =
  (wrapper: LaufstegWrapper) => (event: MouseEvent | TouchEvent) => {
    if (!isDragging(wrapper)) {
      return;
    }

    const timeDeltaSinceLastMove =
      performance.now() - wrapper.internal.lastMoveTimestamp;

    const lastMoveDragOffset = wrapper.internal.currentDragTravel ?? 0;
    const dragXPosition = getEventXPosition(event);
    wrapper.internal.currentDragTravel =
      dragXPosition - (wrapper.internal.currentDragStartX ?? 0);

    wrapper.internal.lastMoveTimestamp = performance.now();

    const travelSinceLastMove =
      lastMoveDragOffset - wrapper.internal.currentDragTravel;

    logSpeed(wrapper)(timeDeltaSinceLastMove, travelSinceLastMove);

    setOffsetToDOM(wrapper)(getOffset(wrapper));

    rearrangeCellsIfNeeded(wrapper)();
  };
