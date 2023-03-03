import type { Size } from '../types/Size';

export function calculateNeededElements(
  cellSize: Size,
  containerSize: Size
): number {
  return Math.ceil(containerSize.width / cellSize.width);
}
