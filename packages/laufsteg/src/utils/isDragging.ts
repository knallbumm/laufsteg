import type { InternalLaufsteg } from '../types/InternalLaufsteg';

export function isDragging(laufsteg: InternalLaufsteg) {
  return (
    laufsteg._internal.currentDragStartX != undefined &&
    laufsteg._internal.state == 'DRAGGING'
  );
}
