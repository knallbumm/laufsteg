import type { Size } from '../types/Size';

export function calculateOverdoses({
  offset,
  min,
  cellSize,
  numberOfCells,
  containerSize,
}: {
  offset: number;
  min: number;
  cellSize: Size;
  containerSize: Size;
  numberOfCells: number;
}) {
  const leftOverdose = ((min / 100) * cellSize.width + offset) * -1;

  const rightOverdose =
    numberOfCells * cellSize.width - leftOverdose - containerSize.width;

  return { leftOverdose, rightOverdose };
}
