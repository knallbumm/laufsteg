import type { LaufstegWrapper } from '../types/LaufstegWrapper';

export function isDragging(wrapper: LaufstegWrapper) {
  return (
    wrapper.internal.currentDragStartX != undefined &&
    wrapper.internal.state == 'DRAGGING'
  );
}
