import type { CellSize } from '../types';

export function getItemSize(item: HTMLDivElement): CellSize {
  return { width: `${item.clientWidth}px`, height: `${item.clientHeight}px` };
}
