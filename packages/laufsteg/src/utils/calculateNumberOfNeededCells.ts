import type { Size } from '../types/Size';

export function calculateNumberOfNeededCells(
  cellSize: Size,
  containerSize: Size
): number {
  return Math.ceil(containerSize.width / cellSize.width);
}
