import type { Cursor } from '../types/Cursor';

export function applyCursors(
  container: HTMLDivElement,
  cursor: Cursor,
  isDragging: boolean
) {
  if (typeof cursor == 'string') {
    container.style.cursor = cursor;
  } else {
    if (isDragging) {
      container.style.cursor = cursor.dragging;
    } else {
      container.style.cursor = cursor.hover;
    }
  }
}
