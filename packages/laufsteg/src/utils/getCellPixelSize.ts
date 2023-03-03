import type { Cell } from '../types/Cell';
import type { Size } from '../types/Size';

export function getCellPixelSize(item: Cell): Size {
  return { width: item.clientWidth, height: item.clientHeight };
}
